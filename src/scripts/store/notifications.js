import api from "@/scripts/api";
import utils from "@/scripts/utils";

export default {
    state: {
        notifications: []
    },
    getters: {
        notificationsByDate: (state) => {
            return state.notifications.sort(utils.compareDates)
        },
        notificationsByTitle: (state) => {
            return state.notifications.sort((a, b) => a.title.localeCompare(b.title))
        },
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
