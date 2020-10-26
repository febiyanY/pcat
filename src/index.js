import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import { Provider as ReduxProvider } from 'react-redux'
import reduxStore from './state/store'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme/MyTheme'
// import { purple } from '@material-ui/core/colors';
// import { createMuiTheme } from '@material-ui/core/styles'
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: purple[500],
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#11cb5f',
//     },
//   },
// });

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
