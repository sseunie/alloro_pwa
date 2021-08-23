<template>
    {{ notifications }}
</template>

<script>
import api from '../scripts/api';

export default {
    name: 'Home',
    data: () => ({
        notifications: [],
    }),
    created() {
        api.getNotifications().then(r => {
            console.log(r)
            this.notifications = r.data
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
