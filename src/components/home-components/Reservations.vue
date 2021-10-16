<template>
    <ReservationForm />
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Ver mis reservas</h3>
            <p>Puedes ver tus reservas futuras seleccionando una estancia:</p>
            <div class="row row-cols-2 mx-0">
                <template
                    v-for="type in roomTypes"
                    :key="type.name"
                >
                    <router-link :to="`/reservations/${type.name}`"
                                 class="btn rounded-s text-uppercase font-900 bg-highlight col type-btn"
                    >{{ type.name }}</router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import ReservationForm from "@/components/home-components/ReservationForm";

export default {
    name: "Reservations",
    components: {ReservationForm},
    computed: {
        roomTypes() {
            return this.$store.getters.roomTypes
        }
    },
    created() {
        if (this.$store.getters.roomTypes.length === 0) {
            this.$store.dispatch('getRoomTypes')
        }
    },
}
</script>

<style scoped>
.type-btn {
    margin-bottom: 2.5%;
    margin-right: 2.5% !important;
    margin-left: 2.5% !important;
    width: 45%;
}
</style>
