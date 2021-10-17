import api from "@/scripts/api";

/* eslint-disable */
export default {
    state: {
        roomTypes: [],
        reservationsForType: []
    },
    getters: {
        roomTypes: (state) => state.roomTypes,
        reservationsForType: (state) => state.reservationsForType
    },
    mutations: {
        setRoomTypes: (state, data) => state.roomTypes = data,
        setReservationsForType: (state, data) => state.reservationsForType = data,
        removeReservation: (state, id) => {
            const i = state.reservationsForType.map(r => r.id).indexOf(id)
            state.reservationsForType.splice(i, 1)
        }
    },
    actions: {
        getRoomTypes: ({commit}) => {
            api.getRoomTypes().then(r => {
                commit('setRoomTypes', r.data)
            })
        },
        createReservation: ({commit}, data) => {
            for (let key in data.time) {
                let formData = new FormData()
                formData.append('userId', data.userId)
                formData.append('type', data.type)
                formData.append('startDate', `${data.startDate} ${data.time[key]}:00.000000`)
                api.createReservation(formData).then()
            }
        },
        cancelReservation: ({commit}, id) => {
            api.cancelReservation(id).then(() => {
                commit('removeReservation', id)
            })
        },
        getReservationsForType: ({commit}, {type, userId}) => {
            return api.getReservationsForType(type, userId)
                .then(r => {
                    commit('setReservationsForType', r.data)
                })
        }
    }
}
