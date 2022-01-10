import React from 'react'
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import UserPool from "../UserPool";
import axios from "axios";
class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state={
            email:"",
            password:"",
            error_message:""
        }

        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();

        const user = new CognitoUser({
            Username: this.state.email,
            Pool:UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username:this.state.email,
            Password:this.state.password
        });

        console.log(authDetails)


        user.authenticateUser(authDetails,{
            onSuccess: data =>{
                console.log('onSucess: ', data)
                axios.post('http://localhost:5000/testing',{email:this.state.email},{
                    headers:{
                        'Access-Control-Allow-Origin':'*'
                    }
                })
            },
            onFailure:err =>{
                this.setState({error_message:err.message})
                console.error('onFailure: ',err.message)
            },
            newPasswordRequired: data =>{
                console.log(data)
        }
        });
    }

    render() {
        var message_list=this.state.error_message;
        return (
            <>
                <div className="columns is-centered">
                    <div className="column is-4-widescreen is-5-desktop is-7-tablet">
                        <div className="card">
                            <div className="card-content">
                                {this.state.error_message?<div className="notification is-danger">{this.state.error_message}</div>:""}


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
                                        <input type="checkbox" />
                                        Remember me
                                    </label>
                                </div>

                                <button className="button is-block is-primary is-fullwidth" onClick={this.handleSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignIn;