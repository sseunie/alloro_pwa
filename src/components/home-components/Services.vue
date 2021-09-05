<template>
    <router-link to="/services/residences" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">Residencias</h4>
                <p class="color-highlight mt-n1 font-11">
                    Información sobre las residencias universitarias
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <img class="img-fluid icon-image" src="../../assets/RIC-logo.png">
            </div>
        </div>
    </router-link>

    <router-link to="/services/imp" class="card card-style mb-3 d-flex" style="height: 100px;">
        <div class="d-flex justify-content-between">
            <div class="ps-3 ms-1 align-self-center">
                <h4 class="font-600 mb-0 pt-4 mt-1">IMP</h4>
                <p class="color-highlight mt-n1 font-11">
                    International Mobility Point
                </p>
            </div>
            <div class="pe-3 align-self-center">
                <img class="img-fluid icon-image" src="../../assets/IMP-logo.png">
            </div>
        </div>
    </router-link>

    <Footer />
</template>

<script>
export default {
name: "Services"
}
</script>

<style scoped>
img.icon-image {
    border: solid #4A89DC 2px;
    border-radius: 50%;
    width: 60px;
}
</style>
