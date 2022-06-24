import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { MailIcon } from "@heroicons/react/outline";
import axios from "axios";

import Button from "../../components/Button";
import { classNames } from "../../components/Utils";

const EmailAddress = ({email: email_query, role}) => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error_message, setErrorMessage] = useState(null);
    const [email, setEmail] = useState(email_query || "");

    const navigate = useNavigate();

    useEffect(() => {
        let reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let is_valid = reg.test(email || "");

        if (role === "student") {
            is_valid = is_valid && email.endsWith("@baylor.edu");
        }

        setComplete(email && email !== "" && is_valid);
        setErrorMessage(null);
    }, [role, email]);

    const onSubmit = () => {
        setLoading(true);
        axios.post("/accounts/signup", {
            username: email,
            role: role
        })
            .then(res => {
                setErrorMessage(null);
            }).catch(err => {
                let res = err.response.data;
                if (res.code === "ConfirmationRequiredException") {
                    navigate({
                        pathname: "step-2",
                        search: createSearchParams({"email": email})
                    });
                } else {
                    setErrorMessage(res.message);
                }
            }).finally(() => {
                setLoading(false);
            });
    };

    // const returnButton = () => {
    //     return (
    //         <button onClick={() => null} className=" flex items-center mb-4 text-sm text-emerald-600 hover:text-green-700">
    //             <ArrowLeftIcon width="1em" />
    //             <span className="ml-2">{email}</span>
    //         </button>
    //     );
    // };

    return (
        <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Your email address</h3>
            <p className="mt-1 text-sm font-medium mb-4 text-gray-500">{role === "student" ? "Please use your Baylor University email to sign up as a current student." : "Please use your email address to sign up as an alumnus."}</p>
            <div className="mt-4 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={classNames("py-4 block w-full pl-10 sm:text-sm rounded-md", error_message === null ? "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" : "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500")}
                    placeholder={role === "student" ? "you@baylor.edu" : "you@alumni.baylor.edu"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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

export default EmailAddress;