<template>
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Mis reservas de {{this.$route.params.type}}</h3>
            <p class="mb-2">Puedes ver las reservas futuras que tengas para {{this.$route.params.type}}.</p>
            <p class="color-highlight mb-1">Filtrar por fecha: </p>
            <div class="input-style has-borders no-icon mb-4">
                <label for="selectedDate" class="color-highlight">Filtrar por fecha: </label>
                <input v-model="selectedDate" type="date"
                       :min="today" class="form-control" id="selectedDate">
            </div>
        </div>
    </div>
    <p v-if="selectedDate"
       class="mt-4 mb-1 color-highlight text-center" style="font-size: 15px;"
       @click="removeFilter"
    >Quitar filtro</p>
    <div
        v-for="reservation in reservations"
        :key="reservation.id"
        class="card card-style mb-2">
        <div v-if="show"
            class="content">
            <h3 class="font-600 mb-n1">{{ capitalizeFirstLetter(reservation.room_name) }}</h3>
            <p class="my-2">{{ roomTypeInfo(reservation, 'info') }}</p>
            <div class="float-start mb-3 date">
                <p class="font-400 font-13 mb-n1 my-2">
                    <i class="fas fa-calendar"></i>{{ getDate(reservation.start_date) }}
                    <i class="fas fa-clock" style="margin-left: 5px;"></i>{{ getTime(reservation.start_date) }}
                    <i class="fas fa-user-clock" style="margin-left: 5px;"></i>{{ roomTypeInfo(reservation, 'duration') }}'
                </p>
            </div>
            <div>
                <button @click="toggleCancelMenu(reservation.id)"
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
                <button @click="toggleCancelMenu"
                        class="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-red-dark"
                >NO</button>
            </div>
        </div>
    </div>

    <div v-if="showCancel" class="menu-hider menu-active"></div>
</template>

<script>
import utils from "@/scripts/utils";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default {
    name: "ReservationsType",
    data: () => ({
        showCancel: false,
        selectedDate: null,
        cancelId: null,
        show: false
    }),
    computed: {
        reservations() {
            if (this.selectedDate) {
                const selected = new Date(this.selectedDate)
                return this.$store.getters.reservationsForType
                    .filter(e => utils.getDateFrom(new Date(e.start_date)) === utils.getDateFrom(selected))
            }
            return this.$store.getters.reservationsForType
        },
        roomTypes() {
            return this.$store.getters.roomTypes
        },
        today() {
            return utils.getDateFrom(new Date())
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
        roomTypeInfo(reservation, field) {
            if (this.roomTypes.length === 0) return ''
            return this.roomTypes[reservation.room_name][field]
        },
        capitalizeFirstLetter(string) {
            return utils.capitalizeFirstLetter(string)
        },
        toggleCancelMenu(id=null) {
            this.showCancel = !this.showCancel
            this.cancelId = id
        },
        cancel() {
            this.$store.dispatch('cancelReservation', this.cancelId)
                .then(() => this.toggleCancelMenu())
        },
        removeFilter() {
            this.selectedDate = null
        }
    },
    created() {
        this.$store.dispatch('getReservationsForType', {
            type: this.$route.params.type,
            userId: localStorage.getItem('userid')
        }).then(() => this.show = true)
        if(this.roomTypes.length === 0) {
            this.$store.dispatch('getRoomTypes')
        }
    },
}
</script>

<style scoped>
i {
    margin-right: 2px;
}
input {
    width: 60% !important;
    height: 40px !important;
}
button.close-menu {
    width: -webkit-fill-available;
    width: -moz-available;
}
</style>
