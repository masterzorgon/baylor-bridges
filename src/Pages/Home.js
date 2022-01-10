import React from 'react';
import USAMap from "react-usa-map";

class Home extends React.Component {
    mapHandler(event) {
        alert(event.target.dataset.name);
        // TODO: Display right panel for alumini list
    }

    getAllStates() {
        return [
            "AZ", "NY", "CT", "MD", "WA", "OR", "NV", "NM", "DC", "DE", "MA", "MN", "WI", "IL",
            "VT", "RI", "NJ", "CO", "CA", "PA", "VA", "GA", "ME", "NH", "HI", "ID", "MT", "IN",
            "TE", "AK", "KY", "NC", "WV", "WY", "ND", "SD", "NE", "UT", "TN", "KS", "OK", "TX",
            "IO", "MO", "AR", "AL", "MS", "LA", "MI", "LA", "FL", "SC", "OH", "IA",
        ];
    }

    makeStatsConfig() {
        const config = {};
        const states = this.getAllStates();

        states.forEach((state) => {
            var opacity = Math.random();

            config[state] = {};
            config[state].fill = `rgba(21, 71, 52, ${opacity})`; // Cloudy: This is Baylor green!
        });

        return config;
    }

    render() {
        const statesCustomConfig = this.makeStatsConfig();

        return (
            <>
                <div className="container">
                    <div classNamme="columns">
                        <div className="column">
                            <USAMap onClick={this.mapHandler} customize={statesCustomConfig} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;