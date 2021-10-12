<template>
    <div class="card card-style">
        <div class="content mb-3">
            <div class="images-container">
                <template v-for="(image, i) in images" :key="i">
                    <img class="img-fluid preload-img mb-2 room-img" :src="image.url" alt="img">
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomStateImages",
    computed: {
        images() {
            if (this.$store.getters.user.length === 0) return []
            return this.$store.getters.user.room_initial_state.images
        }
    },
    created() {
        if (this.$store.getters.user.length === 0) {
            this.$store.dispatch('getUser')
        }
    }
}
</script>

<style scoped>
@media (min-width: 1200px) {
    .images-container {
        display: flex;
        justify-content: center;
    }
    .room-img {
        max-height: 500px;
        margin-right: 0.5rem;
    }
}
@media (min-width: 1900px) {
    .room-img {
        max-height: 600px;
    }
}
</style>
