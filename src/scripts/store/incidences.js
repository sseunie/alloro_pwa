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
        pushIncidence: (state, incidence) => state.incidences.push(incidence)
    },
    actions: {
        getIncidences: ({commit}) => {
            api.getIncidences().then(r => {
                commit('setIncidences', r.data)
            })
        },
        createIncidence: ({commit}, data) => {
            api.createIncidence(data)
                .then(() => {
                    commit('pushIncidence', data)
                })
        },
        clearIncidences: ({commit}) => commit('setIncidences', [])
    }
}
