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
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { EditableFlashcardGrid } from "./components/EditableFlashcardGrid";
import { Flashcard } from "@/types";
import { createFlashcardSet } from "@/app/actions";

const testFlashcards: Flashcard[] = [
  {
    front: "What is the capital of France?",
    back: "Paris",
  },
  {
    front: "What is the capital of Germany?",
    back: "Berlin",
  },
  {
    front: "What is the capital of Italy?",
    back: "Rome",
  },
  {
    front: "What is the capital of Spain?",
    back: "Madrid",
  },
  {
    front: "What is the capital of the United Kingdom?",
    back: "London",
  },
  {
    front: "What is the capital of the United States?",
    back: "Washington, D.C.",
  },
  {
    front: "What is the capital of Canada?",
    back: "Ottawa",
  },
  {
    front: "What is the capital of Mexico?",
    back: "Mexico City",
  },
];

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState(testFlashcards);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const saveFlashcards = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await createFlashcardSet(user.id, name, flashcards, description);
      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Generated Flashcards
        </Typography>
        <EditableFlashcardGrid
          flashcards={flashcards}
          setFlashcards={setFlashcards}
        />
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Save Flashcards
          </Button>
        </Box>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-modal>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name and a description for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => saveFlashcards()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
