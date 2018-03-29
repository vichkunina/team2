/* eslint-env mocha */
'use strict';

const assert = require('assert');
const request = require('supertest');

const UserModel = require('../app/models/User');

const app = require('../');

describe('GraphQL тесты', () => {
    const user1 = new UserModel({
        login: 'user1',
        name: 'user2',
        githubId: 'ghid',
        chats: [],
        contacts: [],
        createdAt: Date.now()
    });

    it('Получает профиль пользователя', async () => {
        await user1.save();

        request(app)
            .post('/api')
            .send({
                query: `
                    {  
                        profile(id: ${user1.id}) {
                            id,
                            contacts {
                                id
                                name
                            }
                        }
                    }
                `
            })
            .expect(res => {
                console.log(res.body);
            });

    });
});
