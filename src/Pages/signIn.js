import React from 'react'
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SignIn extends React.Component {
    // TODO: Sign In functionality

    render() {
        return (
            <>
                <div className="columns is-centered">
                    <div className="column is-4-widescreen is-5-desktop is-7-tablet">
                        <div className="card">
                            <div className="card-content">

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input className="input" name="email" type="email" placeholder="Email Address"
                                            autoFocus="" />
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
                                            placeholder="Password" />
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

                                <button className="button is-block is-primary is-fullwidth">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignIn;