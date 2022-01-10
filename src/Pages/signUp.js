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
            confirmed_password: "",
            role: "Student",
            token: "",
            valid_email: false,
            valid_password: {
                all_check: false,
                cap: false,
                special_char: false,
                length: false
            },
            valid_confirmed_password: false,
            error_message: []
        };

        this.handleSelection = this.handleSelection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSelection(event) {
        this.setState({ role: event.target.value })
        console.log("the role now is " + this.state.role)
    };

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        console.log(name + ": " + target.value)
        if (target.name === "email") {
            var reg = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            let is_valid = reg.test(target.value);

            this.setState({ valid_email: is_valid });
        } else if (target.name === "password") {
            var is_cap = /[A-Z]/.test(target.value);
            var is_special = /[!|?|@|#|$|%|^|&|*]/.test(target.value);
            var is_length = target.value.length >= 6; // Cloudy: Said at least 6

            this.setState({
                password: target.value,
                valid_password: {
                    all_check: (is_length && is_special && is_cap),
                    cap: is_cap,
                    special_char: is_special,
                    length: is_length,
                }
            });
        } else if (name === "confirmed_password") {
            this.setState({ valid_confirmed_password: (target.value === this.state.password) });
        }

        console.log(this.state.valid_password)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("before error message: " + this.state.error_message)

        var error_mess = []
        if (!(this.state.first_name && this.state.last_name)) {
            error_mess = error_mess.concat("field can not be empty!");
        } else if (!(this.state.valid_email && this.state.valid_password.all_check)) {
            error_mess = error_mess.concat("format for email/password not valid");
        } else if (this.state.role !== "Alumni") {
            error_mess = error_mess.concat("can not register student account yet!");
        } else if (event.target.token.value !== "token") {
            error_mess = error_mess.concat("token is invalid");
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
                                            <input className="input" type="text" placeholder="first name" name="first_name" />
                                        </div>
                                    </div>

                                    <div className="field column is-half-desktop is-full-mobile">
                                        <label className="label">Last Name</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="last name" name="last_name" />
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className={this.state.valid_email ? "input is-success" : "input"}
                                            type="email" placeholder="Email Address" name="email"
                                            onChange={this.handleInputChange}
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
                                            onChange={this.handleInputChange} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                        </span>

                                    </div>
                                    <label>
                                        <span
                                            className={this.state.valid_password.cap ? "icon has-text-success" : "icon has-text-grey-light"}
                                            id="cap">
                                            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                        </span>
                                        must contain 1 capital letter, {this.state.valid_password.cap.value}</label>
                                    <br />

                                    <label>
                                        <span
                                            className={this.state.valid_password.special_char ? "icon has-text-success" : "icon has-text-grey-light"}
                                            id="special">
                                            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                        </span>
                                        must contain 1 special letter:@, #, $, %, ^, &, *</label> <br />


                                    <label>
                                        <span
                                            className={this.state.valid_password.length ? "icon has-text-success" : "icon has-text-grey-light"}
                                            id="length">
                                            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                        </span>
                                        must contain at least 6 characthers</label>
                                </div>

                                <div className="field">
                                    <label className="label">Confirmed Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            className={this.state.valid_confirmed_password ? "input is-success" : "input is-danger"}
                                            type="password" placeholder="Password"
                                            name="confirmed_password"
                                            onChange={this.handleInputChange}
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
                                                <select id="accountType" onChange={this.handleSelection} name="role">
                                                    <option value="Student">Student</option>
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