import { createStore } from 'vuex'
import api from "@/scripts/api";

function compareDates(a, b) {
    if ( new Date(a.createdAt) > new Date(b.createdAt) ){
        return -1
    }
    if ( new Date(a.createdAt) < new Date(b.createdAt) ){
        return 1
    }
    return 0
}

const absences = {
    state: {
        absences: []
    },
    getters: {
        absences: (state) => state.absences.sort(compareDates)
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
                .then(() => {
                    commit('pushAbsence', data)
                })
        }
    }
}

export default createStore({
    modules: {
        absences
    }
})
