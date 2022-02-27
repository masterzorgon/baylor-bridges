import React, { useContext } from "react";

import { AccountContext } from "./Account";

const Photo = ({size, account}) => {
    size = size ? size : 8;
    var font_size = "xs";

    const { getAccountLocal } = useContext(AccountContext);
    account = account ? account : getAccountLocal();

    if (size >= 14) {
        font_size = "xl";
    } else if (size >= 12) {
        font_size = "lg";
    } else if (size >= 10) {
        font_size = "sm";
    } else if (size >= 8) {
        font_size = "xs";
    } else if (size >= 6) {
        font_size = "xs";
    }

    if (!account.photo) {
        let initials = "";
        if (account.first_name) {
            initials += account.first_name.charAt(0);
        }

        if (account.last_name) {
            initials += account.last_name.charAt(0);   
        }

        // If has no name for this account, take the first letter of the email
        if (initials === "" && account.email) {
            initials += account.email.charAt(0);
        }

        return <div className={`inline-flex items-center justify-center h-${size} w-${size} rounded-full bg-gray-500`}>
            <span className={`text-${font_size} font-medium leading-none text-white capitalize`}>{initials}</span>
        </div>;
    } else {
        return <img
            className={`h-${size} w-${size} rounded-full`}
            src={account.photo}
            alt=""
        />;
    }
};

export default Photo;