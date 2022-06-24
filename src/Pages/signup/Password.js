import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { default as PasswordInput } from "../../components/Password";
import { classNames } from "../../components/Utils";
import Button from "../../components/Button";

const Password = ({ email, token }) => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error_message, setErrorMessage] = useState(null);

    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [password_checked, setPasswordChecked] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setComplete(agreed && password_checked);

        // TODO: error message ?
    }, [password_checked, agreed]);

    const onSubmit = () => {
        setLoading(true);
        axios.post("/accounts/signup/confirm", {
            username: email,
            password: password,
            token: token
        }).then(res => {
            // automatically sign in once success
            axios.post("/accounts/signin", {
                username: email,
                password: password
            }).then(res => {
                console.log("auto sign in");
                console.log(res);
                navigate("/setup/profile-setup", { replace: true });
            }).catch(err => {
                let response = err.response.data;
                setErrorMessage(response.message);
            }).finally(() => {
                setLoading(false);
            });
        }).catch(err => {
            let response = err.response.data;
            setErrorMessage(response.message);
            setLoading(false);
        });
    };

    return (
        <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Set your password</h3>
            <p className="mt-1 text-sm font-medium mb-4 text-gray-500">Please set a password for your account {email}.</p>
            <PasswordInput
                className="py-4"
                onChange={(password, checked) => {
                    setPassword(password);
                    setPasswordChecked(checked);
                }}
            />

            <div className="flex items-start mt-6">
                <div className="flex-shrink-0">
                    <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className={classNames(
                            agreed ? "bg-emerald-600" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        )}
                    >
                        <span className="sr-only">Agree to policies</span>
                        <span
                            aria-hidden="true"
                            className={classNames(
                                agreed ? "translate-x-5" : "translate-x-0",
                                "inline-block h-5 w-5 rounded-full bg-white shadow transdiv ring-0 transition ease-in-out duration-200"
                            )}
                        />
                    </Switch>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-gray-500">
                        By selecting this, you agree to the{" "}
                        <a href="/terms/terms-conditions" className="font-medium text-gray-700 underline">
                            Terms and Conditions
                        </a>
                        {" "}and{" "}
                        <a href="/terms/privacy-policy" className="font-medium text-gray-700 underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Error message */}
            {
                error_message !== null &&
                <p className="mt-2 text-sm text-red-600">
                    {error_message}
                </p>
            }
            <div className="mt-6 text-sm text-right w-full grid place-items-center space-y-4">
                <Button
                    className="relative text-center text-sm px-4 py-4 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onSubmit}
                    loading={loading}
                    disabled={loading || !complete}
                    arrow={true}
                >
                    Next
                </Button>
            </div>
        </>
    );
};

export default Password;