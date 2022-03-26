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
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
                                <span className="block">Ready to dive in?</span>
                                <span className="block">Start your free trial today.</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-emerald-700">
                                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla
                                nec.
                            </p>
                            <button
                                onClick={onSubmit}
                                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                                Sign up for free
                            </button>
                        </div>
                    </div>
                    <div className="-mt-6 bg-blue-500 w-50 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <img
                            className="transform w-13 translate-x-3 translate-y-3 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                            src="/new_baylor_logo.jpeg"
                            alt="App screenshot"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDone;