import api from "@/scripts/api";

export default {
    state: {
        user: [],
        roomInventory: [],
        roomStateFinishDate: []
    },
    getters: {
        user: (state) => state.user,
        roomInventory: (state) => state.roomInventory,
        roomStateFinishDate: (state) => state.roomStateFinishDate
    },
    mutations: {
        setUser: (state, data) => state.user = data,
        setRoomState: (state, data) => state.user['room_initial_state'] = data,
        setRoomInventory: (state, data) => state.roomInventory = data,
        setRoomStateFinishDate: (state, date) => state.roomStateFinishDate = date
    },
    actions: {
        getUser: ({commit}) => {
            return api.getUser(localStorage.getItem('userid'))
                .then(r => commit('setUser', r.data))
        },
        getRoomInventory: ({commit}) => {
            api.getUserRoomInventory(localStorage.getItem('userid'))
                .then(r => commit('setRoomInventory', r.data.inventory))
        },
        setRoomState: ({commit}, data) => {
            return api.sendUserRoomInitialState(localStorage.getItem('userid'), data)
                .then((r) => {
                    commit('setRoomState', r.data)
                })
        },
        getRoomStateFinishDate: ({commit}) => {
            api.getRoomStateFinishDate(localStorage.getItem('userid'))
              .then(r => {
              commit('setRoomStateFinishDate', r.data[0].finish_date)
          })
        },
        clearUser: ({commit}) => {
            commit('setUser', [])
            commit('setRoomInventory', [])
            commit('setRoomStateFinishDate', [])
        }
    }
}
