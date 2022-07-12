import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import NotFound from "../404";

import WelcomePage from "./Welcome";
import Form from "./Form";
import Done from "./Done";

const index = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="welcome" />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="form" element={<Form />} />
            <Route path="done" element={<Done />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default index;