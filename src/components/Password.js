import React, { useEffect, useState } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";

import { classNames } from "./Utils";

const Password = ({ value, onChange, className }) => {
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState({
        is_low: false,
        is_cap: false,
        is_special: false,
        is_length: false,
    });

    useEffect(() => {
        setPassword(value);
    }, [value]);

    const setPasswordTrigger = (e) => {
        let password = e.target.value;
        setPassword(password);

        let is_low = /[a-z]/.test(password);
        let is_cap = /[A-Z]/.test(password);
        let is_digit = /[0-9]/.test(password);
        let is_special = /[!@#$%^&*()_+\-=[\]{};':"\\|;.<>/?]/.test(password);
        let is_length = password.length >= 10;
        let all_check = (is_low && is_cap && is_digit && is_special && is_length);

        // All requirements must match Cognito password policy
        setCheck({
            is_low: is_low,
            is_cap: is_cap,
            is_special: is_special,
            is_length: is_length,
            all_check: all_check,
        });

        if (onChange) {
            onChange(password, all_check);
        }
    };

    const getIcon = (bool) => {
        if (bool) return <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
        return <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
    };

    return (
        <div className="sm:col-span-2">
            {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
            </label> */}
            <div className="mt-1 relative">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Password"
                    className={classNames("py-2 px-3 block w-full shadow-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md", className)}
                    onChange={setPasswordTrigger}
                    value={password}
                />
            </div>

            <div className={classNames(check.all_check === true ? "bg-green-50" : "bg-red-50", "rounded-md p-4 mt-3")}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {getIcon(check.is_length)}
                    </div>
                    <div className="ml-2">
                        <div className={classNames(check.is_length === true ? "text-green-700" : "text-red-700", "text-sm")}>
                            <ul className="">
                                <li>At least 10 characters</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {getIcon(check.is_cap)}
                    </div>
                    <div className="ml-2">
                        <div className={classNames(check.is_cap === true ? "text-green-700" : "text-red-700", "text-sm")}>
                            <ul className="">
                                <li>Contains at least one uppercase letter</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {getIcon(check.is_low)}
                    </div>
                    <div className="ml-2">
                        <div className={classNames(check.is_low === true ? "text-green-700" : "text-red-700", "text-sm")}>
                            <ul className="">
                                <li>Contains at least one lowercase letter</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {getIcon(check.is_special)}
                    </div>
                    <div className="ml-2">
                        <div className={classNames(check.is_special === true ? "text-green-700" : "text-red-700", "text-sm")}>
                            <ul className="">
                                <li>Contains at least one of the special characters</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Password;