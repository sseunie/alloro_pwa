<template>
    <div class="page-content">
        <div class="page-title page-title-small">
            <h2><button @click="routerBack" class="back-button"><i class="fa fa-arrow-left"></i></button>Error 404</h2>
        </div>
        <div class="card header-card shape-rounded" style="height: 150px;">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
        </div>

        <div class="card card-style text-center">
            <div class="content pt-4 pb-4">
                <h1><i class="fa fa-exclamation-triangle color-red-dark fa-5x"></i></h1>
                <h1 class="fa-6x pt-5 pb-2">404</h1>
                <h3 class="text-uppercase pb-3">Page not Found</h3>
                <p class="boxed-text-l">
                    La página que buscas no existe.
                </p>
                <div class="row">
                    <router-link to="/homepage" class="back-button btn btn-m btn-center-m bg-highlight font-800 text-uppercase">Inicio</router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "PageNotFound",
    methods: {
        routerBack() {
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.back-button {
    padding-right: 20px;
}
</style>
