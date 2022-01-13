import React from "react";
import USAMap from "react-usa-map";

const alumini = [
    {
        "alumni_id": 1,
        "biography": "This is the bio.",
        "city": "New York",
        "email": "Joseph_Yu1@baylor.edu",
        "experiences": [
            {
                "description": "testing",
                "exper_id": 1,
                "start_time": "Sat, 13 Jan 2018 10:26:00 GMT",
                "stop_time": "Thu, 13 Jan 2022 10:26:05 GMT",
                "title": "title 1",
                "user_id": 1
            }
        ],
        "first_name": "Joseph",
        "graduate_semester": "Spring",
        "graduate_year": 2022,
        "last_name": "Yu",
        "occupation": "Alumni",
        "password": "123456789",
        "prefix": "Mr.",
        "role": "alumni",
        "state": "NY",
        "user_id": 1
    },
    {
        "alumni_id": 2,
        "biography": null,
        "city": "Waco",
        "email": "tinaxiayanli@foxmail.com",
        "experiences": [],
        "first_name": "Tina",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "Li",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": "TX",
        "user_id": 2
    },
    {
        "alumni_id": 4,
        "biography": "here is bio",
        "city": null,
        "contactinfo": {
            "contact_id": 1,
            "email_address": null,
            "email_address_optional": null,
            "phone_number": 13307486196,
            "phone_number_optional": null,
            "status": [
                true,
                true,
                true,
                true
            ],
            "user_id": 4
        },
        "email": "abc@gmail.com",
        "experiences": [],
        "first_name": "Tina",
        "graduate_semester": "Spring",
        "graduate_year": 1984,
        "last_name": "Plum",
        "occupation": "Alumni",
        "password": "password",
        "prefix": "Ms.",
        "role": "alumni",
        "state": null,
        "user_id": 4
    },
    {
        "alumni_id": 5,
        "biography": "here is bio for testing",
        "city": "Austin",
        "contactinfo": {
            "contact_id": 2,
            "email_address": null,
            "email_address_optional": null,
            "phone_number": 13307486196,
            "phone_number_optional": null,
            "status": [
                true,
                true,
                true,
                true
            ],
            "user_id": 5
        },
        "email": "tinaxiayanli@foxmail.com",
        "experiences": [],
        "first_name": "Tina",
        "graduate_semester": "Fall",
        "graduate_year": 1986,
        "last_name": "Plum",
        "occupation": "Alumni",
        "password": "password",
        "prefix": "Ms.",
        "role": "alumni",
        "state": "TX",
        "user_id": 5
    },
    {
        "alumni_id": 6,
        "biography": null,
        "city": "somewhere",
        "email": "test2@gmail.com",
        "experiences": [],
        "first_name": "xiayan",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "Li",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": "HI",
        "user_id": 6
    },
    {
        "alumni_id": 7,
        "biography": null,
        "city": null,
        "email": "testing3@abc.com",
        "experiences": [],
        "first_name": "Hello",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "world",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": null,
        "user_id": 7
    },
    {
        "alumni_id": 8,
        "biography": null,
        "city": null,
        "email": "testing2@abc.com",
        "experiences": [],
        "first_name": "Hello",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "world",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": null,
        "user_id": 8
    },
    {
        "alumni_id": 9,
        "biography": null,
        "city": null,
        "email": "testing4@abc.com",
        "experiences": [],
        "first_name": "xiayan",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "Li",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": null,
        "user_id": 9
    },
    {
        "alumni_id": 10,
        "biography": null,
        "city": null,
        "email": "abc2@gmail.com",
        "experiences": [],
        "first_name": "testing2",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "testing",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": null,
        "user_id": 10
    },
    {
        "alumni_id": 11,
        "biography": null,
        "city": null,
        "email": "abc5@abc.com",
        "experiences": [],
        "first_name": "xiayan",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "Li",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": null,
        "user_id": 11
    },
    {
        "alumni_id": 12,
        "biography": null,
        "city": null,
        "email": "abc6@abc.com",
        "experiences": [],
        "first_name": "xiayan",
        "graduate_semester": null,
        "graduate_year": null,
        "last_name": "Li",
        "occupation": "Alumni",
        "password": "password",
        "prefix": null,
        "role": "alumni",
        "state": null,
        "user_id": 12
    }
];

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
                <div className="grid grid-cols-3 gap-2 mx-10 my-6">
                    <div className="col-span-2 relative flex">
                        <USAMap onClick={this.mapHandler} customize={statesCustomConfig} />
                    </div>
                    <div className="col-span-1">
                        <ul className="grid grid-cols-1 gap-6">
                            {alumini.slice(0, 5).map((alumnus) => (
                                <li key={alumnus.email} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                                    <div className="w-full flex items-center justify-between p-6 space-x-6">
                                        <img className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" src={alumnus.imageUrl} alt="" />
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="text-gray-900 text-lg font-medium truncate">{alumnus.first_name} {alumnus.last_name}</h3>
                                                <h4 className="text-gray-600 text-base font-medium truncate italic">{alumnus.occupation}, {alumnus.graduate_semester} {alumnus.graduate_year}</h4>

                                            </div>
                                            <p className="text-gray-500 text-sm break-normal truncate">{alumnus.biography}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;