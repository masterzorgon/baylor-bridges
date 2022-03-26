import React, { useState, useEffect, useContext } from "react";
import USAMap from "react-usa-map";
import { CheckIcon } from "@heroicons/react/outline";

import { AccountContext } from "../components/Account";

import axios from "axios";


// import { XIcon } from "@heroicons/react/solid";

// This is where the features in the landing page is configured
const features = [
    { name: "Advertise Yourself", description: "You can manage your personal contact info and add personalized experience to your profile.", },
    { name: "Info Security Customization", description: "You can manage which of your phone numbers, email addresses, or biogrgaphy you would like to show to the public." },
    { name: "Alumni Exploration", description: "You can find New Connections with our fascinating search page detailed filters and US map user interface.", },
    { name: "Student Engagement", description: "You can interact with current Baylor Prehealth students through student and alumni-led projects regarding research, leadership, mentorship, and more." },
    // { name: "Coming Soon - Become Friends", description: "Establish a solid connection by becoming friends with your new found Alumni" },
    // { name: "Coming Soon - Manage Workload", description: "Manage friend request you would like to recieve every week" },
];

const Home = () => {
    // const getAllStates = () => {
    //     return [
    //         "AZ", "NY", "CT", "MD", "WA", "OR", "NV", "NM", "DC", "DE", "MA", "MN", "WI", "IL",
    //         "VT", "RI", "NJ", "CO", "CA", "PA", "VA", "GA", "ME", "NH", "HI", "ID", "MT", "IN",
    //         "TE", "AK", "KY", "NC", "WV", "WY", "ND", "SD", "NE", "UT", "TN", "KS", "OK", "TX",
    //         "IO", "MO", "AR", "AL", "MS", "LA", "MI", "LA", "FL", "SC", "OH", "IA",
    //     ];
    // };

    const [statesCustomConfig, setStateCustomConfig] = useState({});
    const { getAccount, getAccountLocal } = useContext(AccountContext);
    const [account, setAccount] = useState(null);


    useEffect(() => {
        setAccount(getAccountLocal());

        getAccount()
            .then(account => setAccount(account))
            .catch(error => setAccount(null));

    }, [getAccount, getAccountLocal]);

    useEffect(() => {
        axios.get("/landing/map_stats")
            .then(res => {
                let config = {};
                let max = 0;

                // Find the state with the highest number of people
                for (const value of Object.values(res.data)) {
                    if (max < value) {
                        max = value;
                    }
                }

                // Make config dictionary
                for (const [key, value] of Object.entries(res.data)) {
                    let opacity = value / max * 0.95;

                    config[key] = {};
                    config[key].fill = `rgba(21, 71, 52, ${opacity})`;
                }

                setStateCustomConfig(config);
            });
    }, [setStateCustomConfig]);


    return (
        <>
            <main>
                <div>
                    {/* Hero section */}
                    <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-28">
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
                                    {/* <div>
                                        <a href="#" className="inline-flex space-x-4">
                                            <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 tracking-wide uppercase">
                                                What&apos;s new
                                            </span>
                                            <span className="inline-flex items-center text-sm font-medium text-emerald-600 space-x-1">
                                                <span>Just shipped version 0.1.0</span>
                                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </a>
                                    </div> */}
                                    <div className="mt-6 sm:max-w-lg">
                                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                            Connect with your fellow Bears today
                                        </h1>
                                        <p className="mt-6 text-xl text-gray-500">
                                            A brand new platform for Baylor alumni and current students to
                                            connect and explore the vast and endless possibilities
                                            of Baylor alumni in the health industry.
                                        </p>
                                    </div>
                                    <div action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                                        <a
                                            className="transition-all text-center w-full flex justify-center px-4 py-5 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed relative"
                                            href="/sign-up"
                                        >
                                            Sign Up to Join the Community
                                        </a>
                                    </div>
                                    <div className="sm:max-w-lg mt-6 flex space-x-1 justify-center">
                                        <p>Already have an account?</p>
                                        <a href="/sign-in" className="transition-all text-base font-medium text-emerald-600 hover:text-emerald-800 underline underline-offset-2">Continue with Sign In</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
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
                        <div className="relative flex col-span-2">
                            <USAMap title="" customize={statesCustomConfig} />
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
                    <div className="bg-gray-100 mt-6">
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
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div>
                            <h2 className="text-base font-semibold text-emerald-600 uppercase tracking-wide">Everything you need</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900">Alumni Connection Platform</p>
                            <p className="mt-4 text-lg text-gray-500">
                                Providing a platform for current students and alumni to discover new connections and foster deeper relationship with one another.
                            </p>
                        </div>
                        <div className="mt-12 lg:mt-0 lg:col-span-2">
                            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative">
                                        <dt>
                                            <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                                            <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                        </dt>
                                        <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">Ready to dive in?</span>
                            {account ? null : <span className="block">Create you personal account today.</span>}
                        </h2>
                        <div className="mt-8 flex justify-center">
                            {
                                account === null
                                    ?
                                    <>
                                        <div className="inline-flex rounded-md shadow">
                                            <a
                                                href="/sign-up"
                                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                                            >
                                                Sign Up
                                            </a>
                                        </div>
                                        <div className="ml-3 inline-flex">
                                            <a
                                                href="https://www.baylor.edu/prehealth/index.php?id=981654"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                                            >
                                                Learn more
                                            </a>
                                        </div>
                                    </>
                                    :
                                    <div className="ml-3 inline-flex">
                                        <a
                                            href="https://www.baylor.edu/prehealth/index.php?id=981654"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                                        >
                                            Learn more
                                        </a>
                                    </div>
                            }
                        </div>
                    </div>
                </div>

                

            </main>
            
        </>
    );
};

export default Home;