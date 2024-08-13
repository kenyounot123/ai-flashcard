import { Box, Typography, Stack, Paper, Button } from "@mui/material";

export default function ProductSection() {
  return (
    <Box id="product" component={'section'} sx={{maxWidth:"xl", py:4, mx: "auto", minHeight: "1000px"}}>
      <Stack spacing={{xs: 7, md: 0}} direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
        <Stack textAlign="center" sx={{maxWidth: {md: "50%"}}} justifyContent={'center'} alignItems={'center'}>
          <Typography sx={{fontSize: 52, fontWeight: "bold"}} variant="h1">Simple.</Typography>
          <Typography sx={{fontSize: 52, fontWeight: "bold"}} variant="h1">Easy To Use.</Typography>
          <Typography sx={{fontSize: 52, fontWeight: "bold"}} variant="h1">Effortless.</Typography>
          <Typography sx={{fontSize: 24, my:5}} variant="body2">Provide a prompt, and let AI generate personalized flashcards for you. Save these flashcards as study sets if you're logged in, and easily create, edit, update, or delete cards to fit your needs. </Typography>
          <Button sx={{ textWrap: 'nowrap', width:"min-content", fontWeight:"bold", fontSize: 24, py:1, px: 2}} variant="contained">
            Get Started
          </Button>
        </Stack>
        <Box sx={{minWidth:'30%', display: 'flex', flexDirection: 'column', gap:5}}>
          <Paper
            square
            elevation={3}
            sx={{
              minWidth: '308px',
              minHeight: '109.7px',
              maxWidth: '444.93px',
              maxHeight: '131px',
              rotate: '1.14deg',
              backgroundColor: 'accent.accent2',
              p:2}} >
                <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>Create a new study set</Typography>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>01</Typography>
                </Stack>
                <Typography>Enter a title and prompt, then click "Create" to start a new study set.</Typography>
          </Paper>
          <Paper
            square
            elevation={3}
            sx={{
              minWidth: '308px',
              minHeight: '109.7px',
              maxWidth: '444.93px',
              maxHeight: '131px',
              rotate: '-2.25deg',
              backgroundColor: 'accent.accent1',
              p:2}} >
                <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>Generate Flashcards</Typography>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>02</Typography>
                </Stack>
                <Typography>Provide a topic to generate AI-powered flashcards instantly.</Typography>
          </Paper>
          <Paper
            square
            elevation={3}
            sx={{
              minWidth: '308px',
              minHeight: '109.7px',
              maxWidth: '444.93px',
              maxHeight: '131px',
              rotate: '3.18deg',
              backgroundColor: 'accent.accent3',
              p:2}} >
                <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>Review and Edit</Typography>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>03</Typography>
                </Stack>
                <Typography>Review the flashcards and make any edits as needed.</Typography>
          </Paper>
          <Paper
            square
            elevation={3}
            sx={{
              minWidth: '308px',
              minHeight: '109.7px',
              maxWidth: '444.93px',
              maxHeight: '131px',
              rotate: '-4.47deg',
              backgroundColor: 'accent.accent4',
              p:2}} >
                <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>Save the Study Set</Typography>
                  <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>04</Typography>
                </Stack>
                <Typography> Save your finalized study set to your account.</Typography>
          </Paper>
          
        </Box>
      </Stack>
    </Box>
  )
}