import React from "react";
// import USAMap from "react-usa-map";
import {
    ArrowCircleDownIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon,
    CubeTransparentIcon
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
// import axios from "axios";

// import { AccountContext } from "../components/Account";
// import Photo from "../components/Photo";
// import { States } from "../components/Utils";
import { HyperLink, Arrow } from "../components/Button";


// This is where the features in the landing page is configured
const features = [
    {
        name: "Data Ownership.",
        description: "With our non-custodial solution, you are the sole owners of your data.",
        icon: LockClosedIcon,
    },
    {
        name: "Simple queues.",
        description: "Query your entire transaction history with a few simple queues.",
        icon: ArrowCircleDownIcon,
    },
    {
        name: "Advanced security.",
        description: "Sensitive information is secured using multiple encryption layers; only you can see your data.",
        icon: FingerPrintIcon,
    },
    {
        name: "Ultimate availability.",
        description: "Your invoicing information is secured on an immutable blockchain for all your compliance needs.",
        icon: ServerIcon,
    },
    {
        name: "Enterprise Scalability.",
        description: "An invoicing solution that will scale with you, for a fraction of the cost.",
        icon: CubeTransparentIcon,
    },
];

const Home = () => {
    // const [mapStats, setMapStats] = useState({});
    // const { account } = useContext(AccountContext);

    // useEffect(() => {
    //     axios.get("/miscellaneous/landing-map")
    //         .then(({ data }) => {
    //             setMapStats(data);
    //         });
    // }, []);

    // const getMapConfig = (stats) => {
    //     let config = {};
    //     let max = 0;

    //     // Find the state with the highest number of people
    //     for (const value of Object.values(stats)) {
    //         if (max < value) {
    //             max = value;
    //         }
    //     }

    //     States.forEach((state) => {
    //         config[state.value] = {};

    //         if (!(state.value in stats)) { // For the state has no people, grey out
    //             config[state.value].fill = "rgba(229, 231, 235, 0.7)";
    //         } else {
    //             let value = stats[state.value];
    //             let opacity = value / max;

    //             config[state.value].fill = `rgba(5, 150, 105, ${opacity})`;
    //         }
    //     });

    //     return config;
    // };

    return (
        <>
            <main>
                <div className="home">
                    {/* Hero section */}
                    <div className="overflow-hidden sm:pt-12 lg:relative lg:py-24" id="top">
                        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">

                            <svg
                                className="absolute inset-0 -z-10 h-full w-full stroke-gray-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                                        width={200}
                                        height={200}
                                        x="50%"
                                        y={-1}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M.5 200V.5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
                            </svg>
                            <div
                                className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                                aria-hidden="true"
                            >
                                <div
                                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#ff80db] to-[#e54698] opacity-30"
                                    style={{
                                        clipPath:
                                            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                                    }}
                                />
                            </div>
                            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                                    <img
                                        className="h-14"
                                        src="/vlyss-type-pink.png"
                                        alt="Vlyss"
                                    />
                                    <div className="mt-24 sm:mt-32 lg:mt-16">
                                        <div className="inline-flex space-x-6">
                                            <div className="flex items-center justify-center">
                                                <span className="rounded-full px-3 py-1 text-sm font-semibold leading-6 text-[#ff72f9] ring-1 ring-inset ring-[#ff72f9]">
                                                    Learn more
                                                </span>
                                                <HyperLink href="#" arrow={true} className="space-x-2 text-sm font-medium leading-6 ml-3">
                                                    Read Whitepaper
                                                </HyperLink>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
                                        Your invoicing. <br />
                                        More {" "}
                                        <span className="text-transparent bg-gradient-to-r from-pink-400 via-[#ff80db] to-rose-300 inline-block bg-clip-text">
                                            transparent
                                        </span>
                                        .
                                    </h1>
                                    <p className="mt-6 text-lg leading-8">
                                        No more second-guessing the authenticity of your B2B transactions.
                                        Enhance the confidentiality, integrity, and availability of your invoicing with Vlyss.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <a
                                            href="#"
                                            className="ring-2 ring-[#ff72f9] rounded-md bg-[#ff72f9] text-white hover:bg-white hover:text-[#ff72f9] px-3 py-2 text-sm font-semibold shadow-sm"
                                        >
                                            Early Registration
                                        </a>
                                        <HyperLink arrow={true} href="#" className="text-sm font-semibold leading-6">
                                            Watch Demo
                                        </HyperLink>
                                    </div>
                                </div>
                                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                        <img
                                            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                                            alt="App screenshot"
                                            width={2432}
                                            height={1442}
                                            className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* USA population map */}
                    {/* TODO: Center map and show population, and text below */}
                    {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-6 my-6 grid-cols-3 gap-2 hidden lg:grid">
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
                    </div> */}


                    {/* Logo cloud */}
                    {/* TODO: Add logos for baylor prehealth student orginization, ABB, and baylor prehealth office */}
                    <div className="bg-gray-50 mt-6">
                        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-6">
                            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                                Proudly supported By
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-8">
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-8 md:h-10 w-auto"
                                        src="/solana-foundation.png"
                                        alt="Mirage" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Features */}
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="text-base font-semibold leading-7 text-[#ff72f9]">Everything you need</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">To manage your invoicing.</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Vlyss is enhancing the security and traceability of your B2B transaction histories
                                at a fraction of the cost compared to other invoicing solutions.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <feature.icon className="absolute left-1 top-1 h-5 w-5 text-[#ff72f9]" aria-hidden="true" />
                                        {feature.name}
                                    </dt>{" "}
                                    <dd className="inline">{feature.description}</dd>
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
                            <span className="block">Register today.</span>
                        </h2>
                        <div className="mt-4 flex justify-center">
                            <Link
                                to="/sign-up"
                                className="btn font-sm rounded-full text-white bg-gradient-to-r from-pink-300 via-[#ff80db] to-rose-300 w-16 h-16 flex justify-center flex-col items-center cursor-pointer"
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