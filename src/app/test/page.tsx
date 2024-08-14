"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import {
  createFlashcardSet,
  readFlashcardSets,
  updateFlashcardSet,
  deleteFlashcardSet,
  limitedCreateFlashcardSet
} from "@/app/actions";
import { Flashcard, FlashcardSet } from "@/types";

// DELETE THIS PAGE LATER

const TEST_USER = "user_2kZS6YdbCTEp8tW2BiGBW3EDUdC";
const TEST_SET_NAME = "Math";
const TEST_SET_DESC = "Algebra concepts";
const TEST_FLASHCARDS: Flashcard[] = [
  {
    front: "What is the sum of 2 and 2?",
    back: "4",
  },
];

export default function TestRoute() {
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [mostRecentSet, setMostRecentSet] = useState<FlashcardSet | null>(null);
  console.log(sets);
  console.log(mostRecentSet);

  function handleCreateSet() {
    limitedCreateFlashcardSet(
      TEST_USER,
      TEST_SET_NAME,
      TEST_FLASHCARDS,
      TEST_SET_DESC
    ).then((set) => {
      setSets([...sets, set]);
      setMostRecentSet(set);
    });
  }

  function handleReadSets() {
    readFlashcardSets(TEST_USER).then((sets) => {
      setSets(sets);
    });
  }

  // works in db, not in client -- too lazy to fix
  function handleUpdateSet() {
    updateFlashcardSet(
      TEST_USER,
      mostRecentSet?.id as string,
      TEST_SET_NAME,
      TEST_SET_DESC,
      [
        {
          front: "What is the sum of 2 and 2?",
          back: `${Math.floor(Math.random() * 10)}`,
        },
      ]
    ).then((updatedSet) => {
      setSets(sets.map((s) => (s.id === mostRecentSet?.id ? updatedSet : s)));
    });
  }

  function handleDeleteSet() {
    deleteFlashcardSet(TEST_USER, mostRecentSet?.id as string).then(() => {
      setSets(sets.filter((s) => s.id !== mostRecentSet?.id));
    });
  }

  return (
    <>
      <Button onClick={() => handleCreateSet()}>create</Button>
      <Button onClick={() => handleReadSets()}>read</Button>
      <Button onClick={() => handleUpdateSet()}>update</Button>
      <Button onClick={() => handleDeleteSet()}>delete</Button>

      {sets.map((set) => (
        <div key={set.id}>
          <h1 style={{ fontSize: "20px", color: "red" }}>{set.name}</h1>
          <p>{set.description}</p>
          {set.flashcards.map((card) => (
            <div key={card.front}>
              <p>{card.front}</p>
              <p>{card.back}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
