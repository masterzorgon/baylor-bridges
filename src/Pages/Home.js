import React from 'react';
import USAMap from "react-usa-map";

class Home extends React.Component {
    mapHandler(event){
        alert(event.target.dataset.name);
        // TODO: Display right panel for alumini list
    }

    render() {
        return (
            <>
                <USAMap onClick={this.mapHandler} />
            </>
        );
    }
}

export default Home;