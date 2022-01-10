import 'bulma/css/bulma.min.css'
import React from "react";
class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){


        return (


        <nav className="navbar box" role="navigation"
                 aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/Home">
                        <img
                            src="https://www.click2houston.com/resizer/3v3i6TY06rcxVuEOiQZbJjApyeA=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/MISBRBEDPZAR5BN2GDORMZITPI.jpg"
                            width="50" height="50"></img>
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="true"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/Home">
                            Home
                        </a>

                        <a className="navbar-item">
                            Documentation
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item" href="/About">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider"></hr>
                                    <a className="navbar-item">
                                        Report an issue
                                    </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">


                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary" href="/signUp">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light" href="/signIn">
                                    Sign in
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;