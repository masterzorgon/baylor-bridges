import React, { useState, useContext } from "react";
import { XCircleIcon, ArrowSmLeftIcon } from "@heroicons/react/solid";

import { AccountContext } from "../../components/Account";
import Button from "../../components/Button";

const SignIn = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error_message, setErrorMessage] = useState(null);
    // const [newUser, setNewUser] = useState(false); // used to determine whether user has any null values, and direct them to new user page
    const { signIn } = useContext(AccountContext);

    // useEffect(() => {
    //     console.log("NEW USER STATUS", newUser);
    // }, []);

    const onSubmit = (event) => {
        setLoading(true);

        signIn(email, password)
            .then(response => {
                console.log(response);
                let redirect = false;
                
                for (const key in response) {
                    if (response[key] === null) {
                        redirect = true;
                        break;
                    } 
                }

                if (redirect) window.location.href = "/sign-in/setup/profile-setup";
                else window.location.href = "/";
            })
            .catch(error => {
                let response = error.response.data;

                // Needs authentication challenge
                if (response.code === "ChallengeRequiredException") {
                    let payload = response.payload;
                    let name = payload["challenge_name"];
                    let session = payload["session"];
                    let sub = payload["sub"];

                    window.location.href = `/sign-in/challenge?session=${session}&name=${name}&sub=${sub}`;
                } else setErrorMessage(response.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <a href="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/Baylor-University-Athletics-01.svg"
                            alt="Workflow"
                        />
                    </a>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-6">
                            {/* Error message */}
                            {
                                error_message !== null &&
                                <div className="bg-red-50 rounded-md p-4 mt-3">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-2">
                                            <div className="text-red-700 text-sm">
                                                <ul className="">
                                                    <li>{error_message}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

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
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setErrorMessage(null);
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                console.log("enter key pressed");
                                                onSubmit();
                                            } else {
                                                setEmail(event.target.value);
                                                setErrorMessage(null);
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
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
                                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="/reset-password" className="font-medium text-emerald-600 hover:text-emerald-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button
                                    onClick={onSubmit}
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Sign In
                                </Button>
                            </div>

                            <div className="mt-3 text-sm text-center w-full grid place-items-center">
                                <a href="/" className="font-medium text-emerald-600 hover:text-emerald-500 flex items-center space-x-0.5">
                                    <ArrowSmLeftIcon className="h-4 w-4" />
                                    <span>Go back home</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
