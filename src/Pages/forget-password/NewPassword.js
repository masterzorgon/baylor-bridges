import React, { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/outline";
import axios from "axios";
import { toast } from "react-toastify";

import Password from "../../components/Password";

const NewPassword = () => {

    const [password, setPassword] = useState("");
    const [password_checked, setPasswordChecked] = useState("");
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNewPassword = () => {
        if (password_checked) {
            setLoading(true);
            // fetch email and confirm code from url params
            axios.post("/accounts/password/confirm", {
                email: username,
                confirm_code: token,
                new_password: password,
            })
                .then(res => {
                    toast.success("Password updated successfully!");
                    // setTimeout(() => window.location.href = "/sign-in", 1500);
                })
                .catch(err => toast.err(err.response.data.message))
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        let url = window.location.href;
        url.split("?")[1].split("&").forEach(param => {
            param.split("=")[0] === "token"
                ? setToken(param.split("=")[1])
                : setUsername(param.split("=")[1]);
        });
    }, []);

    return (
        <>
            <div className="flex sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
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
                        loading={loading}
                        className={
                            password_checked
                                ? "bg-emerald-600 mt-8 cursor-pointer shadow-md inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white hover:bg-emerald-700"
                                : "bg-emerald-600 opacity-40 mt-8 cursor-not-allowed shadow-md inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-gray-700 hover:bg-gray-300"
                        }
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default NewPassword;
