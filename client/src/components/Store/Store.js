import { observable, computed } from 'mobx';

export default class Store {

    @observable profile = {
        id: '1488',
        name: 'Doma',
        login: 'WBDiamond'
    };

    @observable chats = [
        {
            id: '123',
            avatar: 'nice url',
            name: 'bery nice',
            lastMessage: 'message last',
            lastMessageDate: new Date(),
            unreadCount: 10,
            users: [
                {
                    id: '999',
                    login: 'dosha',
                    name: 'h3h3',
                    avatar: 'avatar'
                }
            ],
            chatHistory: [
                {
                    id: '111',
                    body: 'privet menya zovut Dosha',
                    name: 'Roma',
                    fromMe: true,
                    date: new Date()
                },
                {
                    id: '112',
                    body: 'privet menya zovut Roma',
                    name: 'Dosha',
                    fromMe: false,
                    date: new Date()
                }
            ]
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

    @computed
    get currentChat() {
        return this.chats[0];
    }

}
