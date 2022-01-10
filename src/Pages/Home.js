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

    getStatsConfig() {
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
        const statesCustomConfig = this.getStatsConfig();

        return (
            <>
                <div className="container">
                    <div className="tile is-ancestor">
                        <div classNamme="tile is-parent">
                            <div className="tile is-12">
                                <USAMap onClick={this.mapHandler} customize={statesCustomConfig} />
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div className="tile is-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h1>Alumini</h1>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Mauris sagittis pellentesque lacus eleifend lacinia...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;