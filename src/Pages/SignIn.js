import React, { useState, useContext} from "react";
import {XCircleIcon} from "@heroicons/react/solid";

import {AccountContext} from "../components/Account";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error_message, setErrorMessage] = useState(null);
    const { signIn } = useContext(AccountContext);

    const onSubmit = (event) => {
        signIn(email, password).then(response => {
            console.log(response);
            window.location.href = "/";
        }).catch(error => {
            setErrorMessage(error.message);
        });
    };

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <a className="sm:mx-auto sm:w-full sm:max-w-md" href="/">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://www.click2houston.com/resizer/3v3i6TY06rcxVuEOiQZbJjApyeA=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/MISBRBEDPZAR5BN2GDORMZITPI.jpg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </a>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-6">
                            {/* Error message */}
                            {
                                error_message !== null &&
                                <div className="bg-red-50 rounded-md p-4 mt-3">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                                        </div>
                                        <div className="ml-2">
                                            <div className="text-red-700 text-sm">
                                                <ul className="">
                                                    <li>{error_message}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setErrorMessage(null);
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                {/* <div className="text-sm">
                                    <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                                        Forgot your password?
                                    </a>
                                </div> */}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    onClick={onSubmit}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;

// class SignIn extends React.Component {

//     static contextType = useContext(AccountContext)

//     constructor(props) {
//         super();
//         this.state={
//             email:"",
//             password:"",
//         }

//         this.handleSubmit=this.handleSubmit.bind(this)
//     }

//     handleSubmit(event){
//         event.preventDefault();
//         console.log(this.state)

//         Account.authenicate(this.email, this.password)
//             .then(data => {
//                 console.log("Logged In!", data)
//             })
//             .catch(err => {
//                 console.error("Error In Log In!", err)
//             })

//         // const user = new CognitoUser({
//         //     Username: this.state.email,
//         //     Pool: UserPool
//         // })

//         // const authDetails = new AuthenticationDetails({
//         //     Username: this.state.email,
//         //     Password: this.state.password
//         // });

//         // user.authenticateUser(authDetails,{
//         //     onSuccess: (data) => {
//         //         console.log("Log In Success!", data)
//         //     },
//         //     onFailure: (err) => {
//         //         console.error("Log In Error!", err)
//         //         // TODO: add failure message to UI for user
//         //     },
//         //     newPasswordRequired: (data) => {
//         //         console.log("New Password Required!", data)
//         //     }
//         // })
//     }

//     render() {
//         return (
//             <>
//                 <div className="columns is-centered">
//                     <div className="column is-4-widescreen is-5-desktop is-7-tablet">
//                         <div className="card">
//                             <div className="card-content">

//                                 <div className="field">
//                                     <label className="label">Email</label>
//                                     <div className="control has-icons-left">
//                                         <input className="input" name="email" type="email" placeholder="Email Address"
//                                                autoFocus=""
//                                                onChange={(event)=>this.setState({email:event.target.value})}
//                                         />
//                                         <span className="icon is-small is-left">
//                                             <i className="fas fa-envelope"></i>
//                                             <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="field" id="password">
//                                     <label className="label">Password</label>
//                                     <div className="control has-icons-left">
//                                         <input className="input" name="password" type="password"
//                                                placeholder="Password"
//                                                onChange={(event)=>this.setState({password:event.target.value})}

//                                         />
//                                         <span className="icon is-small is-left">
//                                             <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="field">
//                                     <label className="checkbox">
//                                         <input type="checkbox" />
//                                         <>  Remember me</>
//                                     </label>
//                                 </div>

//                                 <button className="button is-block is-primary is-fullwidth" onClick={this.handleSubmit}>Login</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }

// export default SignIn;