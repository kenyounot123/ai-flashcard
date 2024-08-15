"use server";

import { Flashcard, FlashcardSet } from "@/types";
import { db } from "@/firebase";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  writeBatch,
  runTransaction,
} from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";

export async function getFlashcardsFromStudySet(id:string) {
  const { userId } = auth()
  if (!userId) {
    throw new Error("User is not signed in");
  }
  try {
    const userDocRef = doc(collection(db, "users"), userId);
    const flashcardSetsCollection = collection(userDocRef, "flashcardsets");
    const studySetDocRef = doc(flashcardSetsCollection, id);
    const studySetDoc = await getDoc(studySetDocRef);
    
    if (!studySetDoc.exists()) {
      throw new Error("Study set not found");
    }
    
    // Extract flashcards from the study set document
    const flashcards = studySetDoc.data().flashcards || [];
    
    return flashcards;
    // get from user -> flashcardsets -> set whose id  === params id
  } catch (error) {
    console.error("Error getting flashcards from study set:", error);
    throw new Error("An error occurred while getting the flashcards from study set");
  }
}


export async function createFlashcardSet(
  name: string,
  flashcards: Flashcard[],
  description?: string
): Promise<FlashcardSet> {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not signed in");
  }
  if (!name.trim()) {
    throw new Error("Flashcard set name cannot be empty");
  }

  try {
    const userDocRef = doc(collection(db, "users"), userId);
    const userDocSnap = await getDoc(userDocRef);

    const batch = writeBatch(db);

    if (!userDocSnap.exists()) {
      batch.set(userDocRef, { flashcardSets: [] });
    }

    const newSetRef = doc(collection(userDocRef, "flashcardSets"));
    batch.set(newSetRef, {
      name: name,
      description: description,
      flashcards: flashcards,
    });

    await batch.commit();
    const flashcardSet: FlashcardSet = {
      id: newSetRef.id,
      name,
      description,
      flashcards,
    };
    return flashcardSet;
  } catch (error) {
    console.error("Error creating flashcard set:", error);
    throw new Error("An error occurred while creating the flashcard set");
  }
}

// Reads all flashcard sets for a user
export async function readFlashcardSets(): Promise<FlashcardSet[]> {
  const { userId } = auth();
  console.log(userId);

  if (!userId) {
    throw new Error("User is not signed in");
  }

  const userDocRef = doc(collection(db, "users"), userId);
  const flashcardSetsRef = collection(userDocRef, "flashcardSets");
  const flashcardSetsQuery = query(flashcardSetsRef);

  const flashcardSets: FlashcardSet[] = [];
  const flashcardSetsQuerySnapshot = await getDocs(flashcardSetsQuery);

  flashcardSetsQuerySnapshot.forEach((doc) => {
    flashcardSets.push({ id: doc.id, ...doc.data() } as FlashcardSet);
  });

  return flashcardSets;
}

export async function updateFlashcardSet(
  name: string,
  newName?: string,
  description?: string,
  flashcards?: Flashcard[]
): Promise<FlashcardSet> {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not signed in");
  }
  if (!name.trim()) {
    throw new Error("Flashcard set name cannot be empty");
  }

  // get the user document based on id
  const userDocRef = doc(collection(db, "users"), userId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new Error("User document does not exist");
  }

  // get the flashcard set document based on name
  const setDocRef = doc(collection(userDocRef, "flashcardSets"), name);
  const setDocSnap = await getDoc(setDocRef);
  if (!setDocSnap.exists()) {
    throw new Error("Flashcard set document does not exist");
  }

  // update the flashcard set document
  const batch = writeBatch(db);
  const updatedFlashcardSet: FlashcardSet & { [x: string]: any } = {
    name: newName || name,
    description,
    flashcards: flashcards || setDocSnap.data().flashcards,
  };
  batch.update(setDocRef, updatedFlashcardSet);
  await batch.commit();
  return updatedFlashcardSet;
}

export async function deleteFlashcardSet(setId: string): Promise<void> {
  const { userId } = auth();
  if (!setId.trim()) {
    throw new Error("Cannot delete flashcard set with empty id");
  }

  if (!userId) {
    throw new Error("User is not signed in");
  }

  // get the user document based on id
  const userDocRef = doc(collection(db, "users"), userId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new Error("User document does not exist");
  }

  // get the flashcard set document based on name
  const setDocRef = doc(collection(userDocRef, "flashcardSets"), setId);
  const setDocSnap = await getDoc(setDocRef);
  if (!setDocSnap.exists()) {
    throw new Error("Flashcard set document does not exist");
  }

  // delete the flashcard set document
  const batch = writeBatch(db);
  batch.delete(setDocRef);
  await batch.commit();
}

export async function limitFreeUsage(usage: number, action: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not signed in");
  }
  const userDocRef = doc(collection(db, "users"), userId);

  const userDoc = await runTransaction(db, async (transaction) => {
    const userDocSnap = await transaction.get(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User document does not exist");
    }

    const userData = userDocSnap.data();

    if (userData.subscription !== "free") {
      return null; // Exit early if not on free plan
    }

    let actionUsage = userData.actionUsage || {};
    let currentUsage = actionUsage[action] || 0;

    if (currentUsage >= usage) {
      throw new Error("Free plan limit reached");
    }

    // Increment usage
    actionUsage = {
      ...actionUsage,
      [action]: currentUsage + 1,
    };

    transaction.update(userDocRef, { actionUsage });

    return { ...userData, actionUsage };
  });

  return userDoc;
}

export async function limitedCreateFlashcardSet(
  name: string,
  flashcards: Flashcard[],
  description?: string
): Promise<FlashcardSet> {
  await limitFreeUsage(5, "createFlashcardSet");
  return await createFlashcardSet(name, flashcards, description);
}
