import React, { Fragment, useRef, useCallback } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
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
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
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

            <div className="relative pt-6 pb-16 sm:pb-24">
                <Popover>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <a href="">
                                        <img
                                            className="h-8 w-auto sm:h-10"
                                            src="/favicon.ico"
                                            alt=""
                                        />
                                    </a>
                                    <div className="-mr-2 flex items-center md:hidden">
                                        <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="px-5 pt-4 flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="block w-full px-5 py-3 text-center font-medium text-emerald-600 bg-gray-50 hover:bg-gray-100"
                                >
                                    Log in
                                </a>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>

                <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Welcome fellow Bear!</span>{" "}
                            <span className="block text-emerald-600 xl:inline">Let&apos;s setup your account.</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Since your account is so new, we will walk you through
                            a few steps to get you started. You will be prompted to fill out
                            some profile information so that others can better connect with you
                            via your Baylor Bridges account.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <button
                                    onClick={onSubmit}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Get started
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfileSetup;
