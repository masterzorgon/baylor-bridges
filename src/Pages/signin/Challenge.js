import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";

import { AccountContext } from "../../components/Account";
import { changeBaseURL, changeSearchParam, getSearchParam, requiresProfileSetup } from "../../components/Utils";
import Password from "../../components/Password";
import Button from "../../components/Button";
import NotFound from "../404";

const Challenge = () => {
    const navigate = useNavigate();
    const { authChallenge } = useContext(AccountContext);

    const [loading, setLoading] = useState(false);
    const [error_message, setErrorMessage] = useState(null);
    const [response, setResponse] = useState(null);
    const [success, setSuccess] = useState(false);
    const [complete, setComplete] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get("session");
    const name = urlParams.get("name");
    const username = urlParams.get("username");

    console.log(name, username);

    const challenges = {
        "NEW_PASSWORD_REQUIRED": {
            form: (
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
                            className="text-sm py-3"
                            onChange={
                                (password, checked) => {
                                    setResponse({ ...response, new_password: password, username: username });
                                    setComplete(checked);
                                }
                            }
                        />
                    </div>
                </div>
            ),
            success: (
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Your new password is set!
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                            For future sign in, please use your new password.
                        </p>
                        <div className="flex flex-col justify-center items-center mt-4">
                            <lord-icon
                                src="https://cdn.lordicon.com/rcopausw.json"
                                trigger="loop"
                                style={{ width: "8rem", height: "8rem" }}>
                            </lord-icon>
                        </div>
                    </div>
                </div>
            ),
            submit: () => {
                console.log(response);

                authChallenge(name, session, response).then(response => {
                    setSuccess(true);
                    setResponse(response);
                }).catch(error => {
                    setErrorMessage(error.response.data.message);
                }).finally(() => {
                    setLoading(false);
                });
            },
            done: () => {
                if (requiresProfileSetup(response)) {
                    let destination = changeBaseURL(window.location.href, "/setup/profile-setup");
                    navigate(destination);
                    return;
                }

                let redirect = getSearchParam(window.location.href, "redirect");
                let destination = "";

                if (redirect) {
                    destination = changeBaseURL(window.location.href, redirect);
                    destination = changeSearchParam(destination, "redirect", null);
                    destination = changeSearchParam(destination, "session", null);
                    destination = changeSearchParam(destination, "name", null);
                    destination = changeSearchParam(destination, "sub", null);
                } else {
                    destination = changeBaseURL(destination, "/");
                }

                navigate(destination, { replace: true });
            }
        }
    };

    // If it is an undefined challenge, then it is an error (Or could be a challenge have not been implemented yet)
    if (!challenges[name] || !username || !session) {
        return <NotFound />;
    }

    const onSubmit = (event) => {
        setLoading(true);
        challenges[name].submit();
    };

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

                            {/* Challenge Form */}
                            {success === false && challenges[name].form}
                            {success === true && challenges[name].success}

                            {
                                success === false &&
                                <div>
                                    <Button
                                        onClick={onSubmit}
                                        loading={loading}
                                        disabled={loading || !complete}
                                        className="text-sm py-3"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            }
                            {
                                success === true &&
                                <div>
                                    <button
                                        type="submit"
                                        className={`${loading ? "cursor-not-allowed" : ""} w-full flex justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-50 hover:text-emerald-800 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                                        onClick={challenges[name].done}
                                    >
                                        Complete
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Challenge;
