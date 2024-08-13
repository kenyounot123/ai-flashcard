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
          <Button sx={{ textWrap: 'nowrap', width:"min-content", fontWeight:"bold", fontSize: 24,py:2, px: 4}} variant="contained">
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
          
          </Paper>
          
        </Box>
      </Stack>
    </Box>
  )
}