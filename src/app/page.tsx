import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, Box } from '@mui/material';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          padding: '4rem 0',
          textAlign: 'center',
          backgroundColor: '#1a202c', // Dark blue-gray background
          color: '#fff'
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            AI Flashcards for Effective Learning
          </Typography>
          <Typography variant="h5" paragraph>
            Boost your study sessions with AI-powered flashcards that adapt to your learning style.
          </Typography>
          <Button variant="contained" color="secondary">Get Started</Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          padding: '4rem 0',
          backgroundColor: '#edf2f7' // Light gray background
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">AI-Powered Adaptation</Typography>
              <Typography>Smart flashcards that adapt to your learning needs.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Customizable Decks</Typography>
              <Typography>Create and customize flashcard decks based on your study material.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Progress Tracking</Typography>
              <Typography>Track your progress and improvement over time.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        sx={{
          padding: '4rem 0',
          backgroundColor: '#f7fafc' // Very light gray background
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Pricing Plans
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5">Basic</Typography>
                  <Typography variant="h6">$9.99/month</Typography>
                  <ul>
                    <li>Access to basic flashcards</li>
                    <li>Limited customization</li>
                    <li>Basic progress tracking</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary">Choose Plan</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5">Pro</Typography>
                  <Typography variant="h6">$19.99/month</Typography>
                  <ul>
                    <li>Unlimited flashcards</li>
                    <li>Full customization</li>
                    <li>Advanced progress tracking</li>
                    <li>Priority support</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary">Choose Plan</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: '2rem 0',
          backgroundColor: '#2d3748', // Dark gray background
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">&copy; 2024 AI Flashcards. All rights reserved.</Typography>
        <Button variant="outlined" color="inherit">Login</Button>
        <Button variant="contained" color="primary" sx={{ ml: 1 }}>Sign Up</Button>
      </Box>
    </div>
  );
};

export default LandingPage;
