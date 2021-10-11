<template>
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Estado inicial de la habitación</h3>
            <p class="mb-3">
                Indica todos los defectos que identifiques en tu habitación y utiliza imágenes para ilustrarlo.
            </p>

            <div class="input-style has-borders no-icon" style="margin-bottom: 0 !important;">
                <textarea id="roomState-text"
                          v-model="text"
                          placeholder="Escribe aquí tu mensaje..."></textarea>
                <label for="roomState-text" class="color-highlight">Cuerpo</label>
            </div>

            <div class="has-borders no-icon my-3">
                <label for="incidence-image" class="color-highlight mx-1">Imágenes</label>
                <input
                    type="file" class="form-control" id="incidence-image"
                    accept="image/*" multiple
                    ref="images"
                >
            </div>

            <h4 class="mt-2">Inventario</h4>
            <p class="mb-2">
                Revisa que tu habitación cuenta con el inventario básico.
            </p>

            <div
                v-for="(thing, i) in inventory"
                :key="`${i}-${thing}`"
                class="form-check icon-check"
            >
                <input type="checkbox" :value="thing"
                       v-model="checkedInventory" class="form-check-input"
                       :id="`${i}-check`">
                <label class="form-check-label" :for="`${i}-check`">{{ capitalizeFirstLetter(thing) }}</label>
                <i class="icon-check-1 far fa-square color-gray-dark font-16"></i>
                <i class="icon-check-2 far fa-check-square font-16 color-highlight"></i>
            </div>
        </div>

        <p v-if="error" class="color-red-dark text-center my-2">{{ error }}</p>

        <button
            @click="send"
            class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto mb-4 btn-send"
        >Enviar</button>
    </div>

    <div
        id="menu-success-1"
        class="menu menu-box-modal rounded-m"
        :class="success && 'menu-active'"
        style="display: block; width: 310px; height: 320px;"
    >
        <h1 class="text-center mt-3 pt-1"><i class="fa fa-3x fa-check-circle color-green-dark shadow-xl rounded-circle"></i></h1>
        <h1 class="text-center mt-3 font-700">Incidencia enviada</h1>
        <p class="boxed-text-l">
            La incidencia ha sido enviada correctamente.<br>Puedes ver el progreso de las incidencias en tus mensajes.
        </p>
        <router-link
            to="/homepage"
            class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light"
        >OK</router-link>
    </div>

    <div v-if="success" class="menu-hider menu-active"></div>
</template>

<script>
export default {
    name: "RoomState",
    data: () => ({
        text: '',
        checkedInventory: [],
        success: false,
        error: null
    }),
    computed: {
        inventory() {
            return this.$store.getters.roomInventory
        }
    },
    created() {
        if (this.$store.getters.roomInventory.length === 0) {
            this.$store.dispatch('getRoomInventory')
        }
    },
    methods: {
        send() {
            if (this.text.trim().length === 0) {
                this.error = 'Debes rellenar el formulario'
            } else {
                this.$store.dispatch('setRoomState', {
                    text: this.text,
                    inventory: this.inventory,
                    checked: this.checkedInventory,
                    images: this.$refs.images.files
                }).then(() => {
                    this.success = true
                }).catch(e => {
                    this.error = e.response.data.message
                })
            }
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
    }
}
</script>

<style scoped>
.icon-check label {
    font-size: 13px;
    padding: 2px 10px 0px 35px;
}
</style>
