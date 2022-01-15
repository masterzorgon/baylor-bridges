import React, {createContext} from "react";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import axios from "axios";

const AccountContext = createContext();

const Account = (props) => {

    // TODO since authentication is on backend, fix this function
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject();
            }
        });
    };

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });
    
            const authDetails = new AuthenticationDetails({ Username, Password });
    
            user.authenticateUser(authDetails,{
                onSuccess: (data) => {
                    console.log("Log In Success!", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("Log In Error!", err);
                    reject(err);
                    // TODO: add failure message to UI for user
                    
                },
                newPasswordRequired: (data) => {
                    console.log("New Password Required!", data);
                    resolve(data);
                }
            });
        });
    };

    const logout = () => {
        // const user = Pool.getCurrentUser();
        // if (user) {
        //     user.signOut();
        //     window.location.href="/";
        // }
        axios.post("/logOut").then(response=>{
            const res=response.data;
            console.log(res);
            if(res.status==="success"){
                window.location.href="/";
            }else{
                console.error("error message",res.message);
            }
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
