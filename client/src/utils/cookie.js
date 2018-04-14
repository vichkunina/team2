module.exports.getCookie = function (query) {
    const cookiesObj = document
        .cookie.split(';')
        .map(str => str.trim())
        .reduce((obj, next) => {
            const [name, value] = next.split('=');
            obj[name] = value;

            return obj;
        }, {});

    return decodeURIComponent(cookiesObj[query]);
};
