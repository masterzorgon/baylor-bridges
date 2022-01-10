import "./components/header"
import Header from "./components/header";
import ReactDOM from "react-dom";
import Home from "./Pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Testing from "./Pages/testPage";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";
function App() {
    return (
        <Router>
            <Header/>
            <a>Go to home page</a>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/testing" element={<Testing/>} />
                <Route path="/signIn" element={<SignIn/>} />
                <Route path="/signUp" element={<SignUp/>} />
            </Routes>
        </Router>
    );
}

export default App;
