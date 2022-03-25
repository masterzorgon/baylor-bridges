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


const Utils = {
    classNames,
    changeSearchParam,
    changeBaseURL,
    getSearchParam,
};

export { classNames, changeSearchParam, changeBaseURL, getSearchParam };
export default Utils;