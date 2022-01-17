import React, {createContext} from "react";
import axios from "axios";

const AccountContext = createContext();

const Account = (props) => {

    // TODO since authentication is on backend, fix this function
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            
        });
    };

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            
        });
    };

    const logout = () => {
        axios.post("/logOut").then(response=>{
            
        }).catch(err=>{
            console.error("catch error: ",err);
        });
    };

    return(
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
