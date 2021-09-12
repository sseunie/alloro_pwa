import api from "@/scripts/api";
import utils from "@/scripts/utils";

export default {
    state: {
        incidences: []
    },
    getters: {
        incidences: (state) => state.incidences.sort(utils.compareDates),
        incidence: (state) => (id) => {
            return state.incidences.find(incidence => incidence.id == id)
        }
    },
    mutations: {
        setIncidences: (state, data) => state.incidences = data,
        pushIncidence: (state, incidence) => state.incidences.push(incidence),
        updateRead: (state, id) => {
            const index = state.incidences.findIndex(incidence => incidence.id == id)
            state.incidences[index].read = true
        }
    },
    actions: {
        getIncidences: ({commit}) => {
            api.getIncidences().then(r => {
                commit('setIncidences', r.data)
            })
        },
        createIncidence: ({commit}, data) => {
            api.createIncidence(data)
                .then((r) => {
                    commit('pushIncidence', r.data)
                })
        },
        updateIncidenceReadStatus: ({commit}, id) => {
            api.updateIncidenceReadStatus(id)
                .then(() => {
                    commit('updateRead', id)
                })
        },
        clearIncidences: ({commit}) => commit('setIncidences', [])
    }
}
