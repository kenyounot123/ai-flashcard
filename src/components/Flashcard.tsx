import { Paper, Stack, Typography } from "@mui/material"

interface FlashcardProps {
  rotate: string,
  cardColor: string,
  title: string,
  date: string,
  content: string
}
export default function Flashcard({rotate, cardColor, title, date, content}:FlashcardProps) {
  return (
    <Paper
      square
      elevation={3}
      sx={{
        minWidth: '308px',
        minHeight: '109.7px',
        maxWidth: '444.93px',
        maxHeight: '131px',
        rotate: `${rotate}deg`,
        backgroundColor: `${cardColor}`,
        p:2}} >
          <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
            <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>{title}</Typography>
            <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>{date}</Typography>
          </Stack>
          <Typography>{content}</Typography>
    </Paper>
  )
} 