import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseHelper from './util/FirebaseHelper'
import './index.css';

import * as firebase from 'firebase'

import App from "./pages/App/index";

var config = {
    apiKey: "-",
    authDomain: "-",
    databaseURL: "-",
    projectId: "-",
    storageBucket: "-",
    messagingSenderId: "-"
};

firebase.initializeApp(config);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
window.onload = function () {
    window.FirebaseHelper = new FirebaseHelper();
};
