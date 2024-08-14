'use client'
import { Typography, Container, Paper, Stack, Box } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useState } from "react";

// This will use a study set object instead
const studySetFlashcards = [
  {
    id: "1",
    title: "Algebra Basics",
    front: "What is the quadratic formula?",
    back: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a.",
    color: "lightblue"
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    front: "What is Newton's second law of motion?",
    back: "Newton's second law of motion states that F = ma, where F is force, m is mass, and a is acceleration.",
    color: "lightgreen"
  },
  {
    id: "3",
    title: "World History",
    front: "Who was the first emperor of China?",
    back: "The first emperor of China was Qin Shi Huang.",
    color: "lightcoral"
  },
  {
    id: "4",
    title: "Programming 101",
    front: "What is a variable in programming?",
    back: "A variable is a storage location identified by a name that holds data which can be changed during program execution.",
    color: "lightgoldenrodyellow"
  },
]
export default function StudySet({params}: { params: {id: string} }) {
  // fetch the study set from database and return its flashcards
  const [cardIndex, setCardIndex] = useState(0)
  const [correct, setCorrect] = useState(null)

  const handlePrev = () => {
    setCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCardIndex((prevIndex) => Math.min(prevIndex + 1, studySetFlashcards.length - 1));
  };

  const currentCard = studySetFlashcards[cardIndex];
  return (
    <>
      <Container sx={{mt:5, py:5, maxWidth:"xl"}} maxWidth={false}>
        <Box sx={{maxWidth:"700px", mx: "auto"}}>
          <Typography textAlign="center" variant="body1" mb={3} sx={{fontSize: '2rem'}}>Study set Title</Typography>
          <Paper
            sx={{
              backgroundColor: currentCard.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "700px",
              minHeight: "500px",
              transition: 'transform 0.5s ease-in-out',
              transform: correct !== null ? `translateX(${correct ? '100%' : '-100%'})` : 'none',
            }}
            elevation={2}
          >
            <Typography sx={{ fontSize: 32, textAlign: "center" }} variant="body1">
              {currentCard.front}
            </Typography>
          </Paper>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <WestIcon
              onClick={handlePrev}
              sx={{
                fontSize: 64,
                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  color: "#FF5C9F",
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Stack alignItems={'center'}>
              <Typography sx={{fontSize: '3rem'}}>{(studySetFlashcards.length + 1) - (cardIndex + 1)} / {studySetFlashcards.length}</Typography>
              <Typography sx={{fontSize: '2rem'}}>cards left</Typography>
            </Stack>
            <EastIcon
              onClick={handleNext}
              sx={{
                fontSize: 64,
                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  color: "#CCFD1C",
                  transform: 'scale(1.1)',
                },
              }}
            />
          </Stack>
        </Box>
      </Container>
    </>
  )
}