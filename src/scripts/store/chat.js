import api from "@/scripts/api";

export default {
    state: {
        chat: []
    },
    getters: {
        chat: (state) => state.chat
    },
    mutations: {
        setChat: (state, data) => state.chat = data,
        updateChatRead: (state) => state.chat.read = true,
        pushResidenceChatMessage: (state, message) => {
            state.chat.messages.push(message)
        },
        updateChat: (state, data) => state.chat = data,
    },
    actions: {
        getChat: ({commit}, userId) => {
            return api.getResidenceChat(userId).then(r => {
                commit('setChat', r.data)
            })
        },
        updateChatReadStatus: ({commit}, id) => {
            api.updateChatReadStatus(id)
                .then(() => {
                    commit('updateChatRead')
                })
        },
        updateChat: ({commit}, data) => {
            commit('updateChat', data)
        },
        sendResidenceChatMessage: ({commit}, {id, data}) => {
            api.sendResidenceChatMessage(id, data)
                .then(r => {
                    commit('pushResidenceChatMessage', r.data)
                })
        },
        clearChat: ({commit}) => commit('setChat', [])
    }
}
