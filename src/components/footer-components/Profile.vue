<template>
    <div class="card card-style">
        <div class="content">
            <div>
                <h1 class="mb-0 pt-1">{{ user.name }}</h1>
                <p class="color-highlight font-11 mt-n1 mb-1">{{ user.buildingName }}</p>
            </div>
        </div>
    </div>

    <div id="user-data" class="card card-style">
        <div class="content mb-0">
            <h3 class="font-600 mb-4">Mis datos</h3>

            <div class="input-style has-borders hnoas-icon input-style-always-active mb-4">
                <input type="text" class="form-control" id="name" disabled :value="user.name">
                <label for="name" class="color-highlight font-400 font-13">Nombre</label>
                <i class="fa fa-times disabled invalid color-red-dark"></i>
                <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>

            <div class="input-style has-borders hnoas-icon input-style-always-active mb-4">
                <input type="text" class="form-control" id="surnames" disabled :value="userSurname">
                <label for="surnames" class="color-highlight font-400 font-13">Apellidos</label>
                <i class="fa fa-times disabled invalid color-red-dark"></i>
                <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>

            <div class="input-style has-borders hnoas-icon input-style-always-active mb-4">
                <input type="text" class="form-control" id="building" disabled :value="user.buildingName">
                <label for="building" class="color-highlight font-400 font-13">Edificio</label>
                <i class="fa fa-times disabled invalid color-red-dark"></i>
                <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>

            <div class="input-style has-borders hnoas-icon input-style-always-active mb-4">
                <input type="text" class="form-control" id="room" disabled :value="user.room">
                <label for="room" class="color-highlight font-400 font-13">Habitación</label>
                <i class="fa fa-times disabled invalid color-red-dark"></i>
                <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>

            <div class="input-style has-borders hnoas-icon input-style-always-active mb-4">
                <input type="text" class="form-control" id="phone" v-model="phoneNumber">
                <label for="phone" class="color-highlight font-400 font-13">Teléfono</label>
                <i class="fa fa-times disabled invalid color-red-dark"></i>
                <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>

            <div class="input-style has-borders no-icon input-style-always-active mb-4">
                <input type="email" class="form-control" id="email" v-model="email">
                <label for="email" class="color-highlight font-400 font-13">Email</label>
                <i class="fa fa-times disabled invalid color-red-dark"></i>
                <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>

            <p v-if="success" class="color-grass-dark text-center my-3">Se han actualizado los datos correctamente</p>
            <button
                @click="updateUserData"
                class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto mt-2 mb-4"
            >Guardar cambios</button>
        </div>
    </div>

    <button
        @click="logout"
        id="logout"
        class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mb-2"
    >Cerrar sesión</button>
</template>

<script>
import api from "@/scripts/api";

export default {
    name: "Profile",
    data: () => ({
        user: [],
        phoneNumber: '',
        email: '',
        success: false
    }),
    computed: {
        userSurname() {
            return `${this.user.surname1} ${this.user.surname2}`;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            this.$router.push('/homepage');
            this.$store.dispatch('clearIncidences');
            this.$store.dispatch('clearAbsences');
        },
        updateUserData() {
            api.updateUser(this.user.id, {
                phoneNumber: this.phoneNumber,
                email: this.email
            }).then(() => {
                this.success = true;
            }).catch(e => {
                if (e.response.status === 401) {
                    this.$router.push('/login');
                }
            });
        }
    },
    created() {
        api.getUser(localStorage.getItem('userid')).then(r => {
            this.user = r.data;
            this.phoneNumber = this.user.phoneNumber;
            this.email = this.user.email;
        }).catch(e => {
            if (e.response.status === 401) {
                this.$router.push('/login');
            }
        });
    }
}
</script>

<style scoped>
input:disabled {
    background-color: initial;
}

.card-style {
    margin-bottom: 25px;
}

#logout {
    width: -webkit-fill-available;
    width: -moz-available;
}
</style>
