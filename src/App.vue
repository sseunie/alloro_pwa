<template>
    <header-menu />
    <router-view />
    <footer-menu />
</template>

<script>
import FooterMenu from "@/components/menus/FooterMenu";
import HeaderMenu from "@/components/menus/HeaderMenu";

export default {
    name: 'App',
    components: { HeaderMenu, FooterMenu }
}
</script>

<style>
#app {
    position: relative;
    min-height: 60vh;
    overflow-x: hidden;
}
</style>
