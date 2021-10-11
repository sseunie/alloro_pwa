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
        v-for="incidence in incidences"
        :key="`${incidence.id}`"
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
    data: () => ({
        search: '',
        sortingByTitle: false
    }),
    computed: {
        incidences() {
            const word = this.search.trim()
            const incidences = this.sortingByTitle ?
                this.incidencesBySubject() : this.incidencesByDate()
            if (word === '') return incidences
            else return incidences.filter(i => utils.checkForValue(i, word))
        }
    },
    methods: {
        date(incidence) {
            return utils.formatDate(incidence.messages.length > 0 ? incidence.messages.at(-1).created_at : incidence.created_at)
        },
        lastMessage(incidence) {
            return incidence.messages.length > 0 ? incidence.messages.at(-1).text : incidence.message
        },
        switchSortingMethod() {
            this.sortingByTitle = !this.sortingByTitle
        },
        incidencesByDate() {
            return this.$store.getters.incidences.sort(utils.compareDates)
        },
        incidencesBySubject() {
            return this.$store.getters.incidences.sort((a, b) => a.subject.localeCompare(b.subject))
        }
    },
    created() {
        if (this.incidencesByDate().length === 0) {
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

.search-box {
    margin: 0 10px 0 10px;
}
.sort-btn {
    margin-right: 25px;
    font-weight: bold;
    color: #05476D !important;
}
</style>
