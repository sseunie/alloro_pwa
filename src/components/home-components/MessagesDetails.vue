<template>
    <div class="content" v-if="incidence">
        <div class="speech-bubble speech-left bg-highlight">
            {{ incidence.subject }}
        </div>
        <div class="clearfix" />
        <div class="speech-bubble speech-left bg-highlight">
            {{ incidence.message }}
        </div>
        <div class="clearfix" />
        <em class="speech-read mb-1">{{ date(incidence) }}</em>

        <template v-for="(message, i) in incidence.messages" :key="i">
            <div class="speech-bubble speech-right color-black">
                {{ message.text }}
            </div>
            <div class="clearfix" />
            <em class="speech-read read-left mb-2">{{ date(message) }}</em>
        </template>
    </div>
</template>

<script>
import utils from "@/scripts/utils";

export default {
    name: "MessagesDetails",
    computed: {
        incidence() {
            return this.$store.getters.incidence(this.$route.params.id)
        }
    },
    methods: {
        date(object) {
            return utils.formatDateTime(object.createdAt)
        }
    },
    created() {
        if (this.incidence === undefined) {
            this.$store.dispatch('getIncidences')
        }
    }
}
</script>

<style scoped>
.read-left {
    text-align: left;
    margin-left: 10px;
}
.speech-bubble {
    margin-bottom: 5px;
    max-width: 70%;
}
</style>
