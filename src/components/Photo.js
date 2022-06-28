import classNames from "classnames";
import React, { useContext } from "react";

import { AccountContext } from "./Account";


const adaptSize = (size) => {
    let font_size = "xs";
    let ring_size = 1;

    if (size >= 20) {
        font_size = "3xl";
        ring_size = 3;
    } else if (size >= 18) {
        font_size = "3xl";
        ring_size = 3;
    } else if (size >= 16) {
        font_size = "2xl";
        ring_size = 3;
    } else if (size >= 14) {
        font_size = "xl";
        ring_size = 3;
    } else if (size >= 12) {
        font_size = "md";
        ring_size = 2;
    } else if (size >= 10) {
        font_size = "sm";
        ring_size = 2;
    } else if (size >= 8) {
        font_size = "xs";
        ring_size = 1;
    } else if (size >= 6) {
        font_size = "xs";
        ring_size = 1;
    }

    return [font_size, ring_size];
};

const getInitials = (account) => {
    let initials = "";
    if (account && "first_name" in account && account.first_name) {
        initials += account.first_name.charAt(0);
    }

    if (account && "last_name" in account && account.last_name) {
        initials += account.last_name.charAt(0);
    }

    // If has no name for this account, take the first letter of the email
    if (initials === "" && account && "email" in account && account.email) {
        initials += account.email.charAt(0);
    }

    return initials;
};

const Photo = ({ size, account, badges }) => {
    size = size ? size : 8;

    const { getAccountLocal } = useContext(AccountContext);
    account = account !== undefined ? account : getAccountLocal();

    let [font_size, ring_size] = adaptSize(size);
    let initials = getInitials(account);
    let isAlumni = account?.role === "alumni";

    return (
        <div className={`h-${size} w-${size} relative`}>
            <div className={classNames(`abolute top-0 left-0 inline-flex items-center justify-center h-${size} w-${size} rounded-full bg-gray-500`, (badges === true && isAlumni) && `ring-${ring_size} ring-violet-600 ring-offset-2`, (badges === true && isAlumni && ring_size === 3) && "ring")}>
                <span className={`flex flex-col justify-center items-center text-${font_size} font-medium leading-none text-white uppercase`}>{initials}</span>
            </div>
            {
                (account && account.photo != null) &&
                <img
                    className={`h-${size} w-${size} rounded-full absolute top-0 left-0`}
                    src={account.photo}
                    alt=""
                />
            }
        </div>
    );
};

export default Photo;