import { createTheme } from '@mui/material/styles'
import { orange, blue, red, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[900],
      light: blue[500]
    },
    secondary: {
      main: orange[500],
      dark: orange[700],
      light: orange[300],
      contrastText: '#fff'
    },
    error: {
      main: red[500]
    },
    darker: {
      main: grey[600], //bluegrey[900],
      light: grey[200],
      dark: grey[900]
    },
    text: {
      secondary: grey[500]
    }
  },

  typography: {
    body1: {
      fontSize: 18,
      fontWeight: 600
    },
    body2: {
      fontSize: 16,
      fontWeight: 600
    },
    subtitle1: {
      fontSize: 14,
      color: grey[900],
      fontWeight: 400
    },
    subtitle2: {
      fontSize: 12,
      color: grey[900],
      fontWeight: 400
    },

    h3: {
      fontSize: 22,
      fontWeight: 600
    },
    button: {
      textTransform: 'none'
    }
  }
})

declare module '@mui/material/styles' {
  interface Palette {
    darker: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    darker?: PaletteOptions['primary']
  }
}

export default theme
