'use strict';
/* eslint-env mocha */

const assert = require('assert');
const hrefArray = require('../app/tools/href');

describe('Тестирование ссылок', () => {
    it('Создает массив всех найденных ссылок в сообщении', () => {
        const message =
        '**tut** _budet_ message https://github.com/urfu-2017 http://mail.ru/ fdddddd';
        const resultArray = ['https://github.com/urfu-2017', 'http://mail.ru/'];
        assert.deepEqual(hrefArray.getHrefArray(message), resultArray);
    });

    it('Не кладет в массив относительные ссылки', () => {
        const message = '**tut** _budet_ message /urfu-2017 http://mail.ru/ fdddddd';
        const resultArray = ['http://mail.ru/'];
        assert.deepEqual(hrefArray.getHrefArray(message), resultArray);
    });
});
