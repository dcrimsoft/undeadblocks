import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';
import Iv_admin from './components/Iv_admin';

import { BrowserRouter as Router, Routes, Switch, Route } from "react-router-dom";


ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={ <App /> } />
            <Route path="/abt/IV_Admin" element={ <Iv_admin /> } />
        </Routes>
    </Router>, 
document.getElementById('root'));

serviceWorker.unregister();
