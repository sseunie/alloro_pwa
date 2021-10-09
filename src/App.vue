<template>
    <header-menu />
    <div class="page-content">
        <HeaderSpace />
        <router-view />
    </div>
    <footer-menu v-if="$route.path !== '/login'"/>
</template>

<script>
import FooterMenu from "@/components/menus/FooterMenu";
import HeaderMenu from "@/components/menus/HeaderMenu";
import HeaderSpace from "@/components/menus/HeaderSpace";

export default {
    name: 'App',
    components: {HeaderSpace, HeaderMenu, FooterMenu }
}
</script>

<style>
#app {
    position: relative;
    min-height: 60vh;
    overflow-x: hidden;
}
</style>
