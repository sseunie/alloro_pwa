<template>
    <div class="page-content">
        <div class="page-title page-title-small" style="padding-bottom: 35px;"></div>
        <div class="card header-card shape-rounded" style="height: 120px;">
            <div class="card-overlay bg-highlight opacity-95"></div>
            <div class="card-overlay dark-mode-tint"></div>
        </div>

        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="card card-style"
        >
            <div class="content">
                <h4 class="mb-2">{{ notification.title }}</h4>
                <p>{{ notification.text }}</p>
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
import api from "@/scripts/api";

export default {
    name: "Notifications",
    data: () => ({
        notifications: [],
    }),
    created() {
        api.getNotifications().then(r => {
            this.notifications = r.data
        })
    }
}
</script>

<style scoped>
.card-style {
    margin-bottom: 20px;
}
div.content > p {
    margin-bottom: 1rem;
}
</style>
