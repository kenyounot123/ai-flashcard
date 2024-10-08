'use client'
import React from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import LandingCard from '@/components/LandingCard';
import Image from 'next/image';
import ProductSection from '@/components/ProductSection';
import PricingSection from '@/components/PricingSection';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <>
      <Container sx={{py:{xs: 5, lg: 10}}} maxWidth={false}>
        <Stack sx={{minHeight: "1000px"}} spacing={5} alignItems={"center"}>
          <Typography sx={{textAlign: "center", fontSize: 44, fontWeight: "bold", maxWidth:{lg:"50%"}}} variant='h1'>
            <Image width={100} height={100} alt={'AI Flashcards'} src={'/icons/star.png'}/>
            Transform Your Learning with AI-Powered Flashcards
          </Typography>
          <Typography sx={{fontSize: 20, textAlign:"center", maxWidth:{lg:"40%"}}} variant='h4'>
            <Box component={'span'} color={"accent.accent5"}>AI-generated flashcards </Box>that adapt to your needs and help you retain information <Box component={'span'} color={"accent.accent5"}>more effectively</Box>
          </Typography>
          <Link href={'/generate'}>
            <Button sx={{ fontWeight:"bold", fontSize: 16,py:1, px: 2}} variant='contained'>
              Get Started
            </Button>
          </Link>
          <Stack sx={{maxWidth:"80%", mx:"auto"}} justifyContent="space-between" spacing={7} direction={{ xs: 'column', lg: 'row' }} >
            <LandingCard icon={"/icons/pen.svg"} rotate={4.6} title='AI-Generated' cardColor='accent.accent2' content='Automatically creates flashcards using AI technology to help you study more effectively.'/>
            <LandingCard icon={"/icons/lock.svg"} rotate={-1.9} title='Secure User Accounts' cardColor='accent.accent4' content='Save and manage your flashcard sets securely with user accounts.'/>
            <LandingCard icon={"/icons/eraser.png"} rotate={3.09} title='Easy Management' cardColor='accent.accent3' content='Effortlessly create, view, update, and delete your flashcard sets.'/>
          </Stack>
        </Stack>
        <ProductSection />
        <PricingSection/>
      </Container>
      <Box
        component="aside"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'white',
          width: 100,
          height: 100,
          borderRadius: '50%',
          zIndex: 1000, 
          boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)', // Slightly enlarges the button
          },
        }}
      >
        <Link href="#home">
          <Image alt="Flash Prep AI" width={100} height={100} src={'/icons/arrowUp.png'} />
        </Link>
      </Box>
    </>
  );
};

export default LandingPage;
