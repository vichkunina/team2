/* eslint-env mocha */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
'use strict';

const assert = require('assert');
const request = require('supertest');
const express = require('express');
const graphql = require('express-graphql');
const { connect, setTimeout } = require('hruhru');
const { GraphQLSchema } = require('graphql');
const MutationType = require('../app/api/types/MutationType');
const QueryType = require('../app/api/types/QueryType');

connect(process.env.DB_URL, process.env.DB_TOKEN);
setTimeout(2 * 1000);

const UserModel = require('../app/models/User');

describe('GraphQL тесты', () => {
    const app = express();

    const me = new UserModel({
        login: 'user1',
        name: 'user1',
        githubId: 'ghid',
        chats: [],
        contacts: [],
        createdAt: Date.now()
    });

    const user = new UserModel({
        login: 'user1',
        name: 'user2',
        githubId: 'ghid'
    });

    app.use((req, res, next) => {
        req.user = me;

        next();
    });

    const schema = new GraphQLSchema({
        query: QueryType,
        mutation: MutationType
    });

    app.use('/api', graphql({
        schema,
        graphiql: false
    }));

    it('Получает профиль пользователя', async () => {
        await me.save();

        const resp = await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                    {
                        profile {
                            id,
                            contacts {
                                id
                                name
                            }
                        }
                    }
                `
            });

        assert.equal(resp.body.data.profile.id, me.id);
    }).timeout(20 * 1000);

    it('Добавляет пользователя в контакты и создаёт диалог', async () => {
        await user.save();

        const resp = await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                    mutation {
                        addContact(id: "${user.id}") {
                            users {
                                id
                            }
                        }
                    }
                `
            });

        console.log(`user id: ${user.id}`);

        const resp2 = await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                    {
                        profile {
                            chats {
                                id
                                dialog
                            }
                        }
                    }
                `
            });

        assert.deepEqual(resp.body.data.addContact.users.map(u => u.id), [user.id, me.id]);
        assert.equal(resp2.body.data.profile.chats[0].dialog, true);
    }).timeout(20 * 1000);

    it('Контакты и чаты других пользователей не просматриваются', async () => {
        await me.save();

        const resp = await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                    {
                        profile {
                            contacts {
                                id
                                chats {
                                    id
                                }
                                contacts {
                                    id
                                }
                            }
                        }
                    }
                `
            });

        assert.equal(resp.body.data.profile.contacts[0].chats.length, 0);
        assert.equal(resp.body.data.profile.contacts[0].contacts.length, 0);
    }).timeout(20 * 1000);

    it('Отправляет сообщения и загружает их', async () => {
        const chats = await (await UserModel.getById(user.id)).getByLink('chats');

        await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                    mutation {
                        sendMessage(chatId: "${chats[0].id}", text: "test1") {
                            from {
                                id
                            }
                            body
                        }
                    }
                `
            });

        const resp2 = await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                    {
                        profile {
                            id,
                            chats {
                                id
                            }
                        }
                    }
                `
            });

        const resp3 = await request(app)
            .post('/api?')
            .send({
                operationName: null,
                variables: null,
                query: `
                {
                    getLastMessages(chatId: "${resp2.body.data.profile.chats[0].id}",
                    count: ${100}) {
                        body
                        from {
                            id
                        }
                    }
                }
                `
            });

        assert.equal(resp3.body.data.getLastMessages.length, 1);
    }).timeout(20 * 1000);

    after(async function () {
        this.timeout(20 * 1000);

        await me.remove();
        await user.remove();
    });
});

