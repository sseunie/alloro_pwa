import { createStore } from 'vuex'
import api from "@/scripts/api";

function compareDates(a, b) {
    if ( a.createdDate > b.createdDate ){
        return -1
    }
    if ( a.createdDate < b.createdDate ){
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
