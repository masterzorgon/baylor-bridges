import React, { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const AllDone = () => {

    const onSubmit = () => {
        fire();
        // setTimeout(() => {
        //     window.location.href = "/";
        // }, 2000);
    };

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

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="relative sm:py-16">
                <div aria-hidden="true" className="hidden sm:block">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                    <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
                        <defs>
                            <pattern
                                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
                    </svg>
                </div>
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative rounded-2xl px-6 py-10 bg-emerald-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
                        <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                            <svg
                                className="absolute inset-0 h-full w-full"
                                preserveAspectRatio="xMidYMid slice"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 1463 360"
                            >
                                <path
                                    className="text-emerald-500 text-opacity-40"
                                    fill="currentColor"
                                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                                />
                                <path
                                    className="text-emerald-700 text-opacity-40"
                                    fill="currentColor"
                                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                                />
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="sm:text-center">
                                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                                    Ready to dive in?
                                </h2>
                                <p className="mt-6 mx-auto max-w-2xl text-lg text-white">
                                    Thank you for setting up your Baylor Bridges account.<br />
                                    We hope you enjoy the platform!
                                </p>
                            </div>
                            <button
                                type="submit"
                                onClick={onSubmit}
                                className="block w-full mt-8 rounded-md border border-transparent px-5 py-3 bg-emerald-500 text-base font-medium text-white shadow hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 sm:px-10"
                            >
                                Go to Baylor Bridges
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDone;