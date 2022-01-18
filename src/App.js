
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Footer from "./components/Footer";
import Search from "./Pages/Search";
import { Account } from "./components/Account";

import "./App.css";

function components(...components) {
    return (
        <>
            {components.map(component => component)}
        </>
    );
}

axios.defaults.headers = {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0",
    "Access-Control-Allow-Origin": "*",
};

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
    return (
        <Account>
            <Router>
                <Routes>
                    <Route path="/" element={components(<Navbar />, <Home />, <Footer />)} />
                    <Route path="/about" element={components(<Navbar />, <About />, <Footer />)} />
                    <Route path="/search" element={components(<Navbar />, <Search />, <Footer />)} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </Router>
        </Account>

    );
}

export default App;
