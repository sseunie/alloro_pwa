<template>
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Gestión de ausencias</h3>
            <p>Puedes comprobar las ausencias programadas y añadir nuevas.</p>

            <div v-if="!showForm">
                <button
                    @click="showForm = true"
                    class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto my-4 btn-send"
                >Nueva ausencia</button>
            </div>


            <div v-if="showForm">
                <div class="input-style has-borders no-icon mb-4">
                    <label for="startDate" class="color-highlight">Salida</label>
                    <input v-model="startDate" type="date" :max="maxDate" :min="today" class="form-control" id="startDate">
                </div>

                <div v-if="startDate" class="input-style has-borders no-icon mb-4">
                    <label for="finishDate" class="color-highlight">Vuelta</label>
                    <input v-model="finishDate" type="date" :max="maxDate" :min="startDate" class="form-control" id="finishDate">
                </div>

                <div class="input-style has-borders no-icon" style="margin-bottom: 5px !important;">
                    <label for="observations" class="color-highlight">Observaciones</label>
                    <textarea
                        v-model="body"
                        :class="bodyLength > 100 && 'red-border'"
                        id="observations"
                        placeholder="Escribe aquí tu mensaje..."></textarea>
                </div>
                <p class="char-counter" :class="bodyLength > 100 && 'color-red-dark'">{{ bodyLength }}/100</p>

                <p v-if="generalError" class="color-red-dark text-center my-2">Debes seleccionar las fechas de salida y vuelta</p>
                <p v-if="dateError" class="color-red-dark text-center my-2">La fecha de vuelta no puede ser igual o anterior a la de salida</p>
                <p v-if="textareaError" class="color-red-dark text-center my-2">Las observaciones no pueden sobrepasar los 100 caracteres</p>

                <button
                    @click="send"
                    class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto my-4 btn-send"
                >Enviar</button>
            </div>

        </div>
    </div>

    <div
        id="menu-success-1"
        class="menu menu-box-modal rounded-m"
        :class="success && 'menu-active'"
        style="display: block; width: 310px; height: 320px;"
    >
        <h1 class="text-center mt-3 pt-1"><i class="fa fa-3x fa-check-circle color-green-dark shadow-xl rounded-circle"></i></h1>
        <h1 class="text-center mt-3 font-700">Ausencia registrada</h1>
        <p class="boxed-text-l">Se ha registrado la ausencia correctamente.</p>
        <button
            @click="hideModal"
            class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light"
        >OK</button>
    </div>

    <div v-if="success" class="menu-hider menu-active"></div>
</template>

<script>
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

export default {
    name: "AbsencesForm",
    data: () => ({
        showForm: false,
        startDate: null,
        finishDate: null,
        body: '',
        success: false,
        generalError: false,
        dateError: false,
        textareaError: false,
        today: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
        maxDate: `${year+5}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    }),
    computed: {
        bodyLength() {
            return this.body.length
        }
    },
    methods: {
        hideModal() {
            this.success = false
        },
        send() {
            if (this.startDate == null ||
                this.finishDate == null
            ) {
                this.generalError = true
                this.dateError = false
                this.textareaError = false
            } else if (this.startDate >= this.finishDate) {
                this.generalError = false
                this.dateError = true
                this.textareaError = false
            } else if (this.body.length > 100) {
                this.generalError = false
                this.dateError = false
                this.textareaError = true
            } else {
                this.generalError = false
                this.dateError = false
                this.textareaError = false
                this.$store.dispatch('createAbsence', {
                    startDate: new Date(this.startDate),
                    finishDate: new Date(this.finishDate),
                    observations: this.body,
                    userId: localStorage.getItem('userid'),
                    createdAt: new Date()
                }).then(() => {
                    this.success = true
                    this.showForm = false
                    this.body = ''
                    this.startDate = null
                    this.finishDate = null
                })
            }
        }
    }
}
</script>

<style scoped>
label {
    opacity: initial !important;
    left: 4px !important;
    transform: initial !important;
    position: relative !important;
    top: 0 !important;
    height: initial !important;
    font-size: 12px !important;
    transition: initial !important;
    background-color: initial !important;
}

p.char-counter {
    float: right;
}

.red-border {
    border-color: #ED5565 !important;
}

.btn-send {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
}
</style>
