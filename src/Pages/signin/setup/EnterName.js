import React from "react";
// import axios from "axios";

const AllDone = () => {

    // const [profile, setprofile] = useState({
    //     biography: "",
    //     city: "",
    //     email: "",
    //     first_name: "",
    //     graduate_semester: "",
    //     graduate_year: null,
    //     headline: "",
    //     last_name: "",
    //     state: "TN",
    // });

    const onSubmit = (event) => {
        console.log("CLICKED");

        // IMPLEMENT AXIOS PUT REQUEST FOR NAME INPUT
        
    };

    return (
        <div className="relative bg-white">
            <div className="lg:absolute lg:inset-0">
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        
                        className="h-56 w-full object-cover lg:absolute lg:h-full"
                        // panorama
                        src="https://static.wixstatic.com/media/deb6cf_bfb248d824ccae8bde09b64f3a6e202f.jpg/v1/fill/w_1110,h_870,al_c,q_85,usm_0.66_1.00_0.01/deb6cf_bfb248d824ccae8bde09b64f3a6e202f.webp"
                        alt=""
                    /> 
                </div>
            </div>
            <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-32 lg:grid lg:grid-cols-2">
                <div className="lg:pr-8">
                    <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Provide your profile information
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                            Please make sure the information you provide is valid and verifiable
                            so that those who contact you through your profile may reach you appropriately.
                        </p>
                        <form action="#" method="POST" className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        placeholder="John"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        placeholder="Joe"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Headline
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Your work title"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="grad" className="block text-sm font-medium text-gray-700">
                                    Graduate Class
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="grad"
                                        id="grad"
                                        placeholder="Class of x-x-x-x"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                    State
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="TX"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="flex justify-between">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <span id="phone-description" className="text-sm text-gray-500">
                                        Optional
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="tel"
                                        aria-describedby="phone-description"
                                        placeholder="+1 (234) 567-8910"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="flex justify-between">
                                    <label htmlFor="how-can-we-help" className="block text-sm font-medium text-gray-700">
                                        Biography
                                    </label>
                                    <span id="how-can-we-help-description" className="text-sm text-gray-500">
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <textarea
                                        id="how-can-we-help"
                                        name="how-can-we-help"
                                        aria-describedby="how-can-we-help-description"
                                        placeholder="A brief summary of who you are and what you do"
                                        rows={4}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 border border-gray-300 rounded-md"
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <button
                                    onClick={onSubmit}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
    
export default AllDone;

// <div className="bg-white py-16 sm:py-24">
//     <div className="relative sm:py-16">
//         <div aria-hidden="true" className="hidden sm:block">
//             <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
//             <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
//                 <defs>
//                     <pattern
//                         id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
//                         x={0}
//                         y={0}
//                         width={20}
//                         height={20}
//                         patternUnits="userSpaceOnUse"
//                     >
//                         <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
//                     </pattern>
//                 </defs>
//                 <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
//             </svg>
//         </div>
//         <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
//             <div className="relative rounded-2xl px-6 py-10 bg-emerald-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
//                 <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
//                     <svg
//                         className="absolute inset-0 h-full w-full"
//                         preserveAspectRatio="xMidYMid slice"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 1463 360"
//                     >
//                         <path
//                             className="text-emerald-500 text-opacity-40"
//                             fill="currentColor"
//                             d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
//                         />
//                         <path
//                             className="text-emerald-700 text-opacity-40"
//                             fill="currentColor"
//                             d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
//                         />
//                     </svg>
//                 </div>
//                 <div className="relative">
//                     <div className="sm:text-center">
//                         <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
//                             Let&apos;s start with your name.
//                         </h2>
//                         <p className="mt-6 mx-auto max-w-2xl text-lg text-emerald-200">
//                             Please provide your full, legal name. This is the name others
//                             will know you by on your Baylor Bridges account.
//                         </p>
//                     </div>
//                     <button
//                         type="submit"
//                         onClick={onSubmit}
//                         className="block w-full rounded-md border border-transparent px-5 py-3 bg-emerald-500 text-base font-medium text-white shadow hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 sm:px-10"
//                     >
//                         Finish
//                     </button>
//                     <div className="m-0 text-sm text-center w-full grid place-items-center">
//                         <a href="/sign-in/setup/profile-setup" className="font-medium text-white hover:text-gray-200 flex items-center mt-5 space-x-0.5">
//                             <ArrowSmLeftIcon className="h-4 w-4" />
//                             <span>Go back</span>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>