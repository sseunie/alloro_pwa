<template v-if="$route.path !== '/'">
    <div class="page-title page-title-small" style="padding-bottom: 35px;"></div>
    <div
        class="card header-card shape-rounded"
        style="height: 150px;"
        v-if="showHeaderSpace($route.name)"
    >
        <div class="card-overlay bg-highlight opacity-95"></div>
        <div class="card-overlay dark-mode-tint"></div>
    </div>
</template>

<script>

export default {
    name: "HeaderSpace",
    methods: {
        showHeaderSpace(path) {
            const pathsWithoutHeader = ['Landing', 'Mensajes de la incidencia', 'Mensajes', 'Avisos']
            return !pathsWithoutHeader.includes(path)
        },
    }
}
</script>

<style scoped>

</style>
