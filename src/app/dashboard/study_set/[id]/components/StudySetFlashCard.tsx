import { Paper, Typography, Box } from "@mui/material"
import { useState } from 'react'
interface FlashCard {
  front: string,
  back: string,
}
interface StudySetFlashCardProps {
  card: FlashCard; 
}
export default function StudySetFlashCard ({card}:StudySetFlashCardProps) {
  const [flip, setFlip] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);

  const flipCard = () => {
    if (!isSwiping) {
      setFlip(prev => !prev);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setStartX(event.clientX);
    setIsSwiping(true);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 30) { // Adjust threshold as needed
      console.log('Swipe detected');
      // Perform any swipe-specific logic here
    } else {
      setIsSwiping(false);
      flipCard();
    }
  };
  return (
    <Paper
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={flipCard}
      sx={{
        backgroundColor: `accent.accent2`,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        minHeight: '500px',
        userSelect: 'none',
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