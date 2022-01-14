import React from "react";
import USAMap from "react-usa-map";
import { CheckIcon } from "@heroicons/react/outline";

const features = [
    {
        name: "Invite team members",
        description: "You can manage phone, email and chat conversations all from a single mailbox.",
    },
    { name: "List view", description: "You can manage phone, email and chat conversations all from a single mailbox." },
    {
        name: "Keyboard shortcuts",
        description: "You can manage phone, email and chat conversations all from a single mailbox.",
    },
    { name: "Calendars", description: "You can manage phone, email and chat conversations all from a single mailbox." },
    { name: "Notifications", description: "Find what you need with advanced filters, bulk actions, and quick views." },
    { name: "Boards", description: "Find what you need with advanced filters, bulk actions, and quick views." },
    { name: "Reporting", description: "Find what you need with advanced filters, bulk actions, and quick views." },
    { name: "Mobile app", description: "Find what you need with advanced filters, bulk actions, and quick views." },
];


class Home extends React.Component {
    mapHandler(event) {
        alert(event.target.dataset.name);
        // TODO: Display right panel for alumini list
    }

    getAllStates() {
        return [
            "AZ", "NY", "CT", "MD", "WA", "OR", "NV", "NM", "DC", "DE", "MA", "MN", "WI", "IL",
            "VT", "RI", "NJ", "CO", "CA", "PA", "VA", "GA", "ME", "NH", "HI", "ID", "MT", "IN",
            "TE", "AK", "KY", "NC", "WV", "WY", "ND", "SD", "NE", "UT", "TN", "KS", "OK", "TX",
            "IO", "MO", "AR", "AL", "MS", "LA", "MI", "LA", "FL", "SC", "OH", "IA",
        ];
    }

    getStatsConfig() {
        const config = {};
        const states = this.getAllStates();

        states.forEach((state) => {
            var opacity = Math.random();

            config[state] = {};
            config[state].fill = `rgba(21, 71, 52, ${opacity})`; // Cloudy: This is Baylor green!
        });

        return config;
    }

    render() {
        const statesCustomConfig = this.getStatsConfig();

        return (
            <main>
                <div>
                    {/* Hero card */}
                    <div className="relative my-6">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
                            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                                <div className="absolute inset-0">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                                        alt="People working on laptops"
                                    />
                                    <div className="absolute inset-0 bg-emerald-700 mix-blend-multiply" />
                                </div>
                                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                        <span className="block text-white">Take control of your</span>
                                        <span className="block text-emerald-200">customer support</span>
                                    </h1>
                                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-emerald-200 sm:max-w-3xl">
                                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                                        amet fugiat veniam occaecat fugiat aliqua.
                                    </p>
                                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                        <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                            <a
                                                href="/"
                                                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white hover:bg-emerald-50 sm:px-8"
                                            >
                                                Get started
                                            </a>
                                            <a
                                                href="/"
                                                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                                            >
                                                Live demo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* USA population map */}
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
                        <div className="relative flex">
                            <USAMap onClick={this.mapHandler} customize={statesCustomConfig} />
                        </div>
                    </div>


                    {/* Logo cloud */}
                    <div className="bg-gray-100">
                        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-6">
                            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                                Trusted by over 5 very average small businesses
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img className="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                                        alt="StaticKit"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                                        alt="Transistor"
                                    />
                                </div>
                                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                                        alt="Workcation"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div>
                            <h2 className="text-base font-semibold text-emerald-600 uppercase tracking-wide">Everything you need</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900">All-in-one platform</p>
                            <p className="mt-4 text-lg text-gray-500">
                                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
                            </p>
                        </div>
                        <div className="mt-12 lg:mt-0 lg:col-span-2">
                            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
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
            </main>
        );
    }
}

export default Home;