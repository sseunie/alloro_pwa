<template>
    <div id="footer-bar" class="footer-bar-4" v-if="$route.path !== '/' && $route.name !== 'Mensajes de la incidencia'">
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
            return this.$store.getters.incidences.reduce((total, i) => total + (i.read ? 0 : 1), 0)
        }
    },
    methods: {
        connect() {
            const userId = localStorage.getItem('userid')
            if (userId) {
                let channel = this.$pusher.subscribe(`incidences.user.${userId}`)
                channel.bind('newMessage', data => {
                    this.$store.dispatch('updateIncidence', data.incidence)
                });
            }
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
    min-height: 85px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
}
</style>
