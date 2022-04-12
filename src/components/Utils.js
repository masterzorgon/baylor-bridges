const classNames = (...args) => args.filter(Boolean).join(" ");

const changeSearchParam = (url, key, value) => {
    const urlParts = url.split("?");
    const baseUrl = urlParts[0];
    let queryString = urlParts[1];

    const param = new URLSearchParams(queryString);

    if (key) {
        if (!value) {
            param.delete(key);
        } else {
            param.set(key, value);
        }
    }

    queryString = param.toString();

    if (queryString.length > 0) {
        return `${baseUrl}?${queryString}`;
    } else {
        return baseUrl;
    }
};

const changeBaseURL = (url, baseUrl) => {
    const urlParts = url.split("?");
    const queryString = urlParts[1]; // If there is no ? in url, urlParts will be [url] only one element, and queryString will be undefined

    if (queryString && queryString.length > 0) {
        return `${baseUrl}?${queryString}`;
    } else {
        return baseUrl;
    }
};

const getSearchParam = (url, key) => {
    const urlParts = url.split("?");
    const queryString = urlParts[1];

    const param = new URLSearchParams(queryString);

    return param.get(key);
};

const states = [
    { title: "Arizona", value: "AZ", description: "AZ" }, { title: "New York", value: "NY", description: "NY" }, { title: "Connecticut", value: "CT", description: "CT" }, { title: "Maryland", value: "MD", description: "MD" }, { title: "Washington", value: "WA", description: "WA" }, { title: "Oregon", value: "OR", description: "OR" }, { title: "Nevada", value: "NV", description: "NV" }, { title: "New Mexico", value: "NM", description: "NM" }, { title: "District of Columbia", value: "DC", description: "DC" }, { title: "Delaware", value: "DE", description: "DE" }, { title: "Massachusetts", value: "MA", description: "MA" }, { title: "Minnesota", value: "MN", description: "MN" }, { title: "Wisconsin", value: "WI", description: "WI" }, { title: "Illinois", value: "IL", description: "IL" },
    { title: "Vermont", value: "VT", description: "VT" }, { title: "Rhode Island", value: "RI", description: "RI" }, { title: "New Jersey", value: "NJ", description: "NJ" }, { title: "Colorado", value: "CO", description: "CO" }, { title: "California", value: "CA", description: "CA" }, { title: "Pennsylvania", value: "PA", description: "PA" }, { title: "Virginia", value: "VA", description: "VA" }, { title: "Georgia", value: "GA", description: "GA" }, { title: "Maine", value: "ME", description: "ME" }, { title: "New Hampshire", value: "NH", description: "NH" }, { title: "Hawaii", value: "HI", description: "HI" }, { title: "Idaho", value: "ID", description: "ID" }, { title: "Montana", value: "MT", description: "MT" }, { title: "Indiana", value: "IN", description: "IN" },
    { title: "Alaska", value: "AK", description: "AK" }, { title: "Kentucky", value: "KY", description: "KY" }, { title: "North Carolina", value: "NC", description: "NC" }, { title: "West Virginia", value: "WV", description: "WV" }, { title: "Wyoming", value: "WY", description: "WY" }, { title: "North Dakota", value: "ND", description: "ND" }, { title: "South Dakota", value: "SD", description: "SD" }, { title: "Nebraska", value: "NE", description: "NE" }, { title: "Utah", value: "UT", description: "UT" }, { title: "Tennessee", value: "TN", description: "TN" }, { title: "Kansas", value: "KS", description: "KS" }, { title: "Oklahoma", value: "OK", description: "OK" }, { title: "Texas", value: "TX", description: "TX" },
    { title: "Missouri", value: "MO", description: "MO" }, { title: "Arkansas", value: "AR", description: "AR" }, { title: "Alabama", value: "AL", description: "AL" }, { title: "Mississippi", value: "MS", description: "MS" }, { title: "Louisiana", value: "LA", description: "LA" }, { title: "Michigan", value: "MI", description: "MI" }, { title: "Florida", value: "FL", description: "FL" }, { title: "South Carolina", value: "SC", description: "SC" }, { title: "Ohio", value: "OH", description: "OH" }, { title: "Iowa", value: "IA", description: "IA" },
];

const requiresProfileSetup = (profile) => {
    let requiresProfileSetup = false;

    for (const key in profile) {
        if (profile[key] === null) {
            console.log("NULL KEY", key);
            requiresProfileSetup = true;
            break;
        }
    }

    return requiresProfileSetup;
};


const Utils = {
    classNames,
    changeSearchParam,
    changeBaseURL,
    getSearchParam,
    states,
};

export { classNames, changeSearchParam, changeBaseURL, getSearchParam, states, requiresProfileSetup };
export default Utils;