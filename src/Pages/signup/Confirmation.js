import React from "react";

const Confirmation = ({ email }) => {
    return (
        <>
            {/* <button onClick={() => navigate("step-1")} className=" flex items-center mb-4 text-sm text-emerald-600 hover:text-green-700">
                <ArrowLeftIcon width="1em" />
                <span className="ml-2">{email}</span>
            </button> */}

            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {/* <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">Welcome!</span> */}
                <span className="block">You are half-way there!</span>
            </h2>

            <div className="mx-auto text-center">
                <lord-icon
                    src="https://cdn.lordicon.com/rhvddzym.json"
                    trigger="loop"
                    style={{ width: "8rem", height: "8rem" }}
                >
                </lord-icon>
            </div>

            <p className="mt-1 text-sm font-medium mb-4 text-gray-500">
                We have sent you an email to your email address contains a {" "}
                <span className="underline underline-offset-4 decoration-emerald-400">confirmation link</span>.
                Please check your inbox and complete the sign-up process instructed in the email.
            </p>
        </>
    );
};

export default Confirmation;