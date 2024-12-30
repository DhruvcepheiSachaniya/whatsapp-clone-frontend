import { createTheme } from '@mui/material/styles';
import GilroySemiBold from '../fonts/Gilroy-SemiBold.ttf'
import GilroyMedium from '../fonts/Gilroy-Medium.ttf'
import { colors } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: 'Gilroy',
    allVariants:{
      textTransform:'none',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing:'grayscale',
      textRendering:'optimizeLegibility',
    },
    h1: {
      fontFamily: 'Gilroy',
      fontWeight: 400, // Adjust weight to match medium
    },
    h2: {
      fontFamily: 'Gilroy',
      fontWeight: 600, // Adjust weight to match semi-bold
    },
    
  },
  
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Gilroy-SemiBold'), local('Gilroy-SemiBold'), url(${GilroySemiBold}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Gilroy-Medium'), local('Gilroy-Medium'), url(${GilroyMedium}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      
    },
    MuiFormHelperText: {
      styleOverrides:{
        root: {
          color: 'red'
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          color: '#92B5F9',
          marginBottom:'20px'
        },
        ul: {
          '& .MuiPaginationItem-root': {
            color: '#667085',

            
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#92B5F9',
            color: '#fff',
          },
          
        },
      }
    },
    // MuiButtonBase: {
    //   defaultProps: {
    //     // The props to change the default for.
    //     disableRipple: true, // No more ripple, on the whole application
    //     disableTouchRipple:true,
        

    //   },
    // },
  },
  },
);

export default theme;
