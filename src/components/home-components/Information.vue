<template>
    <div class="page-content">
        <div class="page-title page-title-small" style="padding-bottom: 35px;"></div>
        <div class="card header-card shape-rounded" style="height: 150px;">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
        </div>

        <div class="card card-style">
            <div class="content text-center">
                <h2>Desarrollado por:</h2>
            </div>
            <div class="divider divider-small mb-3 bg-highlight"></div>

            <div class="content">
                <a href="https://ric.ulpgc.es/" target="_blank">
                    <div class="d-flex mb-4 pb-3 px-2">
                        <img src="../../assets/RIC.png" alt="ULPGC RIC" class="img-fluid">
                    </div>
                </a>
                <a href="http://iuctc.ciber.ulpgc.es/" target="_blank">
                    <div class="d-flex mb-4 pb-3 px-2">
                        <img src="../../assets/IUCTC.png" alt="ULPGC IUCTC" class="img-fluid">
                    </div>
                </a>
            </div>
        </div>

        <a
            href="https://ric.ulpgc.es/aviso-legal/" target="_blank"
            class="btn btn-m my-3 btn-full bg-highlight rounded-sm text-uppercase font-900 terms-of-use"
        >Condiciones de uso</a>
    </div>
</template>

<script>
export default {
    name: "Information"
}
</script>

<style scoped>
    a.terms-of-use {
        margin-left: 15px;
        margin-right: 15px;
    }
</style>
