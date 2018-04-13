import { observable } from 'mobx';

export default class Store {
    @observable chats = [
        {
            id: '123',
            photoURL: 'nice url',
            name: 'bery nice',
            lastMessage: 'message last',
            lastMessageDate: new Date(),
            unreadCount: 10
        },
        {
            id: '321',
            photoURL: 'nice url',
            name: 'bery godd',
            lastMessage: 'message last',
            lastMessageDate: new Date(),
            unreadCount: 10
        }
    ];

}