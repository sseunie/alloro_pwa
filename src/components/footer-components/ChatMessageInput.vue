<template>
    <div id="footer-bar" class="d-flex">
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
    </div>
</template>

<script>
export default {

    name: "ChatMessageInput",
    data: () => ({
        message: '',
        files: null
    }),
    computed: {
        chat() {
            return this.$store.getters.chat
        },
        filesSelected() {
            if (this.files === null) return 0
            return this.files.length
        }
    },
    methods: {
        sendMessage() {
            const message = this.message.trim()
            if (message.length > 0 || this.filesSelected <= 3) {
                this.$store.dispatch('sendResidenceChatMessage', {
                    id: this.chat.id,
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
        updateFiles() {
            this.files = this.$refs.messageFiles.files
        }
    },
}
</script>

<style scoped>
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
#footer-bar {
    min-height: 85px !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
</style>
