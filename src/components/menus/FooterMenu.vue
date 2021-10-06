<template>
    <div id="footer-bar" class="footer-bar-4" v-if="$route.path !== '/' && $route.name !== 'Mensajes de la incidencia'">
        <router-link to="/notifications">
            <i class="fas fa-bell"></i>
            <!--<em v-if="inbox.notifications.length > 0" class="badge bg-highlight">{{ inbox.notifications.length }}</em>-->
        </router-link>
        <router-link to="/messages">
            <i class="fas fa-comment"></i>
            <!--<em v-if="inbox.incidences.length > 0" class="badge bg-highlight">{{ inbox.incidences.length }}</em>-->
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
        }
    },
    methods: {
        fetchInbox() {
            this.$store.dispatch('getInbox').then(() => {
                this.$store.dispatch('getUpdatedIncidences', this.$store.getters.inbox.incidences)
            })
        }
    },
    created() {
        //this.fetchInbox()
        //setInterval(this.fetchInbox, 20000)
    }
}
</script>

<style scoped>
</style>
