import { Paper, Typography, Box } from "@mui/material"
import { useState } from 'react'
interface FlashCard {
  title: string,
  id: string,
  front: string,
  back: string,
  color: string
}
interface StudySetFlashCardProps {
  card: FlashCard; 
  hide?: boolean,
}
export default function StudySetFlashCard ({card, hide}:StudySetFlashCardProps) {
  const [flip, setFlip] = useState(false)
  const flipCard = () => {
    setFlip(!flip)
  }
  return (
    <Paper
      onClick={flipCard}
      sx={{
        backgroundColor: card.color,
        display: hide ? 'none' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        minHeight: '500px',
        position: 'relative',
        perspective: '1000px', // Required for 3D effect
        transition: 'transform 0.6s ease',
        transformStyle: 'preserve-3d',
        transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
        '&:hover': {
          transform: flip ? 'rotateY(180deg) translateY(-10px)' : 'translateY(-10px)',
          boxShadow: '0 0 5px 1px rgba(0,0,0, .5)',
        },
      }}
      elevation={2}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: flip ? 0 : 1,
        }}
      >
        <Typography sx={{ fontSize: 32, textAlign: 'center' }} variant="body1">
          {card.front}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: flip ? 1 : 0,
        }}
      >
        <Typography sx={{ fontSize: 32, textAlign: 'center' }} variant="body1">
          {card.back}
        </Typography>
      </Box>
    </Paper>
  );
}