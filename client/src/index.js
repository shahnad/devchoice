import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './redux/store'
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './Material-ui/theme'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
