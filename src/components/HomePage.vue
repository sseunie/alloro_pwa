<template>
    <router-link to="/incidences" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">Incidencias</h4>
                <p class="color-highlight mt-n1 font-11">
                    Gestión de incidencias
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <MDBIcon icon="exclamation-triangle" iconStyle="fas" size="3x" style="color: #FF5252;" />
            </div>
        </div>
    </router-link>

    <router-link to="/absences" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">Ausencias</h4>
                <p class="color-highlight mt-n1 font-11">
                    Gestión de ausencias
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <MDBIcon icon="calendar-times" iconStyle="fas" size="3x" style="color: #82B1FF;" />
            </div>
        </div>
    </router-link>

    <router-link to="/services" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">Servicios</h4>
                <p class="color-highlight mt-n1 font-11">
                    Servicios de la ULPGC
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <MDBIcon icon="box" iconStyle="fas" size="3x" style="color: #93F1AD;" />
            </div>
        </div>
    </router-link>

    <router-link to="/info" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">Información</h4>
                <p class="color-highlight mt-n1 font-11">
                    Información sobre la App
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <MDBIcon icon="info-circle" iconStyle="fas" size="3x" style="color: #FFE57F;" />
            </div>
        </div>
    </router-link>

    <router-link to="/settings" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">Ajustes</h4>
                <p class="color-highlight mt-n1 font-11">
                    Preferencias de la aplicación
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <MDBIcon icon="cog" iconStyle="fas" size="3x" style="color: #B388FF;" />
            </div>
        </div>
    </router-link>

    <Footer />
</template>

<script>
import { MDBIcon } from 'mdb-vue-ui-kit';
import Footer from "@/components/menus/Footer";

export default {
    name: "HomePage",
    components: { Footer, MDBIcon }
}
</script>

<style scoped>
</style>
