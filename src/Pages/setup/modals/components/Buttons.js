import React from "react";

import Button from "../../../../components/Button";

const Buttons = ({ modal, account, handleChangeModal }) => {
    return (
        <>
            <Button
                onClick={
                    modal === 1
                        ? () => window.location.href = "/setup/welcome-page"
                        : () => handleChangeModal("back")
                }
                className="sm:w-fit px-5 py-3 border shadow-sm text-sm bg-gray-100 font-medium rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
                Back
            </Button>
            <Button
                disabled={modal === 1 && (account.first_name === "" || account.last_name === "")}
                className="sm:w-fit px-5 py-3 text-sm"
                onClick={() => handleChangeModal("next")}
                arrow={true}
            >
                {modal === 1 && "Next"}
                {modal === 2 && (account.contact_info.email === "" && account.contact_info.phone === "" ? "Skip" : "Next")}
                {modal === 3 && (account.state === "" && account.city === "" ? "Skip" : "Next")}
                {modal === 4 && (account.graduate_year === "" && account.graduate_semester === "" ? "Skip" : "Next")}
                {modal === 5 && (account.headline === "" && account.biography === "" ? "Skip" : "Next")}
            </Button>
        </>
    );
};

export default Buttons;