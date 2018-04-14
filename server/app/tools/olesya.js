'use strict';

const getWeather = require('./weather');

const ANSWERS = {
    misunderstandings: [
        'Ясно. Ты точно спрашивал, "какая погода в ..."?',
        'Прости, не поняла тебя :( Спроси, "какая погода в ..."',
        'Может, ты имел в виду, "какая погода в ..."?',
        'Смешная шутка! А теперь спроси, "какая погода в ..."',
        'Да, но ты всё ещё не спросил, "какая погода в ..."'
    ],
    weatherReport({ summary, temperature, apparentTemperature }) {
        return `Там ${summary.toLowerCase()}, ${Math.round(temperature)}° ` +
            `(ощущается как ${Math.round(apparentTemperature)}°)`;
    }
};

// USAGE: ask('Какая погода в Екб?')
exports.ask = async question => {
    try {
        const city = question.match(/^какая погода в ([А-Яа-яЁё\s]+)\s*\??$/i)[1];

        const weather = await getWeather(city);

        return ANSWERS.weatherReport(weather.currently);
    } catch (error) {
        return ANSWERS.misunderstandings[
            Math.floor(Math.random() * ANSWERS.misunderstandings.length)
        ];
    }
};
