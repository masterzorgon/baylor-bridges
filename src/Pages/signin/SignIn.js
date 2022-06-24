import React from "react";
import { Route, Routes } from "react-router-dom";

import Form from "./Form";
import Challenge from "./Challenge";
import NotFound from "../404";

const SignIn = () => {
    return (
        <>
            <Routes>
                <Route path="/" index element={<Form />} />
                <Route path="challenge" element={<Challenge />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default SignIn;
