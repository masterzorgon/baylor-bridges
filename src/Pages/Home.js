import React, { useState, useEffect } from "react";
import USAMap from "react-usa-map";
import { CheckIcon } from "@heroicons/react/outline";
import axios from "axios";

// This is where the features in the landing page is configured
const features = [
    { name: "Advertise Yourself", description: "You can manage your personal contact info and add personalized experience to your profile.",},
    { name: "Info Security Customization", description: "You can manage which of your phone numbers, email addresses, or biogrgaphy you would like to show to the public." },
    { name: "Alumni Exploration", description: "You can find New Connections with our fascinating search page detailed filters and US map user interface.",},
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

    useEffect(() => {
        axios.get("/landing/map_stats")
            .then(res => {
                let config = {};
                let max = 0;

                // Find the state with the highest number of people
                for (const value of Object.values(res.data)) {
                    if(max < value) {
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
        <main>
            <div>
                {/* Hero card */}
                {/* FIXME: Hero card seems not fitting */}
                <div className="relative sm:my-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
                        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                            <div className="absolute inset-0">
                                <img
                                    className="h-full w-full object-cover"
                                    src="landing_page_background.jfif"
                                    alt="People working on laptops"
                                />
                                <div className="absolute inset-0 bg-emerald-700 mix-blend-multiply" />
                            </div>
                            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                    <span className="block text-white">Connect with Baylor People</span>
                                    <span className="block text-emerald-200">and build your network</span>
                                </h1>
                                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-emerald-200 sm:max-w-3xl">
                                    A brand new platform for Baylor alumni and students to connect and explore the vast and endless possibilities
                                    of Baylor alumni in the health industry.
                                </p>
                                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                                        <a
                                            href="/sign-up"
                                            className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white hover:bg-emerald-50 sm:px-9"
                                        >
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100 -z-10 lg:hidden"></div>
                </div>


                {/* USA population map */}
                {/* TODO: Center map and show population, and text below */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-6 my-6 grid-cols-3 gap-2 hidden lg:grid">
                    <div className="relative flex col-span-2">
                        <USAMap customize={statesCustomConfig} />
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
                <div className="bg-gray-100 -mt-6 lg:mt-0">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-6">
                        <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                                Supported By
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
                        <span className="block">Create you personal account today.</span>
                    </h2>
                    <div className="mt-8 flex justify-center">
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
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;