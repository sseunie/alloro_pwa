<template>
    <div class="row mb-0">
        <div class="col-6 pe-0">
            <a href="tel:928451149">
                <div class="card card-style text-center">
                    <MDBIcon icon="phone" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                    <div class="content pb-0 my-0">
                        <p class="my-3">Teléfono</p>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-6 ps-0">
            <div class="card card-style text-center">
                <a href="mailto:residencias@ric-ulpgc.es">
                    <MDBIcon icon="envelope" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                    <div class="content pb-0 my-0">
                        <p class="my-3">Email</p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <div class="row mb-0">
        <div class="col-6 pe-0">
            <div class="card card-style text-center">
                <a target="_blank" href="https://www.google.es/maps/search/Residencias+Universitarias+ULPGC/@28.0962871,-15.4242679,13.09z">
                    <MDBIcon icon="map-marker-alt" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                    <div class="content pb-0 my-0">
                        <p class="my-3">Ubicación</p>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-6 ps-0">
            <div class="card card-style text-center">
                <a target="_blank" href="https://residenciasuniversitarias.ulpgc.es/">
                    <MDBIcon icon="question-circle" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                    <div class="content pb-0 my-0">
                        <p class="my-3">Conócenos</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { MDBIcon } from 'mdb-vue-ui-kit';

export default {
    name: "ResidencesInformation",
    components: { MDBIcon }
}
</script>

<style scoped>
p {
    color: #1f1f1f;
    font-weight: 600;
    font-size: 13px;
}
</style>
