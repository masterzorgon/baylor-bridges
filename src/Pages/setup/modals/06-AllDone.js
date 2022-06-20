import React, { useState, useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { animated } from "react-spring";
import axios from "axios";
import { toast } from "react-toastify";

import Button from "../../../components/Button";

const AllDone = ({ account, transition }) => {

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

    const [loading, setLoading] = useState(false);

    const x_fields = "user_id, first_name, last_name, headline, role, occupation, graduate_year, graduate_semester, city, state, biography, contact_info";

    const onSubmit = () => {
        setLoading(true);

        // Replace null with empty string in account object
        const accountCopy = { ...account };

        Object.keys(accountCopy).forEach(key => {
            if (accountCopy[key] === null) {
                accountCopy[key] = "";
            }
        });

        // input form content to current account
        axios.put("/accounts/me", accountCopy, { headers: { "x-fields": x_fields } })
            .then(res => {
                fire();
                setTimeout(() => window.location.href = "/", 1500);
            })
            .catch(err => toast.error(err.response.data.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
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
        </>
    );
};

export default AllDone;