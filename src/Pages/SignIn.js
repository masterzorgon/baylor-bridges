import React, {useState, useContext} from 'react'
import { AccountContext } from '../components/Account';
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext)

    const onSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password)
            .then(data => {
                console.log("Logged In!", data)
                window.location.href="/"
            })
            .catch(err => {
                console.error("Failed To Log In", err)
            })
    };

    return (
        <>
            <div className="columns is-centered">
                <div className="column is-4-widescreen is-5-desktop is-7-tablet">
                    <div className="card">
                        <div className="card-content">
                            <form onSubmit={onSubmit}>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input className="input" name="email" type="email" placeholder="Email Address"
                                                autoFocus="" value={email}
                                                onChange={(event)=>setEmail(event.target.value)}
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
                                                placeholder="Password" value={password}
                                                onChange={(event)=>setPassword(event.target.value)}
                                                
                                        />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                        </span>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        <>  Remember me</>
                                    </label>
                                </div>

                                <button className="button is-block is-primary is-fullwidth" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
