'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#F8F7F5',
    },
    accent: {
      accent1: '#FDDBE9', 
      accent2: '#DEF3F4', 
      accent3: '#F5FAE3', 
      accent4: '#F0C7FF',
      accent5: '#D86DFF',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Default font for most text
    h1: {
      fontFamily: 'Virgil, serif', // Font for h1 headings
    },
    h2: {
      fontFamily: 'Virgil, serif', // Font for h2 headings
    },
    body1: {
      fontFamily: 'Virgil, serif'
    }
  },
});

export default theme;