import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AccountContext = createContext();

const x_fields = "account_id, username, first_name, last_name, headline, prefix, photo, role, occupation, graduate_year, graduate_semester, city, state, biography, contact_info";

const Account = (props) => {
    let account_local = window.localStorage.getItem("account");
    const [account, setAccountLocal] = useState(account_local ? JSON.parse(account_local) : null);

    useEffect(() => {
        getAccount();
    }, []);

    useEffect(() => {
        if (account) {
            window.localStorage.setItem("account", JSON.stringify(account));
        } else {
            window.localStorage.removeItem("account");
        }
    }, [account]);

    const signIn = async (username, password, remember = false) => {
        return await new Promise((resolve, reject) => {
            axios.post("/accounts/signin", { username: username, password: password, remember_me: remember }, { timeout: 60000, headers: { "x-fields": x_fields } })
                .then(response => {
                    setAccountLocal(response.data);
                    resolve(response.data);
                }).catch(error => {
                    setAccountLocal(null);
                    reject(error);
                });
        });
    };

    const signInChallenge = async (name, session, response) => {
        return await new Promise((resolve, reject) => {
            axios.post("/accounts/signin/challenge", {
                session: session,
                challenge_name: name,
                challenge_response: response
            }, { headers: { "x-fields": x_fields } })
                .then(response => {
                    resolve(response.data);
                }).catch(error => reject(error));
        });
    };

    const getAccount = async () => {
        return await new Promise((resolve, reject) => {
            axios.get("/accounts/me", { headers: { "x-fields": x_fields } })
                .then(response => {
                    setAccountLocal(response.data);
                    resolve(response.data);
                }).catch(error => {
                    setAccountLocal(null);
                    reject(error);
                });
        });
    };

    const setAccount = async (account) => {
        return await new Promise((resolve, reject) => {
            axios.put("/accounts/me", account, { headers: { "x-fields": x_fields } })
                .then(response => {
                    setAccountLocal(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    setAccountLocal(null);
                    reject(error);
                });
        });
    };

    const signOut = async () => {
        return await new Promise((resolve, reject) => {
            axios.get("/accounts/me/signout").then(response => {
                if (response.status === 200) {
                    setAccountLocal(null);
                    resolve(response.data);
                } else reject(response.data);

            }).catch(error => reject(error));
        });
    };

    return (
        <AccountContext.Provider value={{ signIn, account, getAccount, setAccount, signOut, authChallenge: signInChallenge }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };