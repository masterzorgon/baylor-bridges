import React, { createContext } from "react";
import axios from "axios";

const AccountContext = createContext();

const Account = (props) => {
    const signIn = async (email, password) => {
        return await new Promise((resolve, reject) => {
            axios.post("/signin", {
                email: email,
                password: password
            }).then(response => {
                if (response.status === 200) {
                    // Store to local storage and resolve
                    window.localStorage.setItem("account", JSON.stringify(response.data));
                    resolve(response.data);
                } else {
                    window.localStorage.removeItem("account");
                    reject(response.data);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    const signInChallenge = async (name, session, response) => {
        return await new Promise((resolve, reject) => {
            axios.post("/signin/challenge", {
                session: session,
                challenge_name: name,
                challenge_response: response
            }).then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    const getAccount = async () => {
        return await new Promise((resolve, reject) => {
            axios.get("/account").then(response => {
                if (response.status === 200) {
                    // Store to local storage and resolve
                    window.localStorage.setItem("account", JSON.stringify(response.data));
                    resolve(response.data);
                } else {
                    window.localStorage.removeItem("account");
                    reject(response.data);
                }
            }).catch(error => {
                window.localStorage.removeItem("account");
                reject(error);
            });
        });
    };

    const getAccountLocal = () => {
        var account = window.localStorage.getItem("account");
        return account !== null ? JSON.parse(account) : null;
    };

    const signOut = async () => {
        return await new Promise((resolve, reject) => {
            axios.post("/signout").then(response => {
                if (response.status === 200) {
                    window.localStorage.removeItem("account");
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    return (
        <AccountContext.Provider value={{ signIn: signIn, getAccount, getAccountLocal, signOut, authChallenge: signInChallenge }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
