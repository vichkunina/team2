<<<<<<< HEAD
/* eslint-disable no-shadow */
module.exports.getCookie = function (name) {
=======
module.exports.getCookie = function (query) {
>>>>>>> 01eb8bd54a2105d0a54b252cf30144a4b0c0b7bc
    const cookiesObj = document
        .cookie.split(';')
        .map(str => str.trim())
        .reduce((obj, next) => {
            const [name, value] = next.split('=');
            obj[name] = value;

            return obj;
        }, {});

<<<<<<< HEAD
    return decodeURIComponent(cookiesObj[name]);
=======
    return decodeURIComponent(cookiesObj[query]);
>>>>>>> 01eb8bd54a2105d0a54b252cf30144a4b0c0b7bc
};
