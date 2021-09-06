import { createStore } from 'vuex'
import api from "@/scripts/api";

const absences = {
    state: {
        absences: []
    },
    getters: {
        absences: (state) => state.absences
    },
    mutations: {
        setAbsences: (state, data) => state.absences = data
    },
    actions: {
        getAbsences: ({commit}) => {
            api.getAbsences().then(r => {
                commit('setAbsences', r.data)
            })
        }
    }
}

export default createStore({
    modules: {
        absences
    }
})
