import React, { useState, useEffect, useContext } from "react";

import { AccountContext } from "../../components/Account";
import Container from "./Container";
import Button from "../../components/Button";

import axios from "axios";

const Account = () => {
    const { getAccount, getAccountLocal } = useContext(AccountContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail(getAccountLocal().email);
        getAccount()
            .then(res => {
                setEmail(res.email);
            });
    }, []);

    const handleData = () =>
    {
        setPassword("password");

        const config =
        {
            method: "get",
            url: "/account", 
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(password)
        };

        axios(config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        return (
            <>
                <legend className="block text-sm font-medium text-gray-700">hello</legend>

                <Button
                    // loading={loading}
                    // disabled={loading || !complete}
                    // onClick={() => onSubmit()}
                >
                    Save
                </Button>
            </>
        );
    };

    return (
        <>
            <Container current="account">
                <div>
                    <h3 className="mt-10 text-lg leading-6 font-medium text-gray-900">Account Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account information, set up two-factor authentication, and delete your Baylor Bridges account.</p>
                </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Account Email</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{email}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        Change
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Password</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                    {/* [*][*] PASSWORD [*][*] */}
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={handleData}
                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        Change
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Two-Factor Authentication</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        Set Up
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Account</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </Container>
        </>
    );
};

export default Account;