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
            <p>{{ reservation.observations }}</p>
        </div>
    </div>
</template>

<script>
import utils from "@/scripts/utils";
import ReservationForm from "@/components/home-components/ReservationForm";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default {
    name: "Reservations",
    components: {ReservationForm},
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
</style>
