<template>
    <room-state-view />
    <room-state-form />
</template>

<script>
import RoomStateView from "@/components/home-components/RoomStateView";
import RoomStateForm from "@/components/home-components/RoomStateForm";
export default {
    name: "RoomState",
    components: {RoomStateForm, RoomStateView},
    created() {
        if (this.$store.getters.user.length === 0) {
            this.$store.dispatch('getUser')
        }
    }
}
</script>

<style scoped>
</style>
