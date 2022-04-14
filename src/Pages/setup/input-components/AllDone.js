import React, { useState, useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { CheckCircleIcon, ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react/cjs/react.production.min";
import { Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";
import axios from "axios";

import Button from "../../../components/Button";

const AllDone = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const transition = useTransition(show, { // used to fade icon in
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: -30, opacity: 1 },
        leave: { x: 0, y: -80, opacity: 0 }
    });
    const [alert, setAlert] = useState(false);

    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { y: 0.6 },
            particleCount: Math.floor(750 * particleRatio)
        });
    }, []);

    const canvasStyles = {
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    };

    const fire = useCallback(() => {
        makeShot(0.25,
            {
                spread: 26,
                startVelocity: 55
            });

        makeShot(0.2,
            {spread: 60});

        makeShot(0.35, {
            spread: 180,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 180,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 180,
            startVelocity: 45
        });
    }, [makeShot]);

    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);

        // Replace null with empty string in account object
        const accountCopy = { ...account };
        Object.keys(accountCopy).forEach(key => {
            if (accountCopy[key] === null) {
                accountCopy[key] = "";
            }
        });

        axios.put("/account/profile", accountCopy)
            .then(res => {
                fire();
                console.log("---RESPONSE---", res);
                setTimeout(() => window.location.href = "/", 1500);
            })
            .catch(err => {
                console.log("---ERROR---", err);
                setAlert(true);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            {/* Overlapping cards */}
            <Transition
                show={show && modal === 6}
                as={Fragment}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-[400ms] transition ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <section
                    className=""
                    aria-labelledby="contact-heading"
                >
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                    {/* ALERT NOTIFICATION BELOW */}
                    <div
                        aria-live="assertive"
                        className="fixed z-50 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
                    >
                        <div className="w-full flex flex-col space-y-4 mb-auto items-end">
                            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                            <Transition
                                show={alert}
                                as={Fragment}
                                enter="transform ease-out duration-300 transition"
                                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="max-w-sm w-full bg-red-50 shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                                <p className="text-sm font-medium text-gray-900">Submission unsuccessful</p>
                                                <p className="mt-1 text-sm text-gray-500">Network issues — Please try again.</p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 flex">
                                                <button
                                                    className="bg-red-50 rounded-md inline-flex text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    onClick={() => {
                                                        setAlert(false);
                                                    }}
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <XIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    {/* ALERT NOTIFICATION ABOVE */}
                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8 mx-auto">
                        <div className="flex flex-col bg-white rounded-2xl">
                            <div className="flex-1 relative pt-16 pb-8">

                                {transition((style, item) => {
                                    return item
                                        ?
                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                            <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </animated.div>
                                        : "";
                                })}
                                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">You&apos;re all set!</span>
                                    <span className="block">Great job.</span>
                                </h2>
                                <p className="mt-4 text-base text-gray-500">
                                    Thank you so much for taking the time to set up your Baylor Bridges account.
                                    We hope you enjoy our platform, and please feel to reach out via the Contact Us
                                    page if you have any questions or concerns.
                                </p>
                                <div className="flex justify-between mt-6 space-x-2">
                                    <Button
                                        className="sm:w-fit px-5 py-3"
                                        onClick={onSubmit}
                                        arrow={true}
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Transition>
        </>
    );
};

export default AllDone;