import { Box, Typography, Stack, Paper, Button } from "@mui/material";
import Flashcard from "./Flashcard";

export default function ProductSection() {
  return (
    <Box id="product" component={'section'} sx={{maxWidth:"xl", py:4, mx: "auto", minHeight: "1000px"}}>
      <Stack spacing={{xs: 7, md: 0}} direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
        <Stack textAlign="center" sx={{maxWidth: {md: "50%"}}} justifyContent={'center'} alignItems={'center'}>
          <Typography sx={{fontSize: 52, fontWeight: "bold"}} variant="h1">Simple.</Typography>
          <Typography sx={{fontSize: 52, fontWeight: "bold"}} variant="h1">Easy To Use.</Typography>
          <Typography sx={{fontSize: 52, fontWeight: "bold"}} variant="h1">Effortless.</Typography>
          <Typography sx={{fontSize: 24, my:5}} variant="body2">Provide a prompt, and let AI generate personalized flashcards for you. Save these flashcards as study sets if you&apos;re logged in, and easily create, edit, update, or delete cards to fit your needs. </Typography>
          <Button sx={{ textWrap: 'nowrap', width:"min-content", fontWeight:"bold", fontSize: 24, py:1, px: 2}} variant="contained">
            Get Started
          </Button>
        </Stack>
        <Box sx={{minWidth:'30%', display: 'flex', flexDirection: 'column', gap:5}}>
          <Flashcard
            rotate="1.14"
            cardColor="accent.accent2"
            title="Create a new study set"
            date="01"
            content="Enter a title and prompt, then click 'Create' to start a new study set."
          />
          <Flashcard
            rotate="-2.25"
            cardColor="accent.accent1"
            title="Generate Flashcards"
            date="02"
            content="Provide a topic to generate AI-powered flashcards instantly."
          />
          <Flashcard
            rotate="3.18"
            cardColor="accent.accent3"
            title="Review and Edit"
            date="03"
            content="Review the flashcards and make any edits as needed."
          />
          <Flashcard
            rotate="-4.47"
            cardColor="accent.accent4"
            title="Save the Study Set"
            date="04"
            content="Save your finalized study set to your account."
          />
        </Box>
      </Stack>
    </Box>
  )
}