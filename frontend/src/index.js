// import React from 'react';
// import ReactDOM from 'react-dom';
// import Root from './components/root';
// import configureStore from './store/store';
// import jwt_decode from 'jwt-decode';
// // import { setAuthToken } from './util/session_api_util';
// // import { logout } from './actions/session_actions';
// document.addEventListener('DOMContentLoaded', () => {
//   let store;
//     store = configureStore({});
//   const root = document.getElementById('root');
//   ReactDOM.render(<Root store={store} />, root);
// });

// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

// We will create this component shortly
import Root from './components/root';

// We set this up in the last section
import configureStore from './store/store';

// We will use this to parse the user's session token
import jwt_decode from 'jwt-decode';

import './index.css'

// The session utility we just created
import { setAuthToken } from './util/session_api_util';

// We have not created this action yet, but will do so in the next step
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {

        setAuthToken(localStorage.jwtToken);

        const decodedUser = jwt_decode(localStorage.jwtToken);

        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = '/login';
        }
    } else {
        store = configureStore({});
    }
    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});
