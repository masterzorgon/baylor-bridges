import React from "react";

const Confirmation = ({ email }) => {
    return (
        <div className="md:mx-10 my-8">
            <h2 className="mt-6 font-serif text-xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {/* <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">Welcome!</span> */}
                <span className="block">You are almost there!</span>
            </h2>
            <p className="mt-5 mx-auto text-gray-700">
                We have sent the <span className="underline underline-offset-4 decoration-emerald-400">verification link</span> to your email {email},
                please check your inboxes and complete the sign-up process!
                we are glad to have you joining our Baylor Bridges Family
            </p>
        </div>
    );
};

export default Confirmation;