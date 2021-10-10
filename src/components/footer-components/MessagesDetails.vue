<template>
    <div class="content" v-if="incidence">
        <div class="text-center mb-2 subtitle">
            <p>{{ incidence.residence.name }}</p>
            <p>{{ incidence.incidence_area.name }}</p>
        </div>
        <div class="text-center mb-4"><h4>{{ incidence.subject }}</h4></div>

        <template v-for="(file, i) in incidence.files" :key="`file${i}`">
            <div class="speech-bubble speach-image speech-left bg-highlight">
                <img class="img-fluid preload-img" :src="file.url" alt="img">
            </div>
            <div class="clearfix" />
        </template>

        <div class="speech-bubble speech-left bg-highlight">
            {{ incidence.message }}
        </div>
        <div class="clearfix" />
        <em class="speech-read mb-1">{{ date(incidence) }}</em>

        <template v-for="(message, i) in incidence.messages" :key="i">
            <template v-if="message.sender === 'residence'">
                <div class="speech-bubble speech-right color-black">
                    {{ message.text }}
                </div>
                <div class="clearfix" />
                <em class="speech-read read-left mb-2">{{ date(message) }}</em>
            </template>

            <template v-else>
                <div v-if="message.text.length > 0" class="speech-bubble speech-left bg-highlight">
                    {{ message.text }}
                </div>
                <div class="clearfix" />

                <template v-for="(file, i) in message.files" :key="`m-file${i}`">
                    <div class="speech-bubble speach-image speech-left bg-highlight">
                        <img class="img-fluid preload-img" :src="file.url" alt="img">
                    </div>
                    <div class="clearfix" />
                </template>

                <em class="speech-read read-right mb-2">{{ date(message) }}</em>
            </template>
        </template>

        <MessageInput />
    </div>
</template>

<script>
import utils from "@/scripts/utils";
import MessageInput from "@/components/footer-components/MessageInput";

export default {
    name: "MessagesDetails",
    components: {MessageInput},
    computed: {
        incidence() {
            return this.$store.getters.incidence(this.$route.params.id)
        }
    },
    methods: {
        date(object) {
            return utils.formatDateTime(object.created_at)
        },
        updateReadStatus() {
            if (!this.incidence.read)
            this.$store.dispatch('updateIncidenceReadStatus', this.incidence.id)
        }
    },
    created() {
        if (this.incidence === undefined) {
            this.$store.dispatch('getIncidences').then(() => {
                this.updateReadStatus()
            })
        } else {
            this.updateReadStatus()
        }
    }
}
</script>

<style scoped>
.read-left {
    text-align: left;
    margin-left: 10px;
}
.read-right {
    text-align: right;
}
.speech-bubble {
    margin-bottom: 5px;
    max-width: 70%;
    word-break: break-word;
}
.subtitle {
    margin-top: -15px;
}
.subtitle > p {
    margin-bottom: 0;
}
</style>
