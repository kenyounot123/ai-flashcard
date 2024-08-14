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
} from "firebase/firestore";

export async function createFlashcardSet(
  uid: string,
  name: string,
  flashcards: Flashcard[],
  description?: string
): Promise<FlashcardSet> {
  if (!name.trim()) {
    throw new Error("Flashcard set name cannot be empty");
  }

  if (!uid) {
    throw new Error("User is not signed in");
  }

  try {
    const userDocRef = doc(collection(db, "users"), uid);
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
export async function readFlashcardSets(uid: string): Promise<FlashcardSet[]> {
  if (!uid) {
    throw new Error("User is not signed in");
  }

  const userDocRef = doc(collection(db, "users"), uid);
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
  uid: string,
  name: string,
  newName?: string,
  description?: string,
  flashcards?: Flashcard[]
): Promise<FlashcardSet> {
  if (!name.trim()) {
    throw new Error("Flashcard set name cannot be empty");
  }

  if (!uid) {
    throw new Error("User is not signed in");
  }

  // get the user document based on id
  const userDocRef = doc(collection(db, "users"), uid);
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

export async function deleteFlashcardSet(
  uid: string,
  setId: string
): Promise<void> {
  if (!setId.trim()) {
    throw new Error("Cannot delete flashcard set with empty id");
  }

  if (!uid) {
    throw new Error("User is not signed in");
  }

  // get the user document based on id
  const userDocRef = doc(collection(db, "users"), uid);
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
