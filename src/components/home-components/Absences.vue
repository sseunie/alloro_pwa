<template>
    <AbsencesForm />
    <div
        v-for="absence in absences"
        :key="absence.id"
        class="card card-style my-3">
        <div class="content">
            <div class="float-start mb-3 finish-date">
                <h3 class="font-600 mb-n1">Fecha salida:</h3>
                <h4 class="font-400 font-13 mb-n1 my-3"><i class="far fa-calendar"></i>{{ getDate(absence.start_date) }}</h4>
            </div>
            <div class="float-right mb-3">
                <h3 class="font-600 mb-n1">Fecha vuelta:</h3>
                <h4 class="font-400 font-13 mb-n1 my-3"><i class="far fa-calendar"></i>{{ getDate(absence.finish_date) }}</h4>
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
            const fullDate = new Date(date.replace(/\s/, 'T'))
            const month = months[fullDate.getMonth()]
            return `${fullDate.getDate()} de ${month}, ${fullDate.getFullYear()}.`
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
