<template>
    <div class="card card-style" @keypress.enter="login">
        <div class="content mt-2 mb-0">
            <p v-if="error" class="color-red-dark text-center my-2">{{ error }}</p>

            <div class="input-style no-borders has-icon validate-field mb-4">
                <i class="fa fa-user"></i>
                <input type="text" v-model="username" class="form-control" id="username" placeholder="Nombre">
                <label for="username" class="color-blue-dark font-10 mt-1">Nombre</label>
            </div>

            <div class="input-style no-borders has-icon validate-field mb-4">
                <i class="fa fa-lock"></i>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="Contraseña">
                <label for="password" class="color-blue-dark font-10 mt-1">Contraseña</label>
            </div>

            <button
                @click="login"
                id="login-button"
                class="btn btn-m mt-2 mb-4 btn-full bg-green-dark rounded-sm text-uppercase font-900"
            >Iniciar sesión</button>

            <div class="divider mt-4 mb-3"></div>

            <div class="w-50 font-11 pb-2 color-theme pb-3 mx-2">
                <button class="color-highlight opacity-80 font-12">Recordar contraseña</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/scripts/api";

export default {
    name: "Login",
    data: () => ({
        username: '',
        password: '',
        error: null
    }),
    methods: {
        login() {
            api.login(this.username, this.password)
                .then(r => {
                    localStorage.setItem('token', r.data.token);
                    localStorage.setItem('userid', r.data.id);
                    this.$store.dispatch('getInbox')
                    if (this.$route.params.nextRoute === undefined) {
                        this.$router.push('/homepage');
                    } else {
                        this.$router.push(this.$route.params.nextRoute);
                    }
                })
                .catch(e => {
                    if (e.response === undefined) this.error = 'No se puede conectar con el servidor';
                    else if (e.response.status === 400) {
                        this.error = e.response.data.message;
                    } else {
                        this.error = 'Se ha producido un error';
                    }
                })
        }
    }
}
</script>

<style scoped>
#login-button {
    width: -webkit-fill-available;
    width: -moz-available;
}
</style>
