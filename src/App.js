
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home"
import About from "./Pages/About";
import Testing from "./Pages/testPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { Account } from './components/Account';
import  Alumni_Register_Experience from './Pages/Alumni_Register_Experience'
import Status from './components/Status';


import 'bulma/css/bulma.min.css';
import './App.css';
import SideBar from "./components/Alumni_Register_SideBar";
import Alumni_Register_SideBar from "./components/Alumni_Register_SideBar";

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
                        <Route path="/Alumni-Edit-profile/Experience" element={<Alumni_Register_Experience />}/>
                </Routes>
            </Router>
        </Account>
        
    );
}

export default App;
