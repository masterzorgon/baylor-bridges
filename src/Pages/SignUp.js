import React, { Fragment } from "react";
import { Switch, Listbox, Transition } from "@headlessui/react";
import { MailIcon, ExclamationCircleIcon, CheckIcon, SelectorIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";

import UserPool from "../UserPool";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "Alumni",
            token: "",
            valid_email: false,
            valid_password: {
                all_check: false,
                cap: false,
                special_char: false,
                length: false
            },
            valid_confirm_password: null,
            is_succeed: false,
            agreed: false,
            can_submit: false,
            is_email_registered: false,
        };

        // TODO: Display error message (for ambiguous reason)

        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkFormCompletion = this.checkFormCompletion.bind(this);
    }

    roles = [
        { value: "Alumni", title: "Alumini" },
        { value: "Student", title: "Current student" },
    ];

    roleValueToTitle(value) {
        return this.roles.find(role => role.value === value).title;
    }

    handleFirstNameChange(event) {
        this.setState({ first_name: event.target.value });
        this.checkFormCompletion({...this.state, first_name: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({ last_name: event.target.value });
        this.checkFormCompletion({ ...this.state, last_name: event.target.value });
    }

    handlePasswordChange(event) {
        var password = event.target.value;
        var is_cap = /[A-Z]/.test(password);
        var is_special = /[!|?|@|#|$|%|^|&|*|{|}|(|)|~]/.test(password);
        var is_length = event.target.value.length >= 6; // Cloudy: Said at least 6

        var state = {
            ...this.state,
            password: password,
            valid_password: {
                all_check: (is_length && is_special && is_cap),
                cap: is_cap,
                special_char: is_special,
                length: is_length,
            }
        };

        this.setState(state);
        this.checkFormCompletion(state);
    }

    handleConfirmPasswordChange(event) {
        var state = { ...this.state, valid_confirm_password: (event.target.value === this.state.password) };
        this.setState(state);
        this.checkFormCompletion(state);
    }

    handleEmailChange(event) {
        var email = event.target.value;
        var reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let is_valid = reg.test(email);

        var state = { ...this.state, email: email, valid_email: is_valid, is_email_registered: false };
        this.setState(state);
        this.checkFormCompletion(state);
    }

    handleRoleChange(value) {
        var state = { ...this.state, role: value };
        this.setState(state);
        this.checkFormCompletion(state);
    }

    handleTokenChange(event) {
        var state = { ...this.state, token: event.target.value };
        this.setState(state);
        this.checkFormCompletion(state);
    }

    checkFormCompletion(state) {
        var error_message = [];
        if (state.first_name === "" || state.last_name === "" || state.email === "" || state.password === "" || state.role === "" || state.token === "") {
            error_message.push("All fields are required.");
        }

        if (!state.valid_email) {
            error_message.push("Email must be valid.");
        }

        if (!state.valid_password.all_check) {
            error_message.push("Password must meet requirements.");
        }

        if (state.role !== "Alumni") {
            error_message.push("We're unable to sign you up as a student at the moment.");
        }

        if (state.token !== "token") {
            error_message.push("Token is invalid.");
        }

        if (state.agreed === false) {
            error_message.push("You must agree to the terms and conditions.");
        }

        console.log(error_message);

        this.setState({ can_submit: (error_message.length === 0) });
    }

    handleSubmit(event) {
        UserPool.signUp(this.state.email, this.state.password, [], null, (err, data) => {
            if (err) {
                var error_arr = String(err).split(":");
                this.setState({ is_succeed: false });

                if (error_arr[0] === "UsernameExistsException") {
                    this.setState({ is_email_registered: true });
                }
            } else {
                this.setState({ is_succeed: true });
            }
        });
    }

    renderForm() {
        return (
            <>
                <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                    <div className="relative max-w-xl mx-auto">
                        <svg className="absolute left-full transdiv translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
                            <defs>
                                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                        </svg>
                        <svg className="absolute right-full bottom-0 transdiv -translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
                            <defs>
                                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                        </svg>

                        {/* Title and subtitle */}
                        <a className="text-center" href="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://www.click2houston.com/resizer/3v3i6TY06rcxVuEOiQZbJjApyeA=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/MISBRBEDPZAR5BN2GDORMZITPI.jpg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Sign up</h2>
                            <p className="mt-4 text-lg leading-6 text-gray-500">
                                Create an account in Baylor Bridge, start your connection with Baylor University people around world.
                            </p>
                        </a>

                        {/* Form */}
                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                {/* First name */}
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            onChange={this.handleFirstNameChange}
                                        />
                                    </div>
                                </div>

                                {/* Last name */}
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            onChange={this.handleLastNameChange}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="pl-10 py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            onChange={this.handleEmailChange}
                                        />
                                        {(this.state.valid_email === false || this.state.is_email_registered === true) && this.state.email !== "" &&
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                            </div>
                                        }
                                    </div>

                                    {/* Email format invalid */}
                                    {this.state.valid_email === false && this.state.email !== "" &&
                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                            Your email address is invalid.
                                        </p>
                                    }

                                    {/* Email is registered */}
                                    {
                                        this.state.is_email_registered === true &&
                                        <div className="bg-red-50 rounded-md p-4 mt-3">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                                </div>
                                                <div className="ml-2">
                                                    <div className="text-red-700 text-sm">
                                                        <ul className="">
                                                            <li>This email address is associated with another account.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                                {/* Password */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            onChange={this.handlePasswordChange}
                                        />
                                        {this.state.valid_password === false && this.state.password !== "" &&
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                            </div>
                                        }
                                    </div>

                                    <div className={classNames(this.state.valid_password.all_check === true ? "bg-green-50" : "bg-red-50", "rounded-md p-4 mt-3")}>
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                {this.state.valid_password.length === false && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
                                                {this.state.valid_password.length === true && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
                                            </div>
                                            <div className="ml-2">
                                                <div className={classNames(this.state.valid_password.length === true ? "text-green-700" : "text-red-700", "text-sm")}>
                                                    <ul className="">
                                                        <li>Must be at least 6 characters</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                {this.state.valid_password.cap === false && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
                                                {this.state.valid_password.cap === true && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
                                            </div>
                                            <div className="ml-2">
                                                <div className={classNames(this.state.valid_password.cap === true ? "text-green-700" : "text-red-700", "text-sm")}>
                                                    <ul className="">
                                                        <li>Must include at least one capital letter</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                {this.state.valid_password.special_char === false && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
                                                {this.state.valid_password.special_char === true && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
                                            </div>
                                            <div className="ml-2">
                                                <div className={classNames(this.state.valid_password.special_char === true ? "text-green-700" : "text-red-700", "text-sm")}>
                                                    <ul className="">
                                                        <li>Must include at least one of the special characters: @, #, $, %, ^, &, *</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Coonfirm Password */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                        Confirm password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            id="confirm-password"
                                            name="confirm-password"
                                            type="password"
                                            autoComplete="password"
                                            className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            onChange={this.handleConfirmPasswordChange}
                                        />
                                        {this.state.valid_confirm_password === false && this.state.password !== "" &&
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                            </div>
                                        }
                                    </div>
                                    {this.state.valid_confirm_password === false && this.state.password !== "" &&
                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                            Password does not match.
                                        </p>
                                    }
                                </div>

                                {/* Role */}
                                <div className="sm:col-span-2">
                                    <Listbox value={this.state.role} onChange={this.handleRoleChange}>
                                        {({ open }) => (
                                            <>
                                                {/* Select box input */}
                                                <Listbox.Label className="block text-sm font-medium text-gray-700">Role</Listbox.Label>
                                                <div className="mt-1 relative">
                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate">{this.roleValueToTitle(this.state.role)}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    {/* Options popup */}
                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                            {this.roles.map((role) => (
                                                                <Listbox.Option
                                                                    key={role.value}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? "text-white bg-indigo-600" : "text-gray-900",
                                                                            "cursor-default select-none relative py-2 pl-8 pr-4"
                                                                        )
                                                                    }
                                                                    value={role.value}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                                                                                {role.title}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? "text-white" : "text-indigo-600",
                                                                                        "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                                {/* Alumini Token */}
                                {this.state.role === "Alumni" ? this.renderToken() : ""}

                                {/* Term Agreement */}
                                <div className="sm:col-span-2">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Switch
                                                checked={this.state.agreed}
                                                onChange={(value) => {
                                                    var state = { ...this.state, agreed: value };
                                                    this.setState(state);
                                                    this.checkFormCompletion(state);
                                                }}
                                                className={classNames(
                                                    this.state.agreed ? "bg-indigo-600" : "bg-gray-200",
                                                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                )}
                                            >
                                                <span className="sr-only">Agree to policies</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        this.state.agreed ? "translate-x-5" : "translate-x-0",
                                                        "inline-block h-5 w-5 rounded-full bg-white shadow transdiv ring-0 transition ease-in-out duration-200"
                                                    )}
                                                />
                                            </Switch>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base text-gray-500">
                                                By selecting this, you agree to the{" "}
                                                <a href="/" className="font-medium text-gray-700 underline">
                                                    Privacy Policy
                                                </a>{" "}
                                                and{" "}
                                                <a href="/" className="font-medium text-gray-700 underline">
                                                    Cookie Policy
                                                </a>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-25"
                                        onClick={this.handleSubmit}
                                        disabled={!this.state.can_submit}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    renderToken() {
        return (
            <div className="sm:col-span-2">
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                    Token
                </label>
                <div className="mt-1 relative">
                    <input
                        id="token"
                        name="token"
                        type="text"
                        autoComplete="token"
                        className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        onChange={this.handleTokenChange}
                    />
                </div>
            </div>
        );
    }

    renderSucceed() {
        return (
            <div className="section has-text-centered">
                <div className="is-size-1">
                </div>
                <div className="is-size-6">
                    <p>Thank you for signing up.</p>
                    <p>A confirmation email is sent to your email address, please verify your email address.</p>
                </div>
            </div>
        );
    }

    render() {
        return <>{this.state.is_succeed ? this.renderSucceed() : this.renderForm()}</>;
    }
}

export default SignUp;