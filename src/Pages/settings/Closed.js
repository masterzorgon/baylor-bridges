import React from "react";
import { CubeTransparentIcon } from "@heroicons/react/outline";

import Navbar from "./Navbar";

const Closed = () => {
    return (
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
                                    <Navbar current="experience" />

                                    <div className="text-center mt-10">
                                        <CubeTransparentIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-md font-medium text-gray-900">We are working on it!</h3>
                                        <p className="mt-2 text-sm text-gray-500">We are sorry that this page is still under construction, </p>
                                        <p className="mt-0 text-sm text-gray-500">but will be here soon!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Closed;