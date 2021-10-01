<template>
    <div class="page-title page-title-small" style="padding-bottom: 35px;" v-if="$route.path !== '/'"></div>
    <div
        class="card header-card shape-rounded"
        style="height: 150px;"
        v-if="$route.path !== '/' && $route.name !== 'Mensajes de la incidencia' && $route.path !== '/notifications'
                && $route.path !== '/messages'"
    >
        <div class="card-overlay bg-highlight opacity-95"></div>
        <div class="card-overlay dark-mode-tint"></div>
    </div>
</template>

<script>
export default {
name: "HeaderSpace"
}
</script>

<style scoped>

</style>
