import React, {createContext} from "react";
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import Pool from '../UserPool';

const AccountContext = createContext();

const Account = (props) => {

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
        })
    };

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool })
    
            const authDetails = new AuthenticationDetails({ Username, Password });
    
            user.authenticateUser(authDetails,{
                onSuccess: (data) => {
                    console.log("Log In Success!", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("Log In Error!", err)
                    reject(err)
                    // TODO: add failure message to UI for user
                    
                },
                newPasswordRequired: (data) => {
                    console.log("New Password Required!", data)
                    resolve(data)
                }
            })
        })
    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    }

    return(
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )
};

export { Account, AccountContext };

// class Account extends React.Component {

//     constructor(props) {
//         super();
        
//         this.authenticate=this.authenticate.bind(this)
//     }

//     async authenticate(Username, Password) {
//        return await new Promise((resolve, reject) => {
//         const user = new CognitoUser({ Username, Pool })

//         const authDetails = new AuthenticationDetails({ Username, Password });

//         user.authenticateUser(authDetails,{
//             onSuccess: (data) => {
//                 console.log("Log In Success!", data)
//                 resolve(data)
//             },
//             onFailure: (err) => {
//                 console.error("Log In Error!", err)
//                 reject(err)
//                 // TODO: add failure message to UI for user
                
//             },
//             newPasswordRequired: (data) => {
//                 console.log("New Password Required!", data)
//                 resolve(data)
//             }
//         })
//        })
//     }

//     render() {
//         return(
//             <this.AccountContext.Provider value={ this.authenticate }>
//                 {this.props.children}
//             </this.AccountContext.Provider>
//         )
//     }
// };

// export { Account, AccountContext };