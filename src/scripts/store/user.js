import api from "@/scripts/api";

export default {
    state: {
        user: [],
        roomInventory: []
    },
    getters: {
        user: (state) => state.user,
        roomInventory: (state) => state.roomInventory
    },
    mutations: {
        setUser: (state, data) => state.user = data,
        setRoomState: (state, data) => state.user.roomInitialState = data,
        setRoomInventory: (state, data) => state.roomInventory = data
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
        clearUser: ({commit}) => {
            commit('setUser', [])
            commit('setRoomInventory', [])
        }
    }
}
