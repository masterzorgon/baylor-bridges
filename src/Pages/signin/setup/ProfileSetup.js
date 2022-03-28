import React, { useRef, useCallback } from "react"; 
// import { Popover, Transition } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
import ReactCanvasConfetti from "react-canvas-confetti";

const ProfileSetup = () => {

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
        fire();
        setTimeout(() => {
            window.location.href = "/sign-in/setup/info-input"; // link to next page
        }, 2000);
    };

    return (
        <div className="relative bg-white-50 overflow-hidden">
            <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
                <div className="relative h-full max-w-7xl mx-auto">
                    <svg
                        className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                    </svg>
                    <svg
                        className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                    </svg>
                </div>
            </div>

            <div className="relative sm:mx-10 sm:my-10 flex justify-center align-middle">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
                    <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                className="h-full w-full object-cover"
                                src="/landing_page_background.jfif"
                                alt="People working on laptops"
                            />
                            <div className="absolute inset-0 bg-emerald-700 mix-blend-multiply" />
                            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                        </div>
                        <div className="relative px-4 py-14 sm:px-6 sm:py-24 lg:py-28 lg:px-8">
                            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                <span className="block text-white">
                                    Welcome,
                                </span>
                                <span className="block text-emerald-200">
                                    We are so glad to have you!
                                </span>
                            </h1>
                            <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                                Since your account is so new, we will walk you through
                                a few steps to get you started. You will be prompted to fill out
                                some profile information so that others can better connect with you
                                via your Baylor Bridges account.
                            </p>
                            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                                    <button
                                        href="/sign-up"
                                        onClick={onSubmit}
                                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white sm:px-9
                                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-103 hover:bg-emerald-100 duration-200"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100 -z-10 lg:hidden"></div>
            </div>
        </div>
    );
};

export default ProfileSetup;
