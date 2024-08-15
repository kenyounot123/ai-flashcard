import { Stack, Typography, Button, Grid, Box } from "@mui/material"
import StudySetFlashCard from "./StudySetFlashCard";
import Link from "next/link"
import { Flashcard } from "@/types";

interface LosingScreenProps {
  flashCardData: Flashcard[];
  leftSwipeIndices: number[];
}
export default function LosingScreen({ flashCardData, leftSwipeIndices }: LosingScreenProps) {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Focus on these flash cards, you had trouble with them.</Typography>  
        <Grid mt={2} container spacing={2}>
          {flashCardData.filter((_, idx) => leftSwipeIndices.includes(idx)).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StudySetFlashCard card={card}/>
            </Grid>
          ))}
        </Grid>
        <Stack mt={5} direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Button onClick={handleClick} variant="contained">Review again</Button>
          <Link href={'/dashboard'}><Button variant="outlined">Back</Button></Link>
        </Stack>
      </Box>
    </>
  )
}