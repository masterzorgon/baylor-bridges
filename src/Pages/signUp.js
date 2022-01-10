import React from 'react'
import { faEnvelope, faLock, faCheckCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserPool from "../UserPool";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "Student",
            token: "",
            valid_email: false,
            valid_password: {
                all_check: false,
                cap: false,
                special_char: false,
                length: false
            },
            valid_confirm_password: false,
            error_message: []
        };

        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render_token() {
        return (
            <div class="block">
                <div class="field">
                    <label class="label">Token</label>
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Token" name="token" />
                        <span class="icon is-small is-left">
                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        </span>
                    </p>
                </div>
                <br />
            </div>
        );
    }

    handleFirstNameChange(event) {
        this.setState({ first_name: event.target.value })
    };

    handleLastNameChange(event) {
        this.setState({ last_name: event.target.value })
    };

    handlePasswordChange(event) {
        var password = event.target.value;
        var is_cap = /[A-Z]/.test(password);
        var is_special = /[!|?|@|#|$|%|^|&|*]/.test(password);
        var is_length = event.target.value.length >= 6; // Cloudy: Said at least 6

        this.setState({
            password: password,
            valid_password: {
                all_check: (is_length && is_special && is_cap),
                cap: is_cap,
                special_char: is_special,
                length: is_length,
            }
        });
    };

    handleConfirmPasswordChange(event) {
        this.setState({
            valid_confirmed_password: (event.target.value === this.state.password),
        });
    };

    handleEmailChange(event) {
        var email = event.target.value;
        var reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let is_valid = reg.test(email);
        this.setState({ email: email, valid_email: is_valid });
    };

    handleRoleChange(event) {
        this.setState({ role: event.target.value });
    };

    handleTokenChange(event) {
        this.setState({ token: event.target.value });
        console.log("the token now is " + this.state.token);
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log("before error message: " + this.state.error_message)

        var error_mess = []
        if (!(this.state.first_name && this.state.last_name)) {
            error_mess = error_mess.concat("All fields are required.");
        } else if (!this.state.valid_email) {
            error_mess = error_mess.concat("Email must be valid.");
        } else if (!this.state.valid_password.all_check) {
            error_mess = error_mess.concat("Password must meet requirements.");
        } else if (this.state.role !== "Alumni") {
            error_mess = error_mess.concat("We're unable to sign you up as a student yet.");
        } else if (event.target.token.value !== "token") {
            error_mess = error_mess.concat("Token is invalid");
        } else {
            UserPool.signUp(this.state.email, this.state.password, [], null, (err, data) => {
                if (err) {
                    console.error(err)
                }

                console.log(data)
            })
        }

        this.setState({ error_message: error_mess })
        console.log("after error message: " + this.state.error_message)
    }


    render() {
        var message_list = this.state.error_message;

        return (
            <>
                <div className="columns is-centered">
                    <div className="column is-4-widescreen is-5-desktop is-7-tablet">
                        <div className="card">
                            <div className="card-content">
                                {message_list.map(function (mes, index) {
                                    return <div className="notification is-danger">{mes}</div>
                                })}

                                <div className="columns">
                                    <div className="field column is-half-desktop is-full-mobile">
                                        <label className="label">First Name</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="First name"
                                                name="first_name" onChange={this.handleFirstNameChange} />
                                        </div>
                                    </div>

                                    <div className="field column is-half-desktop is-full-mobile">
                                        <label className="label">Last Name</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Last name"
                                                name="last_name" onChange={this.handleLastNameChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className={this.state.valid_email ? "input is-success" : "input"}
                                            type="email" placeholder="Email Address" name="email"
                                            onChange={this.handleEmailChange}
                                        />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>

                                        </span>
                                        <span className="icon is-small is-right">
                                            {this.state.valid_email ? <FontAwesomeIcon icon={faCheck} /> : ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            className={this.state.valid_password.all_check ? "input is-success" : "input"}
                                            type="password" placeholder="Password" name="password"
                                            id="password"
                                            onChange={this.handlePasswordChange} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                        </span>

                                    </div>
                                    <label>
                                        <span className={this.state.valid_password.cap ? "icon has-text-success" : "icon has-text-grey-light"} id="cap">
                                            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                        </span>
                                        must contain 1 capital letter</label>
                                    <br />

                                    <label>
                                        <span className={this.state.valid_password.special_char ? "icon has-text-success" : "icon has-text-grey-light"} id="special">
                                            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                        </span>
                                        must contain 1 special letter:@, #, $, %, ^, &, *</label> <br />

                                    <label>
                                        <span className={this.state.valid_password.length ? "icon has-text-success" : "icon has-text-grey-light"} id="length">
                                            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                        </span>
                                        must be at least 6 characthers</label>
                                </div>

                                <div className="field">
                                    <label className="label">Confirm Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            className={this.state.valid_confirm_password ? "input is-success" : "input is-danger"}
                                            type="password" placeholder="Password"
                                            name="confirmed_password"
                                            onChange={this.handleConfirmPasswordChange}
                                        />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                        </span>
                                    </div>
                                </div>

                                <div className="block" id="accountSelection">
                                    <div className="field">
                                        <label className="label">Role</label>
                                        <div className="control is-expanded">
                                            <div className="select is-fullwidth">
                                                <select id="accountType" onChange={this.handleRoleChange} name="role">
                                                    <option value="Student">Current Student</option>
                                                    <option value="Alumni">Alumni</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.state.role === 'Alumni' ? this.render_token() : ""}

                                <button className="button is-block is-primary is-fullwidth" onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignUp;