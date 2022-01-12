import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

const NavbarAccount = () => {
    const [status, setStatus] = useState(false);

    const { getSession, logout } = useContext(AccountContext)

    useEffect(() => {
        getSession().then(session => {
            console.log("Session: ", session);
            setStatus(true);
        });
    });

    var unauthenticated =
        <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                    <a className="button is-light" href="/sign-in">Sign in</a>
                    <a className="button is-primary" href="/sign-up">Sign up</a>
                </div>
            </div>
        </div>;


    var authenticated =
        <div className="navbar-end">
            <div className="navbar-item">
                <a className="navbar-item" href="/">Hi, User</a>
                <div className="buttons">
                    <a className="navbar-item button is-light" href="/" onClick={logout}>Logout</a>
                </div>
            </div>
        </div>;


    return <div>{status ? authenticated : unauthenticated}</div>

};

export default NavbarAccount;