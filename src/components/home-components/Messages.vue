<template>
    {{ incidences }}
</template>

<script>
export default {
    name: "Messages",
    computed: {
        incidences() {
            return this.$store.getters.incidences
        }
    },
    created() {
        if (this.$store.getters.incidences.length === 0) {
            this.$store.dispatch('getIncidences')
        }
    }
}
</script>

<style scoped>

</style>
