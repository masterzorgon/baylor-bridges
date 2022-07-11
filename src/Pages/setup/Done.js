import React, { useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";

import Button from "../../components/Button";

const Done = () => {
    const navigate = useNavigate();
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.6 },
                particleCount: Math.floor(750 * particleRatio),
                colors: ["#6ee7b7", "#fbd34c"]
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
            { spread: 60 });

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

    useEffect(() => {
        fire();
    }, [fire]);

    return (
        <>
            <div className="flex sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full pointer-events-none -z-10" aria-hidden="true">
                <div className="relative h-full w-full mx-auto overflow-hidden">
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

            {/* HERO SECTION */}
            <div className="z-10 min-h-screen flex flex-col justify-center ">
                <div className="bg-white max-w-2xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 -mt-8">
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                    <div className="flex-1 relative pt-16 pb-8">
                        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                                You&apos;re all set!
                            </span>
                            <span className="block">Great job.</span>
                        </h2>
                        <p className="mt-4 text-base text-gray-500">
                            Thank you so much for taking the time to set up your Baylor Bridges account.
                            We hope you enjoy our platform, and please feel to reach out via the Contact Us
                            page if you have any questions or concerns.
                        </p>
                        <div className="flex justify-between mt-6 space-x-2">
                            <Button
                                className="sm:w-fit px-5 py-4 font-medium rounded-md shadow-md cursor-pointer text-base"
                                onClick={() => navigate("/profile")}
                                arrow={true}
                            >
                                Go to Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Done;