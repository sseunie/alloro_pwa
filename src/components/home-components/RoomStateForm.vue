<template>
    <template v-if="show">
        <div v-if="dateNotValid(new Date(roomStateFinishDate)) && !roomStateSent" class="card card-style">
            <div class="content mb-0">
                <h3>Estado inicial de la habitación</h3>
                <p class="mb-3">Ha terminado el plazo para rellenar el estado inicial de la habitación. </p>
            </div>
        </div>

        <div v-else-if="!roomStateSent"
             class="card card-style">
            <div class="content mb-0">
                <h3>Estado inicial de la habitación</h3>
                <p class="mb-3">
                    Indica todos los defectos que identifiques en tu habitación y utiliza imágenes para ilustrarlos.
                </p>

                <div class="input-style has-borders no-icon" style="margin-bottom: 0 !important;">
                <textarea id="roomState-text"
                          v-model="text"
                          placeholder="Escribe aquí tu mensaje..."></textarea>
                    <label for="roomState-text" class="color-highlight">Descripción</label>
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

            <p class="text-center mb-3">
                Fecha límite para rellenar el formulario:
            </p>
            <p class="mb-3 mt-n3 text-center font-14 color-red-light">
                <i class="far fa-calendar"></i>{{getDate(roomStateFinishDate)}}
            </p>
        </div>

        <div
            id="menu-success-1"
            class="menu menu-box-modal rounded-m"
            :class="success && 'menu-active'"
            style="display: block; width: 310px; height: 320px;"
        >
            <h1 class="text-center mt-3 pt-1"><i class="fa fa-3x fa-check-circle color-green-dark shadow-xl rounded-circle"></i></h1>
            <h1 class="text-center mt-3 font-700">Estado inicial enviado</h1>
            <p class="boxed-text-l">
                El formulario se ha enviado correctamente.<br>Puedes ver el estado inicial de tu habitación desde el menú de inicio.
            </p>
            <button
                @click="redirect"
                class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light"
            >OK</button>
        </div>

        <div v-if="success" class="menu-hider menu-active"></div>

        <div id="menu-confirm" class="menu menu-box-modal menu-box-detached rounded-m"
             :class="showConfirmation && 'menu-active'"
             style="display: block; width: 310px; height: 110px;">
            <h3 class="text-center font-700 my-3 pt-1">No has seleccionado nada en el inventario, ¿seguro que quieres continuar?</h3>
            <div class="row me-3 ms-3">
                <div class="col-6">
                    <button @click="send(false)"
                            class="cancel-menu close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-green-dark"
                    >SÍ</button>
                </div>
                <div class="col-6">
                    <button @click="toggleCancelMenu"
                            class="cancel-menu close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-red-dark"
                    >CANCELAR</button>
                </div>
            </div>
        </div>

        <div v-if="showConfirmation" class="menu-hider menu-active"></div>
    </template>
</template>

<script>
import utils from "@/scripts/utils";


const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default {
    name: "RoomStateForm",
    data: () => ({
        text: '',
        checkedInventory: [],
        success: false,
        error: null,
        showConfirmation: false
    }),
    computed: {
        inventory() {
            return this.$store.getters.roomInventory
        },
        roomStateSent() {
            return this.$store.getters.user['room_initial_state'] != null
        },
        roomStateFinishDate() {
            return this.$store.getters.roomStateFinishDate
        },
        show() {
            return this.roomStateFinishDate.length > 0
        }
    },
    methods: {
        send(checkInventory=true) {
            if(this.text.trim().length === 0) {
                this.error = 'Debes rellenar el formulario'
            } else if (checkInventory && this.checkedInventory.length === 0) {
                this.showConfirmation = true
            } else {
                this.$store.dispatch('setRoomState', {
                    text: this.text,
                    inventory: this.inventory,
                    checked: this.checkedInventory,
                    images: this.$refs.images.files
                }).then(() => {
                    this.success = true
                    this.showConfirmation = false
                }).catch(e => {
                    this.error = e.response.data.message
                })
            }
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        redirect() {
            this.success = false
        },
        toggleCancelMenu() {
            this.showConfirmation = false
            this.error = null
        },
        dateNotValid(date) {
            const today = new Date()
            return today > date
        },
        date(date) {
            return utils.getDateFrom(date)
        },
        getDate(date) {
            const fullDate = new Date(date.replace(/\s/, 'T'))
            const month = months[fullDate.getMonth()]
            return `${fullDate.getDate()} de ${month}`
        },
    },
    created() {
        if (this.$store.getters.roomInventory.length === 0) {
            this.$store.dispatch('getRoomInventory')
        }
        if (this.$store.getters.roomStateFinishDate.length === 0) {
            this.$store.dispatch('getRoomStateFinishDate')
        }
    },
}
</script>

<style scoped>
.icon-check label {
    font-size: 13px;
    padding: 2px 10px 0px 35px;
}
#menu-confirm {
    width: 90% !important;
    height: 20% !important;
}

.cancel-menu {
    width: 100% !important;
}
i {
    margin-right: 3px;
}
</style>
