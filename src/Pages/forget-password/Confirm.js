import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import Password from "../../components/Password";
import Button from "../../components/Button";

const Confirm = () => {
    const navigate = useNavigate();
    const [password_checked, setPasswordChecked] = useState(""); // used to determine whether password meets security requirements
    const [password, setPassword] = useState(""); // input state for the user's new password
    const [token, setToken] = useState(""); // auth token parsed from the url params
    const [email, setEmail] = useState(""); // account submitting request parsed from url params
    const [loading, setLoading] = useState(false); // puts submit button in loading state when making api calls

    // submit new password request to backend
    const handleNewPassword = async () => {
        setLoading(true);
        try {
            axios.post("/accounts/password/confirm", {
                email: email,
                token: token,
                new_password: password,
            }).then((res) => {
                toast.success("Password changed successfully");
                console.log(res);
                navigate("/sign-in");
            }).catch((err) => {
                toast.error(err.response.data.message);
                console.log(err);
            });
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setLoading(false);
    };

    // parse url for email and token
    useEffect(() => {
        // Get query params
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get("email");
        const token = queryParams.get("token");

        setEmail(email);
        setToken(token);

        console.log(`Token: ${token}, email: ${email}`);
    }, []);

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/bu-logo.svg"
                            alt="Workflow"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Let&#39;s set your<br></br>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                            new password
                        </span>
                    </h2>
                </div>
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
                                        onChange={(password, checked) => {
                                            setPassword(password);
                                            setPasswordChecked(checked);
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    disabled={!password_checked || loading}
                                    className="disabled:cursor-not-allowed disabled:opacity-50 text-sm w-full flex justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    onClick={async () => handleNewPassword()}
                                    loading={loading}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Confirm;
