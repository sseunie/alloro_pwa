<template>
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Gestión de reservas</h3>
            <p>Puedes comprobar las reservas hechas y hacer nuevas.</p>

            <div v-if="!showForm">
                <button
                    @click="showForm = true"
                    class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto my-4 btn-send"
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
                    <label for="startDate" class="color-highlight">Salida</label>
                    <input v-model="startDate" type="date" @change="setHourList"
                           :min="today" :max="maxDate" class="form-control" id="startDate">
                </div>

                <div v-for="(hourList, i) in hourLists" :key="'list' + i">
                    <div class="input-style has-borders no-icon mb-4">
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

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

function add(string, duration) {
    const dHours = Math.trunc(duration/60)
    const dMin = duration % 60

    const initial = string.split(':')
    const hours = parseInt(initial[0]) + dHours
    const minutes = parseInt(initial[1]) + dMin

    if (minutes === 60) {
        return `${hours+1}:00`
    }
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

export default {
    name: "ReservationForm",
    data: () => ({
        showForm: false,
        selectedRoom: 'default',
        startDate: null,
        selectedTime: [],
        hourLists: []
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
            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
        },
        maxDate() {
            const result = new Date()
            result.setDate(result.getDate() + 7)
            const year = result.getFullYear()
            const month = result.getMonth() + 1
            const day = result.getDate()

            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
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
            this.$store.dispatch('createReservation', {
                userId: localStorage.getItem('userid'),
                type: this.selectedRoom,
                startDate: this.startDate,
                time: this.selectedTime
            }).then(() => {
                this.showForm = false
                this.selectedRoom = 'default'
                this.startDate = null
            })
        },
        getHourList(string, duration, index) {
            if (this.selectedRoom !== 'default') {
                const hour = add(string, duration)
                if (hour === this.timeRange[index].to) return `${string},${hour}`
                return `${string},${this.getHourList(hour, duration, index)}`
            }
        },
        async getAvailableHourList(string, duration, index) {
            const completeList = this.getHourList(string, duration, index).split(',')

            let reservationDates = []
            if(this.selectedRoom !== 'default' && this.startDate != null) {
                reservationDates = await api.getReservationsOf(this.selectedRoom, this.startDate).then(r => r.data)
            }

            let notAvailableHourList = []
            for (let i = 0; i < reservationDates.length; i++) {
                let time = reservationDates[i].start_date.split(' ')[1].substring(0, 5)
                notAvailableHourList.push(time)
            }

            let availableHourList = []
            for (let i = 0; i < completeList.length; i++) {
                if (!notAvailableHourList.includes(completeList[i])) availableHourList.push(completeList[i])
            }

            return availableHourList
        },
        async setHourList() {
            if (this.selectedRoom !== 'default' && this.startDate != null) {
                this.hourLists = []
                for (let i = 0; i < this.timeRange.length; i++) {
                    const times = await this.getAvailableHourList(this.timeRange[i].from, this.roomTypes[this.selectedRoom].duration, i)
                    this.hourLists.push(times)
                }
            }
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
