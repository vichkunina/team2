/* eslint-disable new-cap */
import { autorun } from 'mobx';
import director from 'director/build/director';

export function startRouter(store) {
    const routes = {
        '/im/:p': (name) => store.selectChatByName(name),
        '/im': () => store.closeChat()
    };
    const router = director.Router(routes);

    router.init();

    autorun(() => {
        const path = store.currentPath;
        if (path !== window.location.pathname) {
            window.history.pushState(null, null, path);
        }
    });
}
