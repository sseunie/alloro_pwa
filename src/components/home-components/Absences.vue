<template>
    <AbsencesForm />
    <div
        v-for="absence in absences.sort(compareDates)"
        :key="absence.id"
        class="card card-style my-3">
        <div class="content">
            <div class="float-start mb-3 fecha-salida">
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
import api from "@/scripts/api";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default {
    name: "Absences",
    components: {AbsencesForm},
    data: () => ({
        absences: [],
        dateStart: '',
        dateFinish: '',
    }),
    created() {
        api.getAbsences().then(r => {
            this.absences = r.data
        })
    },
    methods: {
        getDate(date) {
            const fullDate = new Date(date)
            console.log(fullDate)
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
.fecha-salida {
    margin-right: 20px !important;
}

i {
    margin-right: 5px;
}
</style>
