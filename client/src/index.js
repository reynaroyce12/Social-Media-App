import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from "@material-ui/core";

import { reducers } from './reducers';
import App from './App';
import './index.css';
import {themes} from './Themes/themes'

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themes}>
        <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
