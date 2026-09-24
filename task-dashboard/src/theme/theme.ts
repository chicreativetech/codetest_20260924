import { createTheme } from '@mui/material/styles';

const FONT_FAMILY = ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'].join(',');

export const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
    h4: { fontWeight: 600 }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8
});
