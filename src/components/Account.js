import React, { createContext } from "react";
import axios from "axios";

const AccountContext = createContext();

const Account = (props) => {
    const [account, setAccount] = React.useState(null);

    const signIn = async (email, password) => {
        return await new Promise((resolve, reject) => {
            axios.post("/signIn", {
                email: email,
                password: password
            }).then(response => {
                if (response.status === 200) {
                    setAccount(response.data);
                    resolve(account);
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
                    setAccount(null);
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    };

    return (
        <AccountContext.Provider value={{ signIn, account, logout: signOut }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
