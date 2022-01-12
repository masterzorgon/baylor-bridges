import React from "react";

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            active:""
        }
        let current_path=window.location.pathname
        if(current_path==="/Alumni-Edit-profile/Experience"){
            this.state={active:"experience"}
        }else{
            this.state={active:""}
        }

    }

    render() {
      return(
          <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile" id="profile_sidebar">
              <ul className="menu-list" id="sidebar_menu">
                  <li><a id="sidebar-basic_info" href="/Alumni_register">
            <span className="icon">
                <i className="fa fa-user-md" aria-hidden="true"></i>
            </span>

                      Basic Info</a></li>
                  <li><a id="sidebar-Dashboard">
            <span className="icon">
                <i className="fa fa-tachometer" aria-hidden="true"></i>
            </span>

                      Dashboard</a></li>

                  <li><a id="sidebar-experience" href="/Alumni-Edit-profile/Experience"
                         className={this.state.active==="experience"?"is-active":""}>
            <span className="icon">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
            </span>
                      Experience</a></li>
                  <li><a id="sidebar-workload">
            <span className="icon">
                <i className="fa fa-calendar" aria-hidden="true"></i>
            </span>
                      Workload</a></li>

              </ul>
          </aside>)
    }
}

export default SideBar;