<template>
    <div v-if="userNotLogged()" class="pb-5">
        <div class="mt-5 text-center">
            <img src="../assets/alloro.png" class="img-fluid my-5" alt="ALLORO"/>
            <h1 class="fa-3x color-theme font-900">ALLORO</h1>
            <h6 class="font-300 color-highlight">Residencias Universitarias ULPGC</h6>
            <p class="boxed-text-xl font-14"> Bienvenido a ALLORO, el portal de las residencias universitarias donde podrás
                encontrar toda la información que necesites.</p>
            <router-link to="/homepage" class="back-button btn btn-center-m btn-m bg-highlight rounded-sm font-900 text-uppercase scale-box">Entrar</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LandingPage',
    methods: {
        userNotLogged() {
            if (localStorage.getItem('userid') === null) return true
            else this.$router.push('/homepage')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    vertical-align: middle;
    width: 200px;
}
</style>
