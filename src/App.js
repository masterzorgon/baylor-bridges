import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import NotFound from "./Pages/404";

import PrivacyPolicy from "./Pages/policies&terms/PrivacyPolicy";
import TermsConditions from "./Pages/policies&terms/Terms&Conditions";
import CookiesPolicy from "./Pages/policies&terms/CookiesPolicy";

import SignIn from "./Pages/signin/SignIn";
import { default as ResetPassword } from "./Pages/forget-password/Form";
import { default as SignInChallenge } from "./Pages/signin/Challenge";
import { default as SignUpEntrace } from "./Pages/signup/Entrace";
import { default as SignUpForm } from "./Pages/signup/Form";
import { default as SignUpClosed } from "./Pages/signup/Closed";

import ProfileSetup from "./Pages/setup/ProfileSetup";
import InfoInput from "./Pages/setup/InfoInput";

import Search from "./Pages/Search";
import Profile from "./Pages/profile/Profile";

import { default as SettingsProfile } from "./Pages/settings/Profile";
import { default as SettingsExperience } from "./Pages/settings/Experience";
import { default as SettingsAccount } from "./Pages/settings/Account";

import { Account } from "./components/Account";

import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const components = (...components) => components.map(component => component);

axios.defaults.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0",
};

// Make API Base URL
const hostname = window.location.hostname;
const port = window.location.port;

if (hostname === "localhost" || hostname === "127.0.0.1" || port === 3000) {
    axios.defaults.baseURL = `//${hostname}:5000`;
    console.log("Running on Localhost", axios.defaults.baseURL);
} else {
    axios.defaults.baseURL = `https://api.${hostname}`;
    console.log("Running on Production", axios.defaults.baseURL);
}

axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;
axios.defaults.cancelToken = null;
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return Promise.reject(error);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        error.response = {
            data: {
                code: "RequestError",
                message: "There is an error with the request."
            }
        };

        return Promise.reject(error);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.toJSON());

        error.response = {
            data: {
                code: "NetworkError",
                message: "There is an error with the network connection."
            }
        };
        return Promise.reject(error);
    }
});

const classicWrapper = (component) => {
    return components(<Navbar />, component, <Footer />);
};

const routes = {
    root: { path: "/", element: classicWrapper(<About />) },
    about: { path: "/about", element: classicWrapper(<About />) },

    settings: { path: "/settings", navigate: "/settings/profile" },
    settings_account: { path: "/settings/account", element: classicWrapper(<SettingsAccount />) },
    settings_profile: { path: "/settings/profile", element: classicWrapper(<SettingsProfile />) },
    settings_experience: { path: "/settings/experience", element: classicWrapper(<SettingsExperience />) },

    search: { path: "/search", element: classicWrapper(<Search />) },
    profile: { path: "/profile", element: classicWrapper(<Profile />) },
    profile_id: { path: "/profile/:id", element: classicWrapper(<Profile />) },

    signin: { path: "/signin", element: <SignIn /> },
    signin_challenge: { path: "/signin/challenge", element: <SignInChallenge /> },
    reset_password: { path: "/reset-password", element: <ResetPassword /> },

    setup_entry: { path: "/profile-setup", element: <ProfileSetup /> },
    setup_info: { path: "/setup/info-input", element: <InfoInput /> },
};

const App = () => {
    return (
        <Account>
            <Router>
                <Routes>
                    <Route path="/" element={components(<Navbar hideOnTop={true} />, <Home />, <Footer />, <CookieConsent />)} />
                    <Route path="/about" element={components(<Navbar />, <About />, <Footer />, <CookieConsent />)} />
                    <Route path="/search" element={components(<Navbar />, <Search />, <Footer />, <CookieConsent />)} />

                    <Route path="/settings" element={<Navigate to="/settings/account" />} />
                    <Route path="/settings/profile" element={components(<Navbar />, <SettingsProfile />, <Footer />)} />
                    <Route path="/settings/experience" element={components(<Navbar />, <SettingsExperience />, <Footer />)} />
                    <Route path="/settings/account" element={components(<Navbar />, <SettingsAccount />, <Footer />)} />

                    <Route path="/profile" element={components(<Navbar />, <Profile />, <Footer />)} />
                    <Route path="/profile/:user_id" element={components(<Navbar />, <Profile />, <Footer />)} />

                    <Route path="/sign-in" element={components(<SignIn />, <CookieConsent />)} />
                    <Route path="/sign-in/challenge" element={<SignInChallenge />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/setup/profile-setup" element={<ProfileSetup />} />
                    <Route path="/setup/info-input" element={<InfoInput />} />

                    <Route path="/sign-up" element={components(<SignUpEntrace />, <CookieConsent />)} />
                    <Route path="/sign-up/:role" element={<SignUpForm />} />
                    <Route path="/sign-up/closed" element={<SignUpClosed />} />

                    <Route path="/contact-us" element={components(<Navbar />, <ContactUs />, <Footer />, <CookieConsent />)} />

                    <Route path="/terms/privacy-policy" element={components(<Navbar />, <PrivacyPolicy />, <Footer />)} />
                    <Route path="/terms/terms-conditions" element={components(<Navbar />, <TermsConditions />, <Footer />)} />
                    <Route path="/terms/cookies-policy" element={components(<Navbar />, <CookiesPolicy />, <Footer />)} />

                    <Route path="/404" element={components(<NotFound />)} />
                    <Route path="*" element={<Navigate to="/404" />} />

                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
                className="text-sm rounded-md"
            />
        </Account>
    );
};

export default App;