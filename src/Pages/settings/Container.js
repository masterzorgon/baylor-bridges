import React from "react";
import Navbar from "./Navbar";
import { MessageToast } from "../../components/MessageToast";

const Container = ({ current, children }) => {

    return (
        <>
            <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                <MessageToast />
                <main className="flex-1">
                    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                        <div className="pt-10 sm:pb-8 md:pb-16">
                            <div className="px-4 sm:px-6 md:px-0">
                                <h1 className="text-3xl font-extrabold text-gray-900">
                                    Settings
                                </h1>
                            </div>
                            <div className="px-4 sm:px-6 md:px-0">
                                <div className="py-6">
                                    <Navbar current={current} />
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Container;