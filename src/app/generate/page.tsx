"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/clerk-react";

interface Flashcard {
  front: string;
  back: string;
}

const testFlashcards: Flashcard[] = [
  // {
  //   front: "What is the capital of France?",
  //   back: "Paris",
  // },
  // {
  //   front: "What is the capital of Germany?",
  //   back: "Berlin",
  // },
  // {
  //   front: "What is the capital of Italy?",
  //   back: "Rome",
  // },
  // {
  //   front: "What is the capital of Spain?",
  //   back: "Madrid",
  // },
  // {
  //   front: "What is the capital of the United Kingdom?",
  //   back: "London",
  // },
  // {
  //   front: "What is the capital of the United States?",
  //   back: "Washington, D.C.",
  // },
  // {
  //   front: "What is the capital of Canada?",
  //   back: "Ottawa",
  // },
  // {
  //   front: "What is the capital of Mexico?",
  //   back: "Mexico City",
  // },
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
    if (!name.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      if (!user) {
        alert("Please sign in to save flashcards.");
        return;
      }
      const userDocRef = doc(collection(db, "users"), user.id);
      console.log(userDocRef);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [...(userData.flashcardSets || []), { name: name }];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, {
          flashcardSets: [{ name: name, description: description }],
        });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), name);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

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

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    minHeight: 200,
                    backgroundColor:
                      index % 4 === 0
                        ? "accent.accent1"
                        : index % 4 === 1
                        ? "accent.accent2"
                        : index % 4 === 2
                        ? "accent.accent3"
                        : "accent.accent4",
                    // rotate: `${Math.floor(Math.random() * 4 - 2)}deg`
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Back:
                    </Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
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
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
