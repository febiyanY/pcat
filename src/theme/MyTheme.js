// import { purple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
    //   main: purple[500],
      main: '#06a3cf'
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: '#11cb5f',
    // },
  },
});

export default theme