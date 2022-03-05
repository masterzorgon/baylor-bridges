import React from "react";
import SettingsNavbar from "../../components/SettingsNavbar";

const Account = () => {
    return (
        <div>
            {/* Content area */}
            <div className="">
                <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                    <main className="flex-1">
                        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                            <div className="pt-10 pb-16">
                                <div className="px-4 sm:px-6 md:px-0">
                                    <h1 className="text-3xl font-extrabold text-gray-900">
                                        Settings
                                    </h1>
                                </div>
                                <div className="px-4 sm:px-6 md:px-0">
                                    <div className="py-6">
                                        <SettingsNavbar current="account" />
                                    </div>
                                    {/* 

                                        [*][*][*][*][*][*][*][*][*][*]
                                        [*][*] CONTENT GOES HERE [*[*]
                                        [*][*][*][*][*][*][*][*][*][*]
                                    */}
                                    
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Account;