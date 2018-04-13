import { observable } from 'mobx';

export default class Store {
    @observable chats = [
        {
            id: '123',
            avatar: 'nice url',
            name: 'bery nice',
            lastMessage: 'message last',
            lastMessageDate: new Date(),
            unreadCount: 10,
            chatHistory = [
                {
                    id: '11',
                    body: 'qqq',
                    fromMe: true,
                    name: dosha,
                    date: new Date()
                },

                {
                    id: '12',
                    body: 'hello',
                    fromMe: false,
                    name: qq,
                    date: new Date()
                },

                {
                    id: '13',
                    body: 'whwhwh',
                    fromMe: true,
                    name: dosha,
                    date: new Date()
                },

                {
                    id: '14',
                    body: 'pppp',
                    fromMe: true,
                    name: dosha,
                    date: new Date()
                }
            ],
        },

        {
            id: '321',
            avatar: 'nice url',
            name: 'bery godd',
            lastMessage: 'message last',
            lastMessageDate: new Date(),
            unreadCount: 10
        }
    ];

    @observable currentChat = '123';
    @observable profile = {
        id: '11',
        name: 'dosha',
        login: 'do'
    };

}
