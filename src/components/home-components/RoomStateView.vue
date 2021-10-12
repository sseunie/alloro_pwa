<template>
    <div v-if="show" class="card card-style">
        <div class="content mb-4">
            <h3 class="mb-3">Estado inicial de la habitación</h3>

            <div class="input-style has-borders no-icon" style="margin-bottom: 0 !important;">
                <h4>Descripción</h4>
                <p>{{ roomState.text }}</p>
            </div>

            <h4 class="mt-2">Inventario</h4>
            <div
                v-for="(item, i) in roomState.inventory"
                :key="`${i}-${item}`"
                class="form-check icon-check"
            >
                <input type="checkbox"
                       class="form-check-input"
                       :id="`${i}-check`" :checked="item.checked" disabled>
                <label class="form-check-label" :for="`${i}-check`">{{ capitalizeFirstLetter(item.name) }}</label>
                <i class="icon-check-1 far fa-square color-gray-dark font-16"></i>
                <i class="icon-check-2 far fa-check-square font-16 color-highlight"></i>
            </div>
        </div>

        <button
            v-if="hasImages"
            @click="showImages"
            class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto mb-4 btn-send"
        >Ver adjuntos</button>
    </div>
</template>

<script>
export default {
    name: "RoomStateView",
    computed: {
        roomState() {
            return this.$store.getters.user['room_initial_state']
        },
        hasImages() {
            return this.roomState.images.length > 0
        },
        show() {
            return this.roomState != null
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        showImages() {
            console.log(true)
        }
    }
}
</script>

<style scoped>

</style>
