import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "../404";

import Request from "./Request";
import Confirm from "./Confirm";

const ForgetPassword = () => {
    return (
        <>
            <Routes>
                <Route path="/" index element={<Request />} />
                <Route path="confirm" element={<Confirm />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default ForgetPassword;