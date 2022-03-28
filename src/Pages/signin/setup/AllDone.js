import React, { useState, useCallback, useRef } from "react";
import { useTimeoutFn } from "react-use";
import ReactCanvasConfetti from "react-canvas-confetti";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react/cjs/react.production.min";
import { Transition } from "@headlessui/react";
import { useTransition, animated } from "react-spring";
import axios from "axios";
    
const AllDone = ({ account, setAccount, modal, show, setModal, setShow }) => {

    const [, , takeAwayModal] = useTimeoutFn(() => setShow(false), 0);
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
            {
                spread: 60
            });

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

    const onSubmit = (event) => {    
        axios.put("/account/profile")
            .then(res => {
                fire();
                console.log("---RESPONSE---", res);
                setTimeout(() => window.location.href = "/", 1500);
            })
            .catch(err => {
                console.log("---ERROR---", err);
                setAlert(true);
            });
    };

    const prevModal = (event) => {
        event.preventDefault();
        takeAwayModal();
        setTimeout(() => setModal(modal - 1), 400);
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
                    className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="contact-heading"
                >
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                    {/* ALERT NOTIFICATION BELOW */}
                    <div
                        aria-live="assertive"
                        className="fixed z-50 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
                    >
                        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
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
                    <div className="grid grid-cols-1 gap-y-20 lg:gap-y-0 lg:gap-x-8">
                        <div className="flex flex-col bg-emerald-50 rounded-2xl shadow-xl">
                            <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                                {transition((style, item) => {
                                    return item
                                        ?
                                        <animated.div style={style} className="absolute top-0 p-5 inline-block bg-emerald-600 rounded-xl shadow-lg transform -translate-y-1/2">
                                            <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </animated.div>
                                        : "";
                                })}
                                <h3 className="text-xl font-medium text-gray-900">You are all set!</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Thank you so much for taking the time to set up your Baylor Bridges account.
                                    We hope you enjoy our platform, and please feel to reach out via the Contact Us
                                    page if you have any questions or concerns.

                                </p>
                            </div>
                            <div className="p-6 pt-0 bg-emerald-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevModal}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-600 shadow-sm text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-103 duration-200"
                                    >
                                        <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onSubmit}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-103 duration-200"
                                    >
                                        Submit
                                        <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                    </button>                              
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