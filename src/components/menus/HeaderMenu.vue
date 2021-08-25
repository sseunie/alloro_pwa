<template>
    <div id="header-menu" class="header header-fixed header-active header-logo-app" v-if="$route.path !== '/'">
        <div class="header-title text-start text-white">{{ $route.name }}</div>
        <button
            v-if="$route.path !== '/homepage'"
            @click="routerBack"
            class="header-icon header-icon-1"
        ><i class="fa fa-arrow-left text-white"></i></button>
    </div>
</template>

<script>
export default {
    name: "HeaderMenu",
    methods: {
        routerBack() {
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.header-icon {
    font-size: 16px;
}
#header-menu {
    background-color: #4A89DC;
}
</style>
