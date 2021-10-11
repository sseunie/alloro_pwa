import api from "@/scripts/api";

export default {
    state: {
        notifications: []
    },
    getters: {
        notifications: (state) => state.notifications,
        notification: (state) => (id) => {
            return state.notifications.find(notification => notification.id == id)
        }
    },
    mutations: {
        setNotifications: (state, data) => state.notifications = data
    },
    actions: {
        getNotifications: ({commit}) => {
            api.getNotifications().then(r => {
                commit('setNotifications', r.data)
            })
        }
    }
}
