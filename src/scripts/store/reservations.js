import api from "@/scripts/api";

export default {
    state: {
        reservations: [],
        roomTypes: []
    },
    getters: {
        reservations: (state) => state.reservations,
        roomTypes: (state) => state.roomTypes
    },
    mutations: {
        setReservations: (state, data) => state.reservations = data,
        pushReservation: (state, reservation) => state.reservations.push(reservation),
        setRoomTypes: (state, data) => state.roomTypes = data,
    },
    actions: {
        getRoomTypes: ({commit}) => {
            api.getRoomTypes().then(r => {
                commit('setRoomTypes', r.data)
            })
        },
        getReservations: ({commit}) => {
            api.getUserReservations(localStorage.getItem('userid')).then(r => {
                commit('setReservations', r.data)
            })
        },
        createReservation: ({commit}, data) => {
            console.log(commit)
            console.log(data)
        },
        clearReservations: ({commit}) => commit('setReservations', [])
    }
}
