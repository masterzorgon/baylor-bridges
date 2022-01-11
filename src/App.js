
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./Pages/Home"
import About from "./Pages/About";
import Testing from "./Pages/testPage";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";
import { Account } from './components/Account';

import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
    return (
        <Account>
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/testing" element={<Testing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </Router>
        </Account>
        
    );
}

export default App;
