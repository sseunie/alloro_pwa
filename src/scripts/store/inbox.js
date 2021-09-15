import api from "@/scripts/api";

export default {
    state: {
        inbox: { notifications: [], incidences: [] }
    },
    getters: {
        inbox: (state) => state.inbox
    },
    mutations: {
        setInbox: (state, data) => state.inbox = data[0],
        updateIncidencesInbox: (state, incidences) => state.inbox.incidences = incidences
    },
    actions: {
        getInbox: ({commit}) => {
            if (localStorage.getItem('userid')) {
                api.getInbox()
                    .then(r => {
                        commit('setInbox', r.data)
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
        }
    }
}
