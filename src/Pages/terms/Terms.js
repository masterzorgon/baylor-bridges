import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "../404";

import CookiesPolicy from "./CookiesPolicy";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";

const Terms = () => {
    return (
        <>
            <Routes>
                <Route path="cookies-policy" element={<CookiesPolicy />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-conditions" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Terms;