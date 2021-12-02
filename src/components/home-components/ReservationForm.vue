<template>
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Gestión de reservas</h3>
            <p>Puedes comprobar las reservas hechas y hacer nuevas.</p>

            <div v-if="!showForm">
                <button
                    @click="showForm = true"
                    class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto my-4"
                >Nueva reserva</button>
            </div>

            <div v-if="showForm">
                <div class="input-style has-borders no-icon mb-4">
                    <label for="room-selector" class="color-highlight">Selecciona una estancia</label>
                    <select v-model="selectedRoom" @change="setHourList" id="room-selector" class="form-control">
                        <option value="default" disabled selected>Selecciona una estancia</option>
                        <option
                            v-for="room in roomTypes"
                            :value="room.name"
                            :key="'room_' + room.name"
                        >{{ room.name }}</option>
                    </select>
                    <span><i class="fa fa-chevron-down"></i></span>
                    <em></em>
                </div>

                <div class="input-style has-borders no-icon mb-4">
                    <label for="startDate" class="color-highlight">Fecha</label>
                    <input v-model="startDate" type="date" @change="setHourList"
                           :min="today" :max="maxDate" class="form-control" id="startDate">
                </div>

                <div v-for="(hourList, i) in hourLists" :key="'list' + i">
                    <div v-if="selectedRoom && startDate"
                        class="input-style has-borders no-icon mb-4">
                        <label for="reservationHours" class="color-highlight">
                            {{ timeRange[i] ? (timeRange[i].name ?? 'Selecciona una hora') : '' }}
                        </label>
                        <select v-model="selectedTime[i]" id="reservationHours" class="form-control">
                            <option value="default" disabled selected>Selecciona una hora</option>
                            <option
                                v-for="(time, j) in hourList"
                                :value="time"
                                :key="'time_' + j"
                            >{{ time }}</option>
                        </select>
                        <span><i class="fa fa-chevron-down"></i></span>
                        <em></em>
                    </div>
                </div>

                <p v-if="error" class="color-red-dark text-center my-2">Debes rellenar todos los campos</p>
                <p v-if="errorDate" class="color-red-dark text-center my-2">La fecha seleccionada debe ser entre hoy y los próximos 7 días. </p>

                <button
                    @click="send"
                    class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto my-4 btn-send"
                >Enviar</button>
            </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
import api from "@/scripts/api";
import utils from "@/scripts/utils";

export default {
    name: "ReservationForm",
    data: () => ({
        showForm: false,
        selectedRoom: 'default',
        startDate: null,
        selectedTime: [],
        hourLists: [],
        error: false,
        errorDate: false
    }),
    computed: {
        roomTypes() {
            return this.$store.getters.roomTypes
        },
        timeRange() {
            if (this.selectedRoom === 'default') return []
            return this.roomTypes[this.selectedRoom].time_range
        },
        today() {
            return utils.getDateFrom(new Date())
        },
        maxDate() {
            const result = new Date()
            result.setDate(result.getDate() + 7)
            return utils.getDateFrom(result)
        }
    },
    watch: {
        timeRange(val, oldVal) {
            this.selectedTime = []
            for (let i = 0; i < val.length; i++) {
                this.selectedTime.push('default')
            }
        }
    },
    methods: {
        send() {
            if(this.startDate < this.today || this.startDate > this.maxDate) {
                this.errorDate = true
            }
            else if(this.selectedRoom !== 'default' && this.validSelectedTime() && this.startDate) {
                this.$store.dispatch('createReservation', this.data()).then(() => {
                    this.showForm = false
                    this.selectedRoom = 'default'
                    this.startDate = null
                    this.selectedTime = []
                    this.error = false
                    this.errorDate = false
                })
            } else {
                this.error = true
            }
        },
        data() {
            return {
                userId: localStorage.getItem('userid'),
                type: this.selectedRoom,
                startDate: this.startDate,
                time: this.selectedTime
            }
        },
        validSelectedTime() {
            return this.selectedTime.some(t => t !== 'default')
        },
        getHourList(string, duration, lastHour) {
            if (this.selectedRoom !== 'default') {
                const hour = utils.addTimeDuration(string, duration)
                if (hour === lastHour) return `${string},${hour}`
                return `${string},${this.getHourList(hour, duration, lastHour)}`
            }
        },
        async getAvailableHourList(string, duration, to) {
            const completeHourList = this.getHourList(string, duration, to).split(',')
            let reservedHours = []
            let availableHourList = []

            if(this.selectedRoom !== 'default' && this.startDate != null) {
                reservedHours = await api.getReservationsOf(this.selectedRoom, this.startDate).then(r => r.data)
            }

            reservedHours = reservedHours.map(x => x.start_date.split(' ')[1].substring(0, 5))
            const unavailableHourList = this.checkIfCapacityFull(reservedHours, this.roomTypes[this.selectedRoom].capacity)

            for (let key in completeHourList) {
                if (!unavailableHourList.includes(completeHourList[key])) availableHourList.push(completeHourList[key])
            }
            return availableHourList
        },
        async setHourList() {
            if (this.selectedRoom !== 'default' && this.startDate != null) {
                this.hourLists = []
                for (let i = 0; i < this.timeRange.length; i++) {
                    const availableHours = await this.getAvailableHourList(this.timeRange[i].from, this.roomTypes[this.selectedRoom].duration, this.timeRange[i].to)
                    this.hourLists.push(availableHours)
                }
            }
        },
        checkIfCapacityFull(unavailableHourList, capacity) {
            const occurrences = utils.countOccurrences(unavailableHourList)
            let notAvailableHourList = []
            for (let time in occurrences) {
                if (occurrences[time] >= capacity) notAvailableHourList.push(time)
            }
            return notAvailableHourList
        }
    },
}

</script>

<style scoped>
label {
    opacity: initial !important;
    left: 4px !important;
    transform: initial !important;
    position: relative !important;
    top: 0 !important;
    height: initial !important;
    font-size: 12px !important;
    transition: initial !important;
    background-color: initial !important;
}
</style>
