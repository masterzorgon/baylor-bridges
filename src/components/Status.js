import React, {useState, useContext, useEffect} from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);

    const { getSession, logout } = useContext(AccountContext)

    useEffect(() => {
        getSession().then(session => {
            console.log("Session: ", session);
            setStatus(true);
        });
    });

    return <div>{status ? (<button className="button is-block is-primary " onClick={logout}>Logout</button>) : "Please Login (refresh for updated status)"}</div>;
};

export default Status;