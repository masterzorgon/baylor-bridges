import React, { useState, useEffect, useContext } from "react";
import USAMap from "react-usa-map";
import { CheckIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import axios from "axios";

import { AccountContext } from "../components/Account";
import Photo from "../components/Photo";
import { states } from "../components/Utils";
import { HyperLink, Arrow } from "../components/Button";


// This is where the features in the landing page is configured
const features = [
    { name: "Advertise Yourself", description: "Present your personal information on your profile and how people could contact you", },
    { name: "Visibility Customization", description: "Manage who can see your contact information, customize separately for each method" },
    { name: "Alumni Exploration", description: "Explore alumni with searching functionality and by multiple filters and locations", },
    { name: "Student Engagement", description: "Interact with current students via alumni-led research, leadership, mentorship, etc" },
    // { name: "Request Connection", description: "Establish a solid connection by connecting with new found alumni" },
    // { name: "Manage Workload", description: "Customize how many connection you would like to handle in a time range" },
];

const Home = () => {
    const [mapStats, setMapStats] = useState({});
    const { getAccount, getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        setAccount(getAccountLocal());

        getAccount()
            .then(account => setAccount(account))
            .catch(error => setAccount(null));

    }, [getAccount, getAccountLocal]);

    useEffect(() => {
        axios.get("/miscellaneous/landing-map")
            .then(({ data }) => {
                setMapStats(data);
            });
    }, []);

    const getMapConfig = (stats) => {
        let config = {};
        let max = 0;

        // Find the state with the highest number of people
        for (const value of Object.values(stats)) {
            if (max < value) {
                max = value;
            }
        }

        states.forEach((state) => {
            config[state.value] = {};

            if (!(state.value in stats)) { // For the state has no people, grey out
                config[state.value].fill = "rgba(229, 231, 235, 0.7)";
            } else {
                let value = stats[state.value];
                let opacity = value / max;

                config[state.value].fill = `rgba(5, 150, 105, ${opacity})`;
            }
        });

        return config;
    };


    return (
        <>
            <main>
                <div className="home">
                    {/* Hero section */}
                    <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-24" id="top">
                        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
                            <div>
                                <div>
                                    <img
                                        className="h-20 w-auto"
                                        src="/Baylor-University-Athletics-01.svg"
                                        alt="Baylor University icon"
                                    />
                                </div>
                                <div className="mt-20">
                                    <div className="mt-8 sm:max-w-lg">
                                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                            Connect with your <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">fellow Bears</span> today
                                        </h1>
                                        <p className="mt-6 text-lg text-gray-500">
                                            A brand new web platform for Baylor alumni and current students to
                                            connect and explore the vast and endless possibilities
                                            of the Baylor Brdges network.
                                        </p>
                                    </div>
                                    <div className="h-28 sm:max-w-lg mt-12 lg:max-w-lg">
                                        {
                                            account ?
                                                <>
                                                    {/* You're signed in as: */}
                                                    <p className="sr-only">You are signed in as</p>
                                                    <Link to="/profile" className="flex-shrink-0 flex grow bg-gray-100 rounded-lg px-6 py-6 space-x-2.5 hover:bg-gray-200">
                                                        <Photo size="11" badges={true} />
                                                        <div className="">
                                                            <div className="text-base font-semibold text-gray-800">{account.first_name} {account.last_name}</div>
                                                            <div className="text-sm font-medium text-gray-500">{account.username}</div>
                                                        </div>
                                                        <div className="grow"></div>
                                                        <p className="text-gray-400 uppercase text-sm font-medium m-auto hidden sm:block text-center">Signed In</p>
                                                    </Link>
                                                </>
                                                :
                                                <>
                                                    <div className="sm:w-full sm:flex">
                                                        <a
                                                            className="primary-btn font-semibold text-center w-full flex justify-center px-4 py-5 text-lg rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 shadow-sm"
                                                            href="/sign-up"
                                                        >
                                                            Join the Community
                                                        </a>
                                                    </div>
                                                    <div className="mt-8 sm:mt-4 flex space-x-1 justify-center">
                                                        <div className="text-center">
                                                            <span className="block sm:inline text-gray-700">Already have an account?</span>{" "}
                                                            <HyperLink href="/sign-in" arrow={true} className="text-base font-medium text-emerald-600 hover:text-emerald-800 after:bg-emerald-600 after:hover:bg-emerald-800">Continue</HyperLink>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                            <div className="mt-10 py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                                <div className="hidden sm:block">
                                    <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                                    <svg
                                        className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                                        width={404}
                                        height={392}
                                        fill="none"
                                        viewBox="0 0 404 392"
                                    >
                                        <defs>
                                            <pattern
                                                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                                                x={0}
                                                y={0}
                                                width={20}
                                                height={20}
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                            </pattern>
                                        </defs>
                                        <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                                    </svg>
                                </div>
                                <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                                    {/* FIXME: Replace with a better screenshot */}
                                    <img
                                        className="w-auto rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                                        src="https://user-images.githubusercontent.com/20573623/160237546-65a00452-bfbf-4184-96e2-aa0cc7991233.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* USA population map */}
                    {/* TODO: Center map and show population, and text below */}
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-6 my-6 grid-cols-3 gap-2 hidden lg:grid">
                        <div className="relative flex col-span-2 pointer-events-none">
                            <USAMap title="" customize={getMapConfig(mapStats)} />
                        </div>
                        <div className="col-span-1 relative">
                            <div className="absolute bottom-0 mb-16">
                                <h2 className="text-base font-semibold text-emerald-600 uppercase tracking-wide">Alumni Heat Map</h2>
                                <p className="mt-2 text-3xl font-extrabold text-gray-900">Alumni Connection Platform</p>
                                <p className="mt-4 text-lg text-gray-500">
                                    Join the network, explore and connect with all the other Baylor people from different locations around the states.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Logo cloud */}
                    {/* TODO: Add logos for baylor prehealth student orginization, ABB, and baylor prehealth office */}
                    <div className="bg-gray-50 mt-6">
                        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-6">
                            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                                Proudly supported By
                            </p>
                            {/* TODO: add logo*/}

                            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-9 md:h-14 w-auto"
                                        src="/Baylor-Prehealth.png"
                                        alt="Mirage" />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-9 md:h-14 w-auto"
                                        src="/Baylor-CS.png"
                                        alt="Tuple" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Features */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">Everything you need</h2>
                            <p className="mt-4 text-lg text-gray-500">
                                Providing a platform for current students and alumni to discover new connections and foster deeper relationship with one another.
                            </p>
                        </div>
                        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <CheckIcon className="absolute h-6 w-6 text-emerald-500" aria-hidden="true" />
                                        <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">Ready to dive in?</span>
                            <span className="block">Create your account today.</span>
                        </h2>
                        <div className="mt-4 flex justify-center">
                            <Link
                                to="/sign-up"
                                className="btn font-sm rounded-full text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 w-16 h-16 flex justify-center flex-col items-center cursor-pointer"
                            >
                                <Arrow size={28} />
                            </Link>
                        </div>
                    </div>
                </div>



            </main>

        </>
    );
};

export default Home;