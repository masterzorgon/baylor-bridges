import React from "react";
import NavbarAccount from "./NavbarAccount";
import Pool from '../UserPool'

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar box" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img alt="Baylor University logo"
                             src="https://www.click2houston.com/resizer/3v3i6TY06rcxVuEOiQZbJjApyeA=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/MISBRBEDPZAR5BN2GDORMZITPI.jpg"
                             width="50" height="50"></img>
                    </a>

                    {/* TODO: Responsive hamburger menu on mobile */}
                    <div alt="Menu logo" role="button" className="navbar-burger burger" aria-label="menu"
                         aria-expanded="true" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">Home</a>

                        {/* <a className="navbar-item" href="">Documentation</a> */}

                        <div className="navbar-item has-dropdown is-hoverable">
                            <div className="navbar-link">More</div>
                            <div className="navbar-dropdown">
                                <a className="navbar-item" href="/about">About</a>
                                <a className="navbar-item" href="/">Jobs</a>
                                <a className="navbar-item" href="/">Contact</a>
                                <hr className="navbar-divider"></hr>
                                <a className="navbar-item" href="/">Report an issue</a>
                            </div>
                        </div>

                        <div className="navbar-item">
                            <input class="input is-normal search-bar" type="text" placeholder="Search people"/>
                        </div>
                    </div>

                        <NavbarAccount/>

                </div>
            </nav>
        )
    }
}

export default Navbar;