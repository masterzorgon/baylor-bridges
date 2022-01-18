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
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    const signOut = async () => {
        return await new Promise((resolve, reject) => {
            axios.post("/signOut").then(response => {
                if (response.status === 200) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }).catch(err => {
                reject(false);
            });
        });
    };

    return (
        <AccountContext.Provider value={{ signIn, getAccount, signOut }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
