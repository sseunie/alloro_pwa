<template>
    <div
        v-for="incidence in incidences"
        :key="incidence.id"
        class="card card-style"
    >
        <div class="content">
            <div class="d-flex justify-content-between">
                <h4 class="mb-3">{{ incidence.subject }}</h4>
                <i class="fas fa-exclamation-circle unread"></i>
            </div>

            <div class="d-flex justify-content-between">
                <p>Preview del último mensaje</p>
                <p>{{ date(incidence) }}</p>
            </div>
        </div>
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
            return utils.formatDate(incidence.createdAt)
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
    color: #4A89DC;
}
</style>
