import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
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
import { default as Settings } from "./Pages/settings/Settings";

import ProfileSetup from "./Pages/setup/ProfileSetup";
import InfoInput from "./Pages/setup/InfoInput";

import Search from "./Pages/Search";
import Profile from "./Pages/profile/Profile";


import { Account, AccountContext } from "./components/Account";

import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


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

const HomeLayout = () => (
    <HamburgerLayout hideOnTop={true} />
);

const HamburgerLayout = ({ auth = false, hideOnTop = false }) => {
    const { getAccountLocal } = useContext(AccountContext);
    const location = useLocation();

    if (auth === true && getAccountLocal() === null) {
        return <Navigate to={`/sign-in?redirect=${location.pathname}`} />;
    }

    return (
        <>
            <Navbar hideOnTop={hideOnTop} />
            <Outlet />
            <Footer />
        </>
    );
};

const HamburgerLayoutWithCookieConsent = () => (
    <>
        <HamburgerLayout />
        <CookieConsent />
    </>
);

const App = () => {
    return (
        <Account>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Home />} />
                    </Route>

                    <Route path="/" element={<HamburgerLayoutWithCookieConsent />}>
                        <Route path="about" element={<About />} />
                        <Route path="contact-us" element={<ContactUs />} />

                        <Route path="terms/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="terms/terms-conditions" element={<TermsConditions />} />
                        <Route path="terms/cookies-policy" element={<CookiesPolicy />} />
                    </Route>

                    <Route path="/" element={<HamburgerLayout auth={true} />}>
                        <Route path="search" element={<Search />} />
                        <Route path="settings/*" element={<Settings />} />
                        <Route path="profile" element={<Profile />}>
                            <Route path=":user_id" exact element={<Profile />} />
                        </Route>
                    </Route>

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-in/challenge" element={<SignInChallenge />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/setup/profile-setup" element={<ProfileSetup />} />
                    <Route path="/setup/info-input" element={<InfoInput />} />

                    <Route path="/sign-up" element={<SignUpEntrace />} />
                    <Route path="/sign-up/:role" element={<SignUpForm />} />
                    <Route path="/sign-up/closed" element={<SignUpClosed />} />

                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
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