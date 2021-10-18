<template>
    <header-menu />
    <div class="page-content">
        <HeaderSpace />
        <router-view />
    </div>
    <footer-menu v-if="$route.path !== '/login'"/>

    <div id="menu-confirm" class="menu menu-box-modal menu-box-detached rounded-m"
         :class="deferredPrompt && 'menu-active'"
         style="display: block; width: 310px; height: 110px;">
        <h4 class="text-center font-700 mt-3 pt-1">¿Quieres instalar la aplicación?</h4>
        <div class="row me-3 ms-3">
            <div class="col-6">
                <button @click="install"
                        class="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-green-dark"
                >Instalar</button>
            </div>
            <div class="col-6">
                <button @click="dismiss"
                        class="close-menu btn btn-sm btn-full button-s shadow-l rounded-s text-uppercase font-900 bg-red-dark"
                >Cancelar</button>
            </div>
        </div>
    </div>

    <div v-if="deferredPrompt" class="menu-hider menu-active"></div>
</template>

<script>
import FooterMenu from "@/components/menus/FooterMenu";
import HeaderMenu from "@/components/menus/HeaderMenu";
import HeaderSpace from "@/components/menus/HeaderSpace";

export default {
    name: 'App',
    components: {HeaderSpace, HeaderMenu, FooterMenu },
    data: () => ({
        deferredPrompt: null,
        show: true
    }),
    created() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault()
            if (this.show) {
                this.deferredPrompt = e;
            }
        });
        window.addEventListener("appinstalled", () => {
            this.deferredPrompt = null
        });
    },
    methods: {
        async dismiss() {
            this.show = false
            this.deferredPrompt = null
        },
        async install() {
            this.deferredPrompt.prompt()
        }
    }
}
</script>

<style>
#app {
    position: relative;
    min-height: 60vh;
    overflow-x: hidden;
}
</style>
