<template>
    <div v-if="showFooterBar($route.name)"
         id="footer-bar" class="footer-bar-4"
    >
        <router-link to="/notifications">
            <i class="fas fa-bell"></i>
            <!--<em v-if="inbox.notifications.length > 0" class="badge bg-highlight">{{ inbox.notifications.length }}</em>-->
        </router-link>
        <router-link to="/messages">
            <i class="fas fa-comment"></i>
            <em v-if="numberOfNewMessages > 0" class="badge bg-highlight">{{ numberOfNewMessages }}</em>
        </router-link>
        <router-link to="/homepage"><i class="fa fa-home"></i></router-link>
        <router-link to="/profile"><i class="fas fa-user-circle"></i></router-link>
    </div>
</template>

<script>
export default {
    name: "FooterMenu",
    computed: {
        inbox() {
            return this.$store.getters.inbox
        },
        numberOfNewMessages() {
            const incidenceMessages = this.$store.getters.incidences.reduce((total, i) => total + (i.read ? 0 : 1), 0)
            if (this.$store.getters.chat.read) {
                return incidenceMessages
            }
            else return incidenceMessages + 1
        }
    },
    methods: {
        connect() {
            const userId = localStorage.getItem('userid')
            if (userId) {
                let channelIncidences = this.$pusher.subscribe(`incidences.user.${userId}`)
                channelIncidences.bind('newMessage', data => {
                    this.$store.dispatch('updateIncidence', data.incidence)
                });
                let channelChat = this.$pusher.subscribe(`chat.${userId}`)
                channelChat.bind('newChatMessage', data => {
                    this.$store.dispatch('updateChat', data.chat)
                });
            }
        },
        showFooterBar(path) {
            const pathsWithoutHeader = ['Landing', 'Chat con la Residencia' , 'Mensajes de la incidencia']
            return !pathsWithoutHeader.includes(path)
        },
        fetchInbox() {
            this.$store.dispatch('getInbox').then(() => {
                this.$store.dispatch('getUpdatedIncidences', this.$store.getters.inbox.incidences)
            })
        }
    },
    created() {
        this.connect()
        //this.fetchInbox()
        //setInterval(this.fetchInbox, 20000)
    }
}
</script>

<style scoped>
#footer-bar {
    min-height: 70px !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
</style>
