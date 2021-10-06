<template>
    <div class="content" v-if="incidence">
        <div class="text-center mb-2 subtitle">
            <p>{{ incidence.residence.name }}</p>
            <p>{{ incidence.incidence_area.name }}</p>
        </div>
        <div class="text-center mb-4"><h4>{{ incidence.subject }}</h4></div>

        <div v-for="(file, i) in incidence.files"
             :key="`file${i}`"
             class="speech-bubble speach-image speech-left bg-highlight"
        >
            <img class="img-fluid preload-img" :src="file.url" alt="img">
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

        <div id="footer-bar" class="d-flex">
            <div class="me-3 speach-icon">
                <a href="#" data-menu="menu-upload" class="bg-gray-dark ms-2"><i class="fa fa-plus mt-2"></i></a>
            </div>
            <div class="flex-fill speach-input">
                <input v-model="message" type="text" class="form-control" placeholder="Escribe tu mensaje...">
            </div>
            <div class="ms-3 speach-icon">
                <a @click="sendMessage"
                   class="bg-blue-dark me-2"><i class="fa fa-arrow-up mt-2"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/scripts/utils";

export default {
    name: "MessagesDetails",
    data: () => ({
        message: '',
        files: null
    }),
    computed: {
        incidence() {
            return this.$store.getters.incidence(this.$route.params.id)
        }
    },
    methods: {
        date(object) {
            return utils.formatDateTime(object.created_at)
        },
        sendMessage() {
            this.message = ''
        }
    },
    created() {
        if (this.incidence === undefined) {
            this.$store.dispatch('getIncidences').then(() => {
                this.$store.dispatch('updateIncidenceReadStatus', this.$route.params.id)
                    .then(() => {
                        this.$store.dispatch('removeIncidenceFromInbox', this.$route.params.id)
                    })
            })
        } else {
            this.$store.dispatch('updateIncidenceReadStatus', this.$route.params.id)
                .then(() => {
                    this.$store.dispatch('removeIncidenceFromInbox', this.$route.params.id)
                })
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
    word-break: break-word;
}
.subtitle {
    margin-top: -15px;
}
.subtitle > p {
    margin-bottom: 0;
}
</style>
