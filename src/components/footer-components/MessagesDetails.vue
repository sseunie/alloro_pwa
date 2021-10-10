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

        <div id="footer-bar" class="d-flex">
            <template v-if="!incidence.closed">
                <div class="me-3 speach-icon">
                    <input type="file"
                           id="upload-file" name="upload-file"
                           ref="messageFiles" @change="updateFiles"
                           accept="image/*, audio/*" multiple hidden
                    >
                    <label for="upload-file" class="footer-btn bg-gray-dark ms-2">
                        <i class="mt-2" :class="filesSelected === 0 ? 'fa fa-plus' : ''">
                            <template v-if="filesSelected > 0">{{ filesSelected }}</template>
                        </i>
                    </label>
                </div>
                <div class="flex-fill speach-input">
                    <input v-model="message" type="text" class="form-control" placeholder="Escribe tu mensaje...">
                </div>
                <div class="ms-3 speach-icon">
                    <button @click="sendMessage"
                       class="footer-btn bg-blue-dark me-2"><i class="fa fa-arrow-up mt-2"></i></button>
                </div>
            </template>

            <template v-else>
                <div class="flex-fill speach-input mx-4">
                    <input disabled type="text" class="form-control" placeholder="Esta incidencia está cerrada">
                </div>
            </template>
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
        },
        filesSelected() {
            if (this.files === null) return 0
            return this.files.length
        }
    },
    methods: {
        date(object) {
            return utils.formatDateTime(object.created_at)
        },
        sendMessage() {
            const message = this.message.trim()
            if (message.length > 0 && this.filesSelected <= 3) {
                this.$store.dispatch('sendIncidenceMessage', {
                    id: this.incidence.id,
                    data: {
                        userId: localStorage.getItem('userid'),
                        text: message,
                        files: this.files ?? null
                    }
                })
                this.message = ''
                this.files = null
            }
        },
        updateReadStatus() {
            if (!this.incidence.read)
            this.$store.dispatch('updateIncidenceReadStatus', this.incidence.id)
        },
        updateFiles() {
            this.files = this.$refs.messageFiles.files
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
.footer-btn {
    position: relative;
    flex: 1 1 auto;
    padding-top: 0 !important;
    display: block;
    border-radius: 35px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-top: 3px;
    transform: translateY(10px);
}
.footer-btn > i {
    font-size: 18px;
    position: relative;
    z-index: 2;
}
</style>
