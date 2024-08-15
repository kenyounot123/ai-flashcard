'use client'
import { Typography, Container, Stack, Box, Button, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useRef, useMemo, createRef, useEffect } from "react";
import StudySetFlashCard from "./components/StudySetFlashCard";
import TinderCard from 'react-tinder-card'
import { getFlashcardStudySet } from "@/app/actions";
import { Flashcard } from "@/types";
import WinningScreen from "./components/WinningScreen";
import LosingScreen from "./components/LosingScreen";
import CircularProgress from '@mui/material/CircularProgress';
// This will use a study set object instead
export default function StudySet({params}: { params: {id: string} }) {
  // fetch the study set from the database using params and return its flashcards
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [lastDirection, setLastDirection] = useState<string | undefined>()
  const currentIndexRef = useRef<number>(currentIndex)
  const allSwipesRef = useRef<string[]>([])
  const leftSwipeIndicesRef = useRef<number[]>([]);
  const [cardsFinished, setCardsFinished] = useState<'win' | 'lose' | null>(null)
  const [flashCardsData, setFlashCardsData] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchStudySet = async () => {
      try {
        const studySet = await getFlashcardStudySet(params.id);
        setFlashCardsData(studySet.flashcards); 
      } catch (error) {
        console.error("Failed to fetch flashcards:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchStudySet()

  }, [params.id])


  const childRefs = useMemo(
    () =>
      Array(flashCardsData.length)
        .fill(0)
        .map((i) => createRef<any>()),
    [flashCardsData.length]
  )
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex !== 0

  const canSwipe = currentIndex >= 0

  const swiped = (direction: string, nameToDelete: string | null, index: number) => {
    // Logic goes here
    setLastDirection(direction)
    updateCurrentIndex(index + 1);

    allSwipesRef.current.push(direction)

    if (direction === 'left') {
      leftSwipeIndicesRef.current.push(index); // Track the index of the card swiped left
    }

    if (index === flashCardsData.length - 1) {
      // If all previous swipes were to the right
      if (allSwipesRef.current.every(dir => dir === 'right')) {
        setCardsFinished('win')
      } else {
        const swipedLeftFlashcards = flashCardsData.filter((_, idx) =>
          leftSwipeIndicesRef.current.includes(idx)
        );
        setCardsFinished('lose')
      }
    }
  }

  const outOfFrame = (name: string, idx: number) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }
  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex < flashCardsData.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex - 1
    allSwipesRef.current.pop()
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }
  
  return (
    <>
      <Container sx={{mt:5, py:5, maxWidth:"xl", overflow: 'hidden'}} maxWidth={false}>
        {cardsFinished === 'win' && (
          <WinningScreen/>
        )}
        {cardsFinished === 'lose' && (
          <LosingScreen flashCardData={flashCardsData} leftSwipeIndices={leftSwipeIndicesRef.current}/>
        )}
        <Box sx={{maxWidth:"700px", mx: "auto", display: !cardsFinished ? '' : 'none'}}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography textAlign="center" variant="body1" mb={3} sx={{fontSize: '2rem'}}>Study set Title</Typography>
            <Typography textAlign="center" variant="body1" mb={3} sx={{fontSize: '2rem'}}>{currentIndex}/ {flashCardsData.length}</Typography>
          </Stack>
          <Box sx={{ width: '100%', maxWidth: '700px', minHeight: '500px', position: 'relative', display: 'flex', justifyContent:"center", alignItems:"center"}}>
            {loading && (
              <Box>
                <CircularProgress />
              </Box>
            )}
            {flashCardsData.map((card, index) => (
              <TinderCard className={`card ${index === currentIndex ? 'current' : 'hidden'} flashcard` } ref={childRefs[index]} key={index} preventSwipe={['up', 'down']} onSwipe={(dir) => swiped(dir, null, index)}>
                <StudySetFlashCard card={card}/>
              </TinderCard>
            ))}
          </Box>
          <Stack sx={{}} direction={'row'} justifyContent={'space-between'}>
            <CloseIcon
              onClick={() => swipe('left')}
              sx={{
                fontSize: 64,
                color: "#FF5C9F",
                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Button variant={`${!canGoBack ? 'outlined': 'contained'}`} onClick={() => goBack()}>Undo swipe!</Button>
            </Stack>
            <CheckIcon
              onClick={() => swipe('right')}
              sx={{
                fontSize: 64,
                color: "#ABD80C",
                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          </Stack>
          <Stack alignItems={'center'}>
            <Typography>Swipe <Box sx={{color: "#ABD80C"}} component={'span'}>RIGHT</Box> if you correctly defined the flash card</Typography>
            <Typography>Swipe <Box sx={{color: "#FF5C9F"}} component={'span'}>LEFT</Box> if you were not able to define the flash card</Typography>
          </Stack>
        </Box>
      </Container>
    </>
  )
}