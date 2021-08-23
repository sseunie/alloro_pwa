<template>
    <LandingPage />
</template>

<script>
import LandingPage from "@/components/LandingPage";

export default {
    name: 'App',
    components: {
        LandingPage,
    }
}
</script>

<style>
#app {
    position: relative;
    min-height: 60vh;
    overflow-x: hidden;
}
</style>
