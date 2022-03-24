const classNames = (...args) => args.filter(Boolean).join(" ");

const changeSearchParams = (url, key, value) => {
    const urlParts = url.split("?");
    const baseUrl = urlParts[0];

    const queryString = urlParts[1];
    const queryParams = queryString ? queryString.split("&") : [];

    const param = new URLSearchParams(queryParams);

    if (value === null) {
        param.delete(key);
    } else {
        param.set(key, value);
    }

    return `${baseUrl}?${param.toString()}`;
};



const Utils = {
    classNames,
    changeSearchParams,
};

export { classNames };
export default Utils;