'use client'
import { Typography, Container, Paper, Stack, Box, Button } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useState, useRef, useMemo, createRef } from "react";
import StudySetFlashCard from "./StudySetFlashCard";
import TinderCard from 'react-tinder-card'
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
  const [currentIndex, setCurrentIndex] = useState<number>(studySetFlashcards.length - 1)
  const [lastDirection, setLastDirection] = useState<string | undefined>()
  const currentIndexRef = useRef<number>(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(studySetFlashcards.length)
        .fill(0)
        .map((i) => createRef<any>()),
    []
  )
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < studySetFlashcards.length - 1

  const canSwipe = currentIndex >= 0

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    // Logic goes here
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }
  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex < studySetFlashcards.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }
  return (
    <>
      <Container sx={{mt:5, py:5, maxWidth:"xl", overflow: 'hidden'}} maxWidth={false}>
        <Box sx={{maxWidth:"700px", mx: "auto",}}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography textAlign="center" variant="body1" mb={3} sx={{fontSize: '2rem'}}>Study set Title</Typography>
            <Typography textAlign="center" variant="body1" mb={3} sx={{fontSize: '2rem'}}>{currentIndex}/ {studySetFlashcards.length}</Typography>
          </Stack>
          <Box sx={{ width: '100%',
              maxWidth: '700px',
              minHeight: '500px', position: 'relative'}}>
            {studySetFlashcards.map((card, index) => (
              <TinderCard ref={childRefs[index]} className="flashcard" key={card.id} preventSwipe={['up', 'down']} onSwipe={(dir) => swiped(dir, card.title, index)} onCardLeftScreen={() => outOfFrame(card.title, index)}>
                <StudySetFlashCard card={card}/>
              </TinderCard>
            ))}
          </Box>
          <Stack sx={{}} direction={'row'} justifyContent={'space-between'}>
            <WestIcon
              onClick={() => swipe('left')}
              sx={{
                fontSize: 64,
                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  color: "#FF5C9F",
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Button variant={`${!canGoBack ? 'outlined': 'contained'}`} onClick={() => goBack()}>Undo swipe!</Button>
            </Stack>
            <EastIcon
              onClick={() => swipe('right')}
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