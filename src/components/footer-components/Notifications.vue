<template>
    <div
        v-for="notification in notifications"
        :key="notification.id"
        class="card card-style"
    >
        <router-link :to="`/notifications/${notification.id}`">
            <div class="content">
                <div class="d-flex justify-content-between">
                    <h4 class="mb-3">{{ notification.title }}</h4>
                    <i v-if="inInbox(notification.id)" class="fas fa-exclamation-circle unread"></i>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="message-preview">{{ notification.text }}</p>
                    <p>{{ date(notification) }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import utils from "@/scripts/utils";

export default {
    name: "Notifications",
    computed: {
        notifications() {
            return this.$store.getters.notifications
        }
    },
    methods: {
        date(notification) {
            return utils.formatDate(notification.createdAt)
        },
        inInbox(id) {
            return this.$store.getters.inbox.notifications.includes(id)
        }
    },
    created() {
        this.$store.dispatch('getNotifications')
    }
}
</script>

<style scoped>
.card-style {
    margin: 0 10px 12px 10px;
    border-radius: 10px;
}
.card-style .content {
    margin: 15px 15px 15px 15px;
}
.card-style .content p {
    margin-bottom: 0;
}
i.unread {
    line-height: 19px;
    font-size: 20px;
    margin-right: 5px;
    color: #3385B4;
}
p.message-preview {
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
