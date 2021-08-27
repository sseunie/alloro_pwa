<template>
    <div class="page-content">
        <div class="page-title page-title-small" style="padding-bottom: 35px;"></div>
        <div class="card header-card shape-rounded" style="height: 150px;">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
        </div>

        <div class="card card-style">
            <div class="content mb-3">
                <h3 class="font-600">Ajustes de la aplicación</h3>

                <div class="list-group list-custom-small">
                    <div>
                        <span>Notificaciones</span>
                        <div class="custom-control scale-switch ios-switch">
                            <input type="checkbox" class="ios-input" id="switch-1" checked>
                            <label class="custom-control-label" for="switch-1"></label>
                        </div>
                    </div>
                    <div>
                        <span>Newsletter</span>
                        <div class="custom-control scale-switch ios-switch">
                            <input type="checkbox" class="ios-input" id="switch-2">
                            <label class="custom-control-label" for="switch-2"></label>
                        </div>
                    </div>
                    <div class="border-0">
                        <span>Modo noche</span>
                        <div class="ms-auto me-4 pe-2">
                            <div class="custom-control ios-switch scale-switch">
                                <input type="checkbox" class="ios-input" id="toggle-dark12">
                                <label class="custom-control-label" for="toggle-dark12"></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/menus/Footer";
export default {
    name: "Settings",
    components: { Footer }
}
</script>

<style scoped>
div.list-group > div {
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
}

div.list-group > div > span {
    color: #1f1f1f;
    font-weight: 600;
    font-size: 13px;
}
</style>
