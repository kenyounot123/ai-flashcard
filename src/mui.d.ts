import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent?: {
      accent1?: string;
      accent2?: string;
      accent3?: string;
      accent4?: string;
      accent5?: string;
      accent6?: string,
      // Add more accents as needed
    };
  }

  interface PaletteOptions {
    accent?: {
      accent1?: string;
      accent2?: string;
      accent3?: string;
      accent4?: string;
      accent5?: string;
      accent6?: string,
      // Add more accents as needed
    };
  }
}