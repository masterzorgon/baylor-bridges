import React, { createContext } from "react";
import axios from "axios";

const AccountContext = createContext();
const x_fields = "user_id, username, first_name, last_name, headline, photo, role, occupation, graduate_year, graduate_semester, city, state, biography, contact_info";

const Account = (props) => {
    const signIn = async (username, password) => {
        return await new Promise((resolve, reject) => {
            axios.post("/accounts/signin", { username: username, password: password }, { timeout: 60000, headers: { "x-fields": x_fields } })
                .then(response => {
                    if (response.status === 200) {
                        // Store to local storage and resolve
                        window.localStorage.setItem("account", JSON.stringify(response.data));
                        resolve(response.data);
                    } else {
                        window.localStorage.removeItem("account");
                        reject(response.data);
                    }
                }).catch(error => reject(error));
        });
    };

    const signInChallenge = async (name, session, response) => {
        return await new Promise((resolve, reject) => {
            axios.post("/accounts/signin/challenge", {
                session: session,
                challenge_name: name,
                challenge_response: response
            }).then(response => {
                if (response.status === 200) resolve(response.data);
                else reject(response.data);

            }).catch(error => reject(error));
        });
    };

    const getAccount = async () => {
        return await new Promise((resolve, reject) => {
            axios.get("/accounts/me", { headers: { "x-fields": x_fields } })
                .then(response => {
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
        let account = window.localStorage.getItem("account");
        return account !== null ? JSON.parse(account) : null;
    };

    const signOut = async () => {
        return await new Promise((resolve, reject) => {
            axios.get("/accounts/me/signout").then(response => {
                if (response.status === 200) {
                    window.localStorage.removeItem("account");
                    resolve(response.data);
                } else reject(response.data);

            }).catch(error => reject(error));
        });
    };

    return (
        <AccountContext.Provider value={{ signIn: signIn, getAccount, getAccountLocal, signOut, authChallenge: signInChallenge }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };