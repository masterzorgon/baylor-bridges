import React from "react";
import SettingsNavbar from "../../components/SettingsNavbar";
const Experience=()=>{
    return(
        <>
            <div>
                {/* Content area */}
                <div className="">
                    <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                        <main className="flex-1">
                            <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                                <div className="pt-10 pb-16">
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                                    </div>
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <div className="py-6">
                                            
                                            <SettingsNavbar current="experience" />
                                            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                                                <section aria-labelledby="payment-details-heading">
                                                    <form action="#" method="POST">
                                                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                                                            <div className="bg-white py-6 px-4 sm:p-6">
                                                                <div>
                                                                    <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                          Payment details
                                                                    </h2>
                                                                    <p className="mt-1 text-sm text-gray-500">
                          Update your billing information. Please note that updating your location could affect your tax
                          rates.
                                                                    </p>
                                                                </div>

                                                                <div className="mt-6 grid grid-cols-4 gap-6">
                                                                   

                                                                    <div className="col-span-4 sm:col-span-2">
                                                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                                            Title
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            name="email-address"
                                                                            id="email-address"
                                                                            autoComplete="email"
                                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                                        />
                                                                    </div>

                                                                    <div className="col-span-4 sm:col-span-1">
                                                                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                            Start Date
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            name="expiration-date"
                                                                            id="expiration-date"
                                                                            autoComplete="cc-exp"
                                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                                            placeholder="MM / YY"
                                                                        />
                                                                    </div>
                                                                    <div className="col-span-4 sm:col-span-1">
                                                                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                            End date
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            name="expiration-date"
                                                                            id="expiration-date"
                                                                            autoComplete="cc-exp"
                                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                                            placeholder="MM / YY"
                                                                        />
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <div className="bg-white py-6 px-4 sm:p-6">
                                                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                                Add your comment
                                                                </label>
                                                                <div className="mt-1">
                                                                    <textarea
                                                                        rows={4}
                                                                        name="comment"
                                                                        id="comment"
                                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                        defaultValue={""}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                                <button
                                                                    type="submit"
                                                                    className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>    
    );


};
export default Experience;