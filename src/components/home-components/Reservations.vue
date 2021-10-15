<template>
    <ReservationForm />

    <h3 class="text-center">Mis reservas</h3>
    <div
        v-for="reservation in reservations"
        :key="reservation.id"
        class="card card-style my-3">
        <div class="content">
            <h3 class="font-600 mb-n1">{{ capitalizeFirstLetter(reservation.room_name) }}</h3>
            <p class="my-2">{{ roomTypeInfo(reservation) }}</p>
            <div class="float-start mb-3 date">
                <p class="font-400 font-13 mb-n1 my-2">
                    <i class="fas fa-calendar"></i>{{ getDate(reservation.start_date) }}
                    <i class="fas fa-clock" style="margin-left: 5px;"></i>{{ getTime(reservation.start_date) }}
                    <i class="fas fa-user-clock" style="margin-left: 5px;"></i>{{ `${duration(reservation)}'` }}
                </p>
            </div>
            <div>
                <button @click="promptConfirmation(reservation.id)"
                        class="float-end btn btn-s rounded-s text-uppercase font-900 bg-red-dark"
                >Cancelar</button>
            </div>
        </div>
    </div>

    <div id="menu-confirm" class="menu menu-box-modal menu-box-detached rounded-m"
         :class="showCancel && 'menu-active'"
         style="display: block; width: 310px; height: 110px;">
        <h3 class="text-center font-700 mt-3 pt-1">¿Deseas cancelar la reserva?</h3>
        <div class="row me-3 ms-3">
            <div class="col-6">
                <button @click="cancel"
                        class="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-green-dark"
                >SÍ</button>
            </div>
            <div class="col-6">
                <button @click="hideCancel"
                        class="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-red-dark"
                >NO</button>
            </div>
        </div>
    </div>

    <div v-if="showCancel" class="menu-hider menu-active"></div>
</template>

<script>
import utils from "@/scripts/utils";
import ReservationForm from "@/components/home-components/ReservationForm";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default {
    name: "Reservations",
    components: {ReservationForm},
    data: () => ({
        showCancel: false,
        cancelId: null
    }),
    computed: {
        reservations() {
            return this.$store.getters.reservations
        },
        roomTypes() {
            return this.$store.getters.roomTypes
        }
    },
    methods: {
        getDate(date) {
            const fullDate = new Date(date.replace(/\s/, 'T'))
            const month = months[fullDate.getMonth()]
            return `${fullDate.getDate()} de ${month}`
        },
        getTime(date) {
            const fullDate = new Date(date.replace(/\s/, 'T'))
            return utils.getTime(fullDate)
        },
        roomTypeInfo(reservation) {
            const roomTypes = this.roomTypes
            if (roomTypes[reservation.room_name] === undefined) return ''
            return roomTypes[reservation.room_name].info
        },
        duration(reservation) {
            const roomTypes = this.roomTypes
            if (roomTypes[reservation.room_name] === undefined) return ''
            return roomTypes[reservation.room_name].duration
        },
        capitalizeFirstLetter(string) {
            return utils.capitalizeFirstLetter(string)
        },
        promptConfirmation(id) {
            this.showCancel = true
            this.cancelId = id
        },
        hideCancel() {
            this.cancelId = null
            this.showCancel = false
        },
        cancel() {
            this.$store.dispatch('cancelReservation', this.cancelId)
                .then(() => this.hideCancel())
        }
    },
    created() {
        if (this.$store.getters.reservations.length === 0) {
            this.$store.dispatch('getReservations')
        }
        if (this.$store.getters.roomTypes.length === 0) {
            this.$store.dispatch('getRoomTypes')
        }
    },
}
</script>

<style scoped>
div.date i {
    margin-right: 3px;
}
button.close-menu {
    width: -webkit-fill-available;
    width: -moz-available;
}
</style>
