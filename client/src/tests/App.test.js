import React from 'react'
import { render as rtlRender, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../reducers/index';

import App from '../App';
import Auth from '../components/Auth/Auth';


const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe('App', () => {
    test('rendering App component', () => {
        render(<App />)
        expect(screen.getByText('Sign In to create posts.')).toBeInTheDocument()
    })
})

describe('Auth', () => {
    test('rendering auth component', () => {
        render(<Auth />)
        expect(screen.getByText('Sign in')).toBeInTheDocument()
    })
})

