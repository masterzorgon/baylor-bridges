import React from "react";

import Button from "../../../../components/Button";

const Buttons = ({ required, loading, modal, account, handleChangeModal, onSubmit }) => {
    return (
        <>
            <Button
                onClick={
                    modal === 1
                        ? () => window.location.href = "/setup/welcome-page"
                        : async () => handleChangeModal("back")
                }
                className="sm:w-fit px-5 py-3 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
                Back
            </Button>
            <Button
                disabled={(modal === 1 && (account.first_name === "" || account.last_name === "")) || loading}
                loading={loading}
                className="sm:w-fit px-5 py-3 text-sm"
                onClick={modal === 6 ? () => onSubmit() : async () => handleChangeModal("next")}
                arrow={true}
            >
                {required ? "Next" : "Skip"}
            </Button>
        </>
    );
};

export default Buttons;
