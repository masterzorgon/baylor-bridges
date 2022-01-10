import React from 'react'
import {faEnvelope,faLock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import UserPool from "../UserPool";
class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state={
            email:"",
            password:""
        }

        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state)

        const user = new CognitoUser({
            Username: this.state.email,
            Pool:UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username:this.state.email,
            Password:this.state.password
        });

        user.authenticateUser(authDetails,{
            OnSucess: data =>{
                console.log(data)
            },
            onFailure:err =>{
                console.error(err)
            },
            newPasswordRequired: data =>{
                console.log(data)
        }
        })
    }

    render() {
        return (
            <div>
                <title>Sign In Page</title>
                <body className="body">
                <div className="columns is-desktop is-centered section is-medium ">
                    <div className="card column is-3-widescreen is-3-desktop is-center">
                        <div className="tabs is-centered is-medium">
                            <ul>
                                <li className="is-active"><a>Sign In</a></li>
                                <li><a href="/signUp">Sign Up</a></li>
                            </ul>
                        </div>

                        <div className="box">
                            <form onSubmit={this.handleSubmit}>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input className="input" name="email" type="email" placeholder="Email Address"
                                               autoFocus=""
                                               onChange={(event)=>this.setState({email:event.target.value})}
                                        />
                                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                            </span>

                                    </div>
                                </div>

                                <div className="field" id="password">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input className="input" name="password" type="password"
                                               placeholder="Password"
                                               onChange={(event)=>this.setState({password:event.target.value})}
                                        />
                                        <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                            </span>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="checkbox">
                                        <input type="checkbox" name="remember"/>
                                        Remember me
                                    </label>
                                </div>

                                <button className="button is-block is-primary is-fullwidth">Login</button>
                            </form>
                        </div>

                    </div>
                </div>

                </body>

            </div>
        )
    }
}

export default SignIn;