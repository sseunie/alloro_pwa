<template>
    <router-view />
    <footer-menu />
</template>

<script>
import FooterMenu from "@/components/menus/FooterMenu";

export default {
    name: 'App',
    components: { FooterMenu }
}
</script>

<style>
#app {
    position: relative;
    min-height: 60vh;
    overflow-x: hidden;
}
</style>
