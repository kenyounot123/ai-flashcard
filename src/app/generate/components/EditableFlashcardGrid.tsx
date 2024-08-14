import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Flashcard } from "@/types";

export function EditableFlashcardGrid({
  flashcards,
  setFlashcards,
}: {
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const frontTextFieldRef = useRef<HTMLTextAreaElement>(null);
  const backTextFieldRef = useRef<HTMLTextAreaElement>(null);

  const saveEdits = (index: number, flashcard: Flashcard) => {
    setFlashcards([
      ...flashcards.slice(0, index),
      flashcard,
      ...flashcards.slice(index + 1),
    ]);
    setEditingIndex(null);
  };

  // Handle keydown events for tab and enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();

      if (document.activeElement === frontTextFieldRef.current) {
        event.preventDefault();
        backTextFieldRef.current?.focus();
        backTextFieldRef.current?.select();
      } else if (document.activeElement === backTextFieldRef.current) {
        event.preventDefault();
        frontTextFieldRef.current?.focus();
        frontTextFieldRef.current?.select();
      }
    }
    if (event.key === "Enter") {
      saveEdits(editingIndex as number, {
        front: frontTextFieldRef.current?.value as string,
        back: backTextFieldRef.current?.value as string,
      });
    }
  };

  // Select front text when changing flashcard to edit
  useEffect(() => {
    if (editingIndex !== null) {
      const selectAllText = (ref: React.RefObject<HTMLTextAreaElement>) => {
        if (ref.current !== null) {
          setTimeout(() => {
            if (ref.current !== null) {
              ref.current.select();
            }
          }, 0);
        }
      };
      selectAllText(frontTextFieldRef);
    }
  }, [editingIndex]);

  if (flashcards.length === 0) {
    return null;
  }
  return (
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
              {editingIndex === index ? (
                <TextField
                  multiline
                  defaultValue={flashcard.front}
                  fullWidth
                  inputRef={frontTextFieldRef}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <Typography sx={{ p: 2 }}>{flashcard.front}</Typography>
              )}

              <Typography variant="h6" sx={{ mt: 2 }}>
                Back:
              </Typography>
              {editingIndex === index ? (
                <TextField
                  multiline
                  defaultValue={flashcard.back}
                  fullWidth
                  inputRef={backTextFieldRef}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <Typography sx={{ p: 2 }}>{flashcard.back}</Typography>
              )}

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{
                    transition: "color 0.1s ease",
                    "&:hover": {
                      cursor: "pointer",
                      color: "accent.accent6",
                    },
                  }}
                  onClick={() =>
                    setFlashcards([
                      ...flashcards.slice(0, index),
                      ...flashcards.slice(index + 1),
                    ])
                  }
                >
                  <DeleteIcon />
                </Button>
                {editingIndex === index ? (
                  <Button
                    onClick={() =>
                      saveEdits(index, {
                        front: frontTextFieldRef.current?.value as string,
                        back: backTextFieldRef.current?.value as string,
                      })
                    }
                    sx={{
                      transition: "color 0.3s ease",
                      "&:hover": {
                        cursor: "pointer",
                        color: "accent.accent6",
                      },
                    }}
                  >
                    <SaveIcon />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setEditingIndex(index);
                    }}
                    sx={{
                      transition: "color 0.3s ease",
                      "&:hover": {
                        cursor: "pointer",
                        color: "accent.accent6",
                      },
                    }}
                  >
                    <EditIcon />
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
