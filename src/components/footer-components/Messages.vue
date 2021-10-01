<template>
    <div
        v-for="incidence in incidences"
        :key="incidence.id"
        class="card card-style"
    >
        <router-link :to="`/messages/${incidence.id}`">
            <div class="content">
                <div class="d-flex justify-content-between">
                    <h4 class="mb-3">{{ incidence.subject }}</h4>
                    <i v-if="!incidence.read" class="fas fa-exclamation-circle unread"></i>
                </div>

                <div class="d-flex justify-content-between">
                    <p class="message-preview">{{ lastMessage(incidence) }}</p>
                    <p>{{ date(incidence) }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import utils from "@/scripts/utils";

export default {
    name: "Messages",
    computed: {
        incidences() {
            return this.$store.getters.incidences
        }
    },
    methods: {
        date(incidence) {
            return utils.formatDate(incidence.messages ? incidence.messages.at(-1).createdAt : incidence.createdAt)
        },
        lastMessage(incidence) {
            return incidence.messages ? incidence.messages.at(-1).text : incidence.message
        }
    },
    created() {
        if (this.$store.getters.incidences.length === 0) {
            this.$store.dispatch('getIncidences')
        }
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
