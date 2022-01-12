import React from "react";
import SideBar from "../components/Alumni_Register_SideBar";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const exper_card=(id)=>{
    return(
        <div>hello!</div>
    )
}


class Alumni_Register_Experience extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddingExper=this.handleAddingExper.bind(this);
        this.state={
            exper_num:0
        }
    }

    handleAddingExper(){

    }

    componentDidMount() {
        console.log("mounting!")
    }

    render() {


        return (
            <section className="main-content columns is-fullheight">
                <SideBar/>
                <div className="container is-max-desktop">
                    {/*{% for exper in user.experiences %}*/}

                    {/*{% with experience=exper %}*/}
                    {/*{% include "Experience_card.html" %}*/}
                    {/*{% endwith %}*/}
                    {/*TODO loading experience*/}
                    <br/>
                    {/*{% endfor %}*/}

                    <br/>
                    <div className="card section">
                        <div className="content has-text-centered">
                            <button className="button is-large" id="add_experience"
                            onClick={this.handleAddingExper}
                            >
                            <span className="icon">
                                <span className="fa-2x">
                                    <FontAwesomeIcon icon={faPlusSquare}/>
                                </span>
                    </span>
                                <br/>
                                <span> add new Experience</span>
                            </button>
                        </div>
                    </div>

                </div>


            </section>
        )

    }
}

export default Alumni_Register_Experience;