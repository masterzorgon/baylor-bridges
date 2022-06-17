import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Password from "../../components/Password";

const Confirm = () => {

    const [password_checked, setPasswordChecked] = useState(""); // used to determine whether password meets security requirements
    const [password, setPassword] = useState(""); // input state for the user's new password
    const [token, setToken] = useState(""); // auth token parsed from the url params
    const [email, setEmail] = useState(""); // account submitting request parsed from url params
    const [loading, setLoading] = useState(false);

    // submit new password request to backend
    const handleNewPassword = () => {
        setLoading(true);

        axios.post("/accounts/password/confirm", {
            email: email,
            token: token,
            new_password: password,
        })
            .then(res => {
                console.log(res);
                toast.success("Password changed successfully");
                setTimeout(() => window.location.href = "/sign-in", 2000);
            })
            .catch(err => {
                toast.err(err.response.data.message);
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    // parse url for email and token
    useEffect(() => {
        const url = window.location.href;
        const params = url.split("?")[1].split("&");

        for (let i = 0; i < params.length; i++) {
            let param = params[i].split("=");
            if (param[0] === "token") setToken(param[1]);
            if (param[0] === "email") setEmail(param[1]);
        }

        console.log(`Token: ${token}, email: ${email}`);
    }, []);

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <a className="sm:mx-auto sm:w-full sm:max-w-md" href="/">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="/Baylor-University-Athletics-01.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </a>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-6">

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Set your new password
                                </h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                    <p>
                                        You are required to set a new password for your account.
                                        Please enter a new password.
                                    </p>
                                </div>
                                <div className="mt-5 sm:flex sm:items-center">
                                    <Password
                                        className="py-4"
                                        onChange={(password, checked) => {
                                            setPassword(password);
                                            setPasswordChecked(checked);
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={!password_checked}
                                    className={`${loading ? "cursor-not-allowed" : ""} disabled:opacity-50 text-sm w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                                    onClick={handleNewPassword}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Confirm;
