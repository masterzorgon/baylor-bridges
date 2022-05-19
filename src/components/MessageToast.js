import React from "react";
import { XCircleIcon } from "@heroicons/react/solid";


const MessageToast = ({ header, message, status, onClose }) => {

    const styles = {
        bgOk: "rounded-md bg-green-50 p-4",
        bgError: "rounded-md bg-red-50 p-4",
        iconOk: "h-5 w-5 text-green-400",
        iconError: "h-5 w-5 text-red-400",
        headerOk: "text-sm font-medium text-green-800",
        headerError: "text-sm font-medium text-red-800",
        textOk: "mt-2 text-sm text-green-700",
        textError: "mt-2 text-sm text-red-700",
    };

    return (
        <div className={status ? styles.bgOk : styles.bgError}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className={status ? styles.iconOk : styles.iconError} aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className={status ? styles.headerOk : styles.headerError}>
                        {header}
                    </h3>
                    <div className={status ? styles.textOk : styles.textError}>
                        <div role="list" className="list-disc pl-5 space-y-1">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageToast;