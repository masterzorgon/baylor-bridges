import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AccountContext = createContext();
const x_fields = "user_id, username, first_name, last_name, headline, role, occupation, graduate_year, graduate_semester, city, state, biography, contact_info";

const Account = (props) => {
    let account_local = window.localStorage.getItem("account");
    const [account, setAccount] = useState(account_local ? JSON.parse(account_local) : null);

    useEffect(() => {
        axios.get("/accounts/me", { headers: { "x-fields": x_fields } })
            .then(response => {
                window.localStorage.setItem("account", JSON.stringify(response.data));
                setAccount(response.data);
            }).catch(error => {
                window.localStorage.removeItem("account");
                setAccount(null);
            });
    }, []);

    const signIn = async (username, password) => {
        return await new Promise((resolve, reject) => {
            axios.post("/accounts/signin", { username: username, password: password }, { timeout: 60000 })
                .then(response => {
                    // Store to local storage and resolve
                    window.localStorage.setItem("account", JSON.stringify(response.data));
                    setAccount(response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                    setAccount(null);
                });
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

    const signOut = async () => {
        return await new Promise((resolve, reject) => {
            axios.get("/accounts/me/signout").then(response => {
                if (response.status === 200) {
                    window.localStorage.removeItem("account");
                    setAccount(null);
                    resolve(response.data);
                } else reject(response.data);

            }).catch(error => reject(error));
        });
    };

    return (
        <AccountContext.Provider value={{ signIn, account, signOut, authChallenge: signInChallenge }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };