<template>
    <AbsencesForm />
    <div
        v-for="absence in absences.sort(compareDates)"
        :key="absence.id"
        class="card card-style my-3">
        <div class="content">
            <div class="float-start mb-3 finish-date">
                <h3 class="font-600 mb-n1">Fecha salida:</h3>
                <h4 class="font-400 font-13 mb-n1 my-3"><i class="far fa-calendar"></i>{{ getDate(absence.startDate) }}</h4>
            </div>
            <div class="float-right mb-3">
                <h3 class="font-600 mb-n1">Fecha vuelta:</h3>
                <h4 class="font-400 font-13 mb-n1 my-3"><i class="far fa-calendar"></i>{{ getDate(absence.finishDate) }}</h4>
            </div>
            <p>{{ absence.observations }}</p>
        </div>
    </div>
</template>

<script>

import AbsencesForm from "@/components/home-components/AbsencesForm";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default {
    name: "Absences",
    components: {AbsencesForm},
    data: () => ({
        dateStart: '',
        dateFinish: '',
    }),
    computed: {
        absences() {
            return this.$store.getters.absences
        }
    },
    created() {
        if (this.$store.getters.absences.length === 0) {
            this.$store.dispatch('getAbsences')
        }
    },
    methods: {
        getDate(date) {
            const fullDate = new Date(date)
            const month = months[fullDate.getMonth()]
            return `${fullDate.getDate()} de ${month}, ${fullDate.getFullYear()}.`
        },

        compareDates(a, b) {
            if ( a.createdDate > b.createdDate ){
                return -1
            }
            if ( a.createdDate < b.createdDate ){
                return 1
            }
            return 0
        }
    }
}
</script>

<style scoped>
.finish-date {
    margin-right: 20px !important;
}

i {
    margin-right: 5px;
}
</style>
