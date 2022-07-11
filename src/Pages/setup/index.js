import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "../404";

import WelcomePage from "./Welcome";
import Form from "./Form";
import Done from "./Done";

const index = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="form" element={<Form />} />
            <Route path="done" element={<Done />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default index;