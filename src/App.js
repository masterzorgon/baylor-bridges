
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./Pages/Home"
import Testing from "./Pages/testPage";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/testing" component={Testing} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
            </Routes>
        </Router>
    );
}

export default App;
