import React, { useContext, useEffect } from "react";
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

import Terms from "./Pages/terms/Terms";

import SignIn from "./Pages/signin/SignIn";
import SignUp from "./Pages/signup/SignUp";
import ForgetPassword from "./Pages/forget-password/ForgetPassword";

import ProfileSetup from "./Pages/setup/ProfileSetup";
import InfoInput from "./Pages/setup/InfoInput";

import Search from "./Pages/Search";
import Profile from "./Pages/profile";
import Settings from "./Pages/settings";

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

const AlwaysOnTop = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{children}</>;
};

const App = () => {
    return (
        <Account>
            <Router>
                <AlwaysOnTop>
                    <Routes>
                        <Route path="/" element={<HomeLayout />}>
                            <Route index element={<Home />} />
                        </Route>

                        <Route path="/" element={<HamburgerLayoutWithCookieConsent />}>
                            <Route path="about" element={<About />} />
                            <Route path="contact-us" element={<ContactUs />} />
                            <Route path="terms/*" element={<Terms />} />
                            <Route path="profile/*" element={<Profile />} />
                        </Route>

                        <Route path="/" element={<HamburgerLayout auth={true} />}>
                            <Route path="search" element={<Search />} />
                            <Route path="settings/*" element={<Settings />} />
                        </Route>

                        <Route path="/setup/profile-setup" element={<ProfileSetup />} />
                        <Route path="/setup/info-input" element={<InfoInput />} />

                        <Route path="/sign-in/*" element={<SignIn />} />
                        <Route path="/sign-up/*" element={<SignUp />} />
                        <Route path="/forget-password/*" element={<ForgetPassword />} />

                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AlwaysOnTop>
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