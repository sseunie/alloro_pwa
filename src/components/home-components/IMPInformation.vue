<template>
    <div class="page-content">
        <div class="page-title page-title-small" style="padding-bottom: 35px;"></div>
        <div class="card header-card shape-rounded" style="height: 150px;">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
        </div>


        <div class="row mb-0">

            <div class="col-6 pe-0">
                <a href="tel:928451056">
                    <div class="card card-style text-center">
                        <MDBIcon icon="phone" class="mt-3" iconStyle="fas" size="3x" style="color: #4a89dc;" />
                        <div class="content pb-0 my-0">
                            <p class="my-3">Teléfono</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-6 ps-0">
                <a href="mailto:imp@ric-ulpgc.es">
                    <div class="card card-style text-center">
                        <MDBIcon icon="envelope" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                        <div class="content pb-0 my-0">
                            <p class="my-3">Email</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>

        <div class="row mb-0">
            <div class="col-6 pe-0">
                <a target="_blank" href="https://goo.gl/maps/TBZS2cfKTvgjDqBPA">
                    <div class="card card-style text-center">
                        <MDBIcon icon="map-marker-alt" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                        <div class="content pb-0 my-0">
                            <p class="my-3">Ubicación</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-6 ps-0">
                <a target="_blank" href="https://imp.ulpgc.es/">
                    <div class="card card-style text-center">
                        <MDBIcon icon="question-circle" class="mt-3" iconStyle="fas" size="3x" style="color: #4A89DC;" />
                        <div class="content pb-0 my-0">
                            <p class="my-3">Conócenos</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { MDBIcon } from 'mdb-vue-ui-kit';

export default {
    name: "IMPInformation",
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
