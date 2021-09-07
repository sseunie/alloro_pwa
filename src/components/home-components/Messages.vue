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
                <p>{{ format(incidence.createdAt) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Messages",
    computed: {
        incidences() {
            return this.$store.getters.incidences
        }
    },
    methods: {
        format(givenDate) {
            const fullDate = new Date(givenDate)
            const date = `${fullDate.getDate()}/${fullDate.getMonth()}/${fullDate.getFullYear()}`
            const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`

            const currentDate = new Date()
            const timeDifference = currentDate.getTime() - fullDate.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);

            if (daysDifference < 1) return time
            else if (daysDifference < 2) return 'Ayer'
            else return date
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
