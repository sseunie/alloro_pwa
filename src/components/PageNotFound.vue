<template>
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
</template>

<script>
export default {
    name: "PageNotFound"
}
</script>

<style scoped>
</style>
