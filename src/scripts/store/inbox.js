import api from "@/scripts/api";

export default {
    state: {
        inbox: { notifications: [], incidences: [] }
    },
    getters: {
        inbox: (state) => state.inbox
    },
    mutations: {
        setInbox: (state, data) => state.inbox = data,
        updateIncidencesInbox: (state, incidences) => state.inbox.incidences = incidences,
        updateNotificationsInbox: (state, notifications) => state.inbox.notifications = notifications
    },
    actions: {
        getInbox: ({commit}) => {
            if (localStorage.getItem('userid')) {
                api.getInbox()
                    .then(r => {
                        commit('setInbox', r.data[0])
                    })
            }
        },
        removeIncidenceFromInbox: ({commit, state}, id) => {
            let ids = [...state.inbox.incidences]
            const index = ids.indexOf(parseInt(id))
            if (index > -1) {
                ids.splice(index, 1)
                api.updateIncidencesFromInbox(ids).then(() => {
                    commit('updateIncidencesInbox', ids)
                })
            }
        },
        removeNotificationsFromInbox: ({commit, state}, id) => {
            let ids = [...state.inbox.notifications]
            const index = ids.indexOf(parseInt(id))
            if (index > -1) {
                ids.splice(index, 1)
                api.updateNotificationsFromInbox(ids).then(() => {
                    commit('updateNotificationsInbox', ids)
                })
            }
        },
        clearInbox: ({commit}) => commit('setInbox', { notifications: [], incidences: [] })
    }
}
