import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "../404";

import WelcomePage from "./WelcomePage";
import ProfileSetup from "./ProfileSetup";

const index = () => {
    return (
        <Routes>
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="profile-setup" element={<ProfileSetup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default index;