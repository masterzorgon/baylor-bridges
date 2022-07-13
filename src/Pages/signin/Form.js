import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AccountContext } from "../../components/Account";
import { changeBaseURL, changeSearchParam, getSearchParam, requiresProfileSetup } from "../../components/Utils";
import Button from "../../components/Button";

const Form = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const { signIn } = useContext(AccountContext);


    const onSubmit = () => {
        setLoading(true);

        signIn(email, password, remember)
            .then(response => {
                console.log(response);

                if (requiresProfileSetup(response)) {
                    let destination = changeBaseURL(window.location.href, "/setup");
                    navigate(destination);
                    return;
                }

                let redirect = getSearchParam(window.location.href, "redirect");

                if (redirect) {
                    let destination = "";
                    destination = changeBaseURL(window.location.href, redirect);
                    destination = changeSearchParam(destination, "redirect", null);
                    navigate(destination, { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            })
            .catch(error => {
                let response = error.response.data;

                // Needs authentication challenge
                if (response.code === "ChallengeRequiredException") {
                    let payload = response.payload;
                    let name = payload["challenge_name"];
                    let session = payload["session"];
                    let username = payload["username"];

                    let destination = changeBaseURL(window.location.href, "/sign-in/challenge");
                    destination = changeSearchParam(destination, "name", name);
                    destination = changeSearchParam(destination, "session", session);
                    destination = changeSearchParam(destination, "username", username);

                    navigate(destination, { replace: true });
                } else {
                    toast.error(error.response.data.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md -mt-14">
                    <Link to="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/bu-logo.svg"
                            alt="Workflow"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-7">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                console.log("enter key pressed");
                                                onSubmit();
                                            } else {
                                                setEmail(event.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        onChange={(event) => setPassword(event.target.value)}
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                console.log("enter key pressed");
                                                onSubmit();
                                            } else {
                                                setPassword(event.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded-sm"
                                        checked={remember}
                                        onChange={(event) => setRemember(event.target.checked)}
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="/forget-password" className="font-medium text-emerald-600 hover:text-emerald-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div className="text-sm text-center w-full grid place-items-center space-y-4">
                                <Button
                                    onClick={onSubmit}
                                    loading={loading}
                                    disabled={loading}
                                    className="py-3"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
