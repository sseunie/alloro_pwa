<template>
    <div class="content" v-if="chat">
        <template v-for="(message, i) in chat.messages" :key="i">
            <template v-if="message.sender === 'residence'">
                <template v-if="message.text">
                    <div class="speech-bubble speech-right color-black">
                        {{ message.text }}
                    </div>
                    <div class="clearfix" />
                    <em class="speech-read read-left mb-2">{{ date(message) }}</em>
                </template>
            </template>

            <template v-else>
                <div v-if="message.text" class="speech-bubble speech-left bg-highlight">
                    {{ message.text }}
                </div>
                <div class="clearfix" />

                <template v-for="(file, i) in message.files" :key="`m-file${i}`">
                    <div class="speech-bubble speach-image speech-left bg-highlight">
                        <img v-if="file.mime_type.includes('image')" class="img-fluid preload-img" :src="file.url" alt="img">
                        <audio v-else controls>
                            <source :src="file.url" :type="file.mime_type">
                        </audio>
                    </div>
                    <div class="clearfix" />
                </template>

                <em class="speech-read read-right mb-2">{{ date(message) }}</em>
            </template>
        </template>
        <ChatMessageInput />
    </div>
</template>

<script>
import utils from "@/scripts/utils";
import ChatMessageInput from "@/components/footer-components/ChatMessageInput";

export default {
    name: "ResidenceChat",
    components: {ChatMessageInput},
    computed: {
        chat() {
            return this.$store.getters.chat
        }
    },
    watch: {
        chat() {
            this.updateReadStatus()
        }
    },
    methods: {
        date(object) {
            return utils.formatDateTime(object.created_at)
        },
        updateReadStatus() {
            if (!this.chat.read) {
                this.$store.dispatch('updateChatReadStatus', this.chat.id)
            }
        },
        scrollToBottom() {
            window.scrollTo(0,document.body.scrollHeight)
        }
    },
    mounted() {
        this.scrollToBottom()
    },
    created() {
        if (this.chat.length === 0) {
            this.$store.dispatch('getChat', localStorage.getItem('userid')).then(() => {
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
    margin-bottom: 2px;
    max-width: 70%;
    word-break: break-word;
}
.subtitle {
    margin-top: -15px;
}
.subtitle > p {
    margin-bottom: 0;
}
audio {
    width: 400px;
    height: 50px;
    margin: 8px;
}
@media (max-width: 600px) {
    audio {
        width: 220px;
    }
}
@media (max-width: 350px) {
    audio {
        width: 175px;
    }
}
</style>
