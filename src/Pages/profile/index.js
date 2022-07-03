import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFound from "../404";

import Profile from "./Profile";

const index = () => {
    console.log("Profile index");

    return (
        <Routes>
            <Route path="/" element={<Profile />}>
                <Route index element={<Profile />} />
                <Route path=":user_id" exact element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default index;