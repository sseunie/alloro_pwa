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
        updateIncidence: (state, incidence) => {
            const index = state.incidences.findIndex(i => i.id === incidence.id)
            state.incidences[index] = incidence
        },
        updateRead: (state, id) => {
            const index = state.incidences.findIndex(incidence => incidence.id == id)
            state.incidences[index].read = true
        }
    },
    actions: {
        getIncidences: ({commit}) => {
            api.getIncidences().then(r => {
                console.log(r.data)
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
        getUpdatedIncidences: ({commit}, ids) => {
            ids.forEach(id => {
                api.getIncidence(id).then(r => {
                    commit('updateIncidence', r.data)
                })
            })
        },
        clearIncidences: ({commit}) => commit('setIncidences', [])
    }
}
