<template>
    <div id="footer-bar" class="footer-bar-4" v-if="$route.path !== '/'">
        <router-link to="/notifications"><i class="fas fa-bell"></i></router-link>
        <router-link to="/messages"><i class="fas fa-comment"></i></router-link>
        <router-link to="/homepage"><i class="fa fa-home"></i></router-link>
        <router-link to="/profile"><i class="fas fa-user-circle"></i></router-link>
    </div>
</template>

<script>
export default {
    name: "FooterMenu"
}
</script>

<style scoped>
</style>
