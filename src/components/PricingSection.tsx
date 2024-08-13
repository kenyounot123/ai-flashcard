import { Box, Typography, Stack, Paper, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
export default function PricingSection() {
  return (
    <Box id="pricing" component={'section'} sx={{maxWidth:"xl", py:4, mx: "auto"}}>
      <Box sx={{textAlign: 'center'}}>
        <Typography sx={{fontSize: '3rem'}} variant="h1">Pick Your Plan</Typography>
        <Typography sx={{fontSize: '2rem'}} variant="h4">Choose the plan that <Box component='span' sx={{color: 'accent.accent6'}}>best fits</Box> your learning needs</Typography>
      </Box>
      <Stack mt={7} direction={{md: 'row'}} spacing={7} justifyContent={'center'}>
        <Paper sx={{
          width: '400px',
          height: '531px',
          backgroundColor: 'accent.accent1',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(-5deg)', 
          }
        }}
        elevation={5}>
          <Stack mt={5} alignItems={'center'}>
            <Typography sx={{fontSize:'2rem'}} variant="h1">Basic</Typography>
            <Typography sx={{fontWeight: 'bold'}} variant="h1">$0</Typography>
            <Typography sx={{fontSize:'1.5rem'}} variant="h2">Free</Typography>
            <Stack mt={5} width={'80%'} justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
              <Box>
                <Image alt='AI flashcard' width={37} height={44} src={'/icons/checkMark.svg'}/>
              </Box>
              <Typography sx={{flexGrow: 1}}>Access to standard flashcards</Typography>
            </Stack>
            <Stack width={'80%'} justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
              <Box>
                <Image alt='AI flashcard' width={37} height={44} src={'/icons/checkMark.svg'}/>
              </Box>
              <Typography sx={{flexGrow: 1}}>Limited flashcard generation</Typography>
            </Stack>
            <Stack width={'80%'} justifyContent={'space-between'} mb={5} direction={'row'} alignItems={'center'}>
              <Box>
                <Image alt='AI flashcard' width={37} height={44} src={'/icons/checkMark.svg'}/>
              </Box>
              <Typography sx={{flexGrow: 1}}>Limited saved flashcard sets</Typography>
            </Stack>
            <Link href={'#home'} style={{width: '80%'}}>
              <Button variant="contained" sx={{fontWeight: 'bold', width: '100%'}}>
                Get Started
              </Button>
            </Link>
          </Stack>
        </Paper>
        <Paper sx={{
          width: '400px',
          height: '531px',
          backgroundColor: 'accent.accent2',
          transition: 'transform 0.3s ease',
          '&:hover': {
          transform: 'rotate(5deg)', 
        },
        }}
        elevation={5}>
          <Stack mt={5} alignItems={'center'}>
            <Typography sx={{fontSize:'2rem'}} variant="h1">Pro</Typography>
            <Typography sx={{fontWeight: 'bold'}} variant="h1">$4.99</Typography>
            <Typography sx={{fontSize:'1.5rem'}} variant="h2">One time payment</Typography>
            <Stack width={'80%'} justifyContent={'space-between'} mt={5} direction={'row'} alignItems={'center'}>
              <Box>
                <Image alt='AI flashcard' width={37} height={44} src={'/icons/checkMark.svg'}/>
              </Box>
              <Typography sx={{flexGrow: 1}}>Exclusive content and features</Typography>
            </Stack>
            <Stack width={'80%'} justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
              <Box>
                <Image alt='AI flashcard' width={37} height={44} src={'/icons/checkMark.svg'}/>
              </Box>
              <Typography sx={{flexGrow: 1}}>Unlimited flashcard generation</Typography>
            </Stack>
            <Stack width={'80%'} justifyContent={'space-between'} mb={5} direction={'row'} alignItems={'center'}>
              <Box>
                <Image alt='AI flashcard' width={37} height={44} src={'/icons/checkMark.svg'}/>
              </Box>
              <Typography sx={{flexGrow: 1}}>Unlimited saved flashcard sets</Typography>
            </Stack>
            <Link href={'#home'} style={{width: '80%'}}>
              <Button variant="contained" sx={{fontWeight: 'bold', width: '100%'}}>
                Upgrade to Pro
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}