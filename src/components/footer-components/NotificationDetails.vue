<template>
    <div class="card card-style">
        <div class="content" v-if="notification">
            <em class="speech-read read-left mb-0">{{ date(notification) }}</em>

            <h4 class="mb-2">{{ notification.title }}</h4>
            <p>{{ notification.text }}</p>
            <div class="d-flex justify-content-center">
                <a
                    v-if="notification.url"
                    :href="notification.url"
                    target="_blank"
                    class="btn btn-s shadow-l rounded-s bg-highlight text-uppercase font-900"
                >Ver enlace</a>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/scripts/utils";

export default {
    name: "NotificationDetails",
    computed: {
        notification() {
            return this.$store.getters.notification(this.$route.params.id)
        }
    },
    methods: {
        date(notification) {
            return utils.formatDateTime(notification.created_at)
        }
    },
}
</script>

<style scoped>
.card-style {
    margin-bottom: 20px;
}
div.content > p {
    margin-bottom: 1rem;
}
a {
    background: #FFB433 !important;
}
</style>
