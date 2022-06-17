import React, { useState, useEffect } from "react";
// import { LockClosedIcon } from "@heroicons/react/outline";
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
            {/* <div className="flex sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
                <div className="relative h-full w-full mx-auto overflow-hidden">
                    <svg
                        className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                    </svg>
                    <svg
                        className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                    </svg>
                </div>
            </div>

            <div className="z-10 min-h-screen flex flex-col justify-center ">
                <div className="bg-white max-w-2xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 -mt-8">
                    <LockClosedIcon style={{ width: "3rem", height: "3rem" }} />
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Let&#39;s create your</span>
                        <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                            new password!
                        </span>
                    </h2>
                    <p className="mt-4 mx-auto text-gray-700">
                        Please refer to the input field below where you will be able to enter the value
                        of your new password. It is best practice to use a password manager for safe keeping
                        of your passwords.
                    </p>
                    <div className="mt-5">
                        <Password
                            className="py-4"
                            onChange={(password, checked) => {
                                setPassword(password);
                                setPasswordChecked(checked);
                            }}
                        />
                    </div>
                    <button
                        onClick={handleNewPassword}
                        disabled={!password_checked}
                        className={
                            password_checked
                                ? "bg-emerald-600 mt-8 cursor-pointer shadow-md inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white hover:bg-emerald-700"
                                : "bg-emerald-600 opacity-50 mt-8 cursor-not-allowed shadow-md inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white"
                        }
                    >
                        Submit
                    </button>
                </div>
            </div> */}


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
