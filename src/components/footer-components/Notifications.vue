<template>
    <div class="search-box search-color shadow-xl border-0 bg-blue-dark rounded-l bottom-0">
        <i class="fa fa-search"></i>
        <input type="text" class="border-0" placeholder="Buscar..." v-model="search">
    </div>

    <div class="d-flex flex-row-reverse">
        <button @click="switchSortingMethod" class="sort-btn my-2">
            Ordenar por {{ sortingByTitle ? 'fecha' : 'título' }}
        </button>
    </div>

    <div
        v-for="notification in notifications"
        :key="notification.id"
        class="card card-style"
    >
        <router-link :to="`/notifications/${notification.id}`">
            <div class="content">
                <div class="d-flex justify-content-between">
                    <h4 class="mb-3">{{ notification.title }}</h4>
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
    data: () => ({
        search: '',
        sortingByTitle: false
    }),
    computed: {
        notifications() {
            const word = this.search.trim()
            const notifications = this.sortingByTitle ?
                this.notificationsByTitle() : this.notificationsByDate()
            if (word === '') return notifications
            else return notifications.filter(n => utils.checkForValue(n, word))
        }
    },
    methods: {
        date(notification) {
            return utils.formatDate(notification.created_at)
        },
        switchSortingMethod() {
            this.sortingByTitle = !this.sortingByTitle
        },
        notificationsByDate() {
            return this.$store.getters.notifications.sort(utils.compareDates)
        },
        notificationsByTitle() {
            return this.$store.getters.notifications.sort((a, b) => a.title.localeCompare(b.title))
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
.search-box {
    margin: 0 10px 0 10px;
}
.sort-btn {
    margin-right: 25px;
    font-weight: bold;
    color: #05476D !important;
}
</style>
