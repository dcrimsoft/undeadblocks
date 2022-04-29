import React from 'react';
import { ReactDOM, render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Iv_admin from './components/Iv_admin';

import { BrowserRouter as Router, Routes, Switch, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
render(
    <Router>
        <Routes>
            <Route path="/" element={ <App /> } />
            <Route path="/abt/IV_Admin" element={ <Iv_admin /> } />
        </Routes>
    </Router>,
    rootElement
);
serviceWorker.unregister();
