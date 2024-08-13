import React from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import LandingCard from '@/components/LandingCard';

const LandingPage = () => {
  return (
    <>
      <Container sx={{p:4}}>
        <Stack spacing={7} alignItems={"center"}>
          <Typography sx={{textAlign: "center", fontSize: 52, fontWeight: "bold"}}variant='h1'>
            Transform Your Learning with AI-Powered Flashcards
          </Typography>
          <Typography sx={{fontSize: 24, textAlign:"center"}} variant='h4'>
            <Box component={'span'} color={"accent.accent5"}>AI-generated flashcards </Box>that adapt to your needs and help you retain information <Box component={'span'} color={"accent.accent5"}>more effectively</Box>
          </Typography>
          <Button sx={{ width:"min", fontWeight:"bold", fontSize: 24,py:2, px: 4}} variant='contained'>
            Get Started
          </Button>
          <LandingCard rotate={4.6} title='AI-Generated Flashcards' cardColor='accent.accent2' content='Automatically creates flashcards using AI technology to help you study more effectively.'/>
          <LandingCard rotate={-1.9} title='Secure User Accounts' cardColor='accent.accent4' content='Save and manage your flashcard sets securely with user accounts.'/>
          <LandingCard rotate={3.09} title='Easy Flashcard Management' cardColor='accent.accent3' content='Effortlessly create, view, update, and delete your flashcard sets.'/>
        </Stack>
      </Container>
    </>
  );
};

export default LandingPage;
