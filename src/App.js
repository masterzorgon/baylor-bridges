
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home"
import About from "./Pages/About";
import Testing from "./Pages/testPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { Account } from './components/Account';
import NavbarAccount from './components/NavbarAccount';

import 'bulma/css/bulma.min.css';
import './App.css';

// is <Status /> not going to be included? 
function App() {
    return (
        <Account>
            <Navbar />
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
