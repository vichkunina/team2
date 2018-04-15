'use strict';

const { URL } = require('url');
const fetch = require('node-fetch');
const NodeGeocoder = require('node-geocoder');

const GEOCODER = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyBzdcHsJxq2nDqO9nItOJiyC7hjAXmtO7k'
});
const WEATHER_API_ENDPOINT = {
    protocol: 'https',
    host: 'api.darksky.net',
    path: '/forecast',
    secretKey: '792898a19463fc807e97405a487b50be',
    exclude: 'minutely,hourly,daily,alerts,flags',
    units: 'si',
    lang: 'ru'
};

const getCoordinates = async name => {
    return await GEOCODER.geocode(name);
};

const getWeather = async ({ latitude, longitude }) => {
    const url = new URL(
        `${WEATHER_API_ENDPOINT.protocol}://${WEATHER_API_ENDPOINT.host}` +
        `${WEATHER_API_ENDPOINT.path}/${WEATHER_API_ENDPOINT.secretKey}/${latitude},${longitude}` +
        `?exclude=${WEATHER_API_ENDPOINT.exclude}&units=${WEATHER_API_ENDPOINT.units}&` +
        `lang=${WEATHER_API_ENDPOINT.lang}`
    );

    const info = await fetch(url)
        .then(response => response.json());

    return info;
};

module.exports = async city => {
    const coords = await getCoordinates(city);

    return await getWeather(coords[0]);
};
