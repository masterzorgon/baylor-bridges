import React, { createContext } from "react";
import axios from "axios";

const AccountContext = createContext();

const Account = (props) => {
    const signIn = async (email, password) => {
        return await new Promise((resolve, reject) => {
            axios.post("/signIn", {
                email: email,
                password: password
            }).then(response => {
                if (response.status === 200) {
                    // Store to local storage and resolve
                    window.localStorage.setItem("account", JSON.stringify(response.data));
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
                    reject(response.data);
                }
            }).catch(error => {
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
            axios.post("/signOut").then(response => {
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
        <AccountContext.Provider value={{ signIn, getAccount, getAccountLocal, signOut }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
