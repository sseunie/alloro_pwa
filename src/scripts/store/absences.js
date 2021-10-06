import api from "@/scripts/api";
import utils from "@/scripts/utils";

export default {
    state: {
        absences: []
    },
    getters: {
        absences: (state) => state.absences.sort(utils.compareDates)
    },
    mutations: {
        setAbsences: (state, data) => state.absences = data,
        pushAbsence: (state, absence) => state.absences.push(absence)
    },
    actions: {
        getAbsences: ({commit}) => {
            api.getAbsences().then(r => {
                commit('setAbsences', r.data)
            })
        },
        createAbsence: ({commit}, data) => {
            api.createAbsence(data)
                .then((r) => {
                    commit('pushAbsence', r.data)
                })
        },
        clearAbsences: ({commit}) => commit('setAbsences', [])
    }
}
