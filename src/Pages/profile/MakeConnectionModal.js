import React from "react";
import { Transition } from "@headlessui/react";

const MakeConnecitonModal = ({
    makeConnection,
    connectionMsg,

    setMakeConnection,
    setConnectionPending,
    setConnectionMsg
}) => {
    // const [loading, setLoading] = useState(false);

    const submitMsg = () => {
        setMakeConnection(false);
        setConnectionPending(true);
        setConnectionMsg("MESSAGE SENT");
    };

    return (
        <Transition.Root show={makeConnection} as={React.Fragment}>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="w-full inline-block bg-white rounded-lg p-4 text-left shadow transform sm:my-8 align-middle sm:max-w-lg sm:w-full sm:p-6 space-y-4">
                            <div>
                                {/* <div className="flex justify-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/zpxybbhl.json"
                                        trigger="loop"
                                        style={{ width: "8rem", height: "8rem" }}
                                    >
                                    </lord-icon>
                                </div> */}
                                <div className="mt-3 text-center sm:mt-5">
                                    <div as="h2" className="text-lg leading-6 font-medium text-gray-900">
                                        Make a connection
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Be a part of the community, start expanding your network with everyone else.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-1 space-y-3">
                                {/* Sign up link */}
                                {/* <a
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:col-start-2 sm:text-sm"
                                    href={signUpUrl}
                                >
                                    Sign up to continue
                                </a> */}
                                {/* Sign in link, TODO: to be visible in future -Cloudy */}
                                {/* <div className="text-sm space-x-1 flex items-center justify-center">
                                    <p className="text-gray-600">Already have an account?</p>
                                    <Link to={signInUrl} className="text-emerald-800">Sign in</Link>
                                </div> */}
                                <button
                                    onClick={() => setMakeConnection(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitMsg}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition.Root>
    );
};

export default MakeConnecitonModal;
