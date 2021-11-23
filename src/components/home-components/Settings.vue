<template>
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
            </div>
        </div>
    </div>
    <Footer />
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
