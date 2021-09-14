<template>
    <div class="card card-style">
        <div class="content mb-0">
            <h3>Reportar nueva incidencia</h3>
            <p>
                Rellena todos los campos para notificar una nueva incidencia.
            </p>

            <div class="input-style has-borders no-icon">
                <label for="residence-selector" class="color-highlight">Selecciona una residencia</label>
                <select v-model="selectedResidence" id="residence-selector" class="form-control">
                    <option value="default" disabled selected>Selecciona una residencia</option>
                    <option
                        v-for="residence in residences"
                        :value="residence.id"
                        :key="'residence' + residence.id"
                    >{{ residence.name }}</option>
                </select>
                <span><i class="fa fa-chevron-down"></i></span>
                <em></em>
            </div>

            <div class="input-style has-borders no-icon">
                <label for="incidence-selector" class="color-highlight">Selecciona un área</label>
                <select v-model="selectedArea" id="incidence-selector" class="form-control">
                    <option value="default" disabled selected>Selecciona un área</option>
                    <option
                        v-for="area in incidenceAreas"
                        :value="area.id"
                        :key="'residence' + area.id"
                    >{{ area.name }}</option>
                </select>
                <span><i class="fa fa-chevron-down"></i></span>
                <em></em>
            </div>

            <div class="input-style has-borders no-icon">
                <input v-model="subject" type="text" class="form-control" id="incidence-subject" placeholder="Asunto..." maxlength="44">
                <label for="incidence-subject" class="color-highlight">Asunto</label>
            </div>

            <div class="input-style has-borders no-icon" style="margin-bottom: 0 !important;">
                <textarea
                    v-model="body"
                    :class="bodyLength > 150 && 'red-border'"
                    id="incidence-text"
                    placeholder="Escribe aquí tu mensaje..."></textarea>
                <label for="incidence-text" class="color-highlight">Cuerpo</label>
            </div>
            <div><p class="char-counter" :class="bodyLength > 150 && 'color-red-dark'">{{ bodyLength }}/150</p></div>

            <div class="has-borders no-icon my-3">
                <label for="incidence-image" class="color-highlight mx-1">Imágenes</label>
                <input
                    type="file" class="form-control" id="incidence-image"
                    accept="image/*" multiple
                    ref="incidenceImages"
                >
            </div>
        </div>

        <p v-if="error.general" class="color-red-dark text-center my-2">Debes rellenar todos los campos</p>
        <p v-if="error.textarea" class="color-red-dark text-center my-2">El mensaje debe contener entre 10 y 150 caracteres</p>
        <p v-if="error.images" class="color-red-dark text-center my-2">El número máximo de imágenes permitido es 3</p>

        <button
            @click="send"
            class="btn btn-full btn-margins bg-highlight rounded-sm btn-m text-uppercase font-900 mx-auto mb-4 btn-send"
        >Enviar</button>
    </div>

    <div
         id="menu-success-1"
         class="menu menu-box-modal rounded-m"
         :class="success && 'menu-active'"
         style="display: block; width: 310px; height: 320px;"
    >
        <h1 class="text-center mt-3 pt-1"><i class="fa fa-3x fa-check-circle color-green-dark shadow-xl rounded-circle"></i></h1>
        <h1 class="text-center mt-3 font-700">Incidencia enviada</h1>
        <p class="boxed-text-l">
            La incidencia ha sido enviada correctamente.<br>Puedes ver el progreso de las incidencias en tus mensajes.
        </p>
        <router-link
            to="/messages"
            class="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-green-light"
        >OK</router-link>
    </div>

    <div v-if="success" class="menu-hider menu-active"></div>

</template>

<script>
import api from "@/scripts/api";

export default {
    name: "Incidences",
    data: () => ({
        selectedResidence: 'default',
        selectedArea: 'default',
        subject: '',
        body: '',
        error: { general: false, textarea: false, images: false },
        residences: [],
        incidenceAreas: [],
        success: false
    }),
    computed: {
        bodyLength() {
            return this.body.length
        }
    },
    methods: {
        send() {
            const images = this.$refs.incidenceImages.files

            if (this.selectedResidence === 'default' ||
                this.selectedArea === 'default' ||
                this.subject.trim().length === 0 ||
                this.body.length === 0
            ) {
                this.error.general = true
                this.error.textarea = false
                this.error.images = false
            } else if (this.body.length > 150 || this.body.length < 10) {
                this.error.textarea = true
                this.error.general = false
                this.error.images = false
            } else if (images.length > 3) {
                this.error.images = true
                this.error.general = false
                this.error.textarea = false
            } else {
                this.error.general = false
                this.error.textarea = false
                this.error.images = false

                this.$store.dispatch('createIncidence', {
                    residence: this.selectedResidence,
                    area: this.selectedArea,
                    subject: this.subject,
                    message: this.body,
                    userId: localStorage.getItem('userid'),
                    createdAt: new Date(),
                    read: true
                }).then(() => {
                    this.success = true
                })
            }
        }
    },
    created() {
        api.getResidences().then(r => {
            this.residences = r.data
        })

        api.getIncidenceAreas().then(r => {
            this.incidenceAreas = r.data
        })

        if (this.$store.getters.incidences.length === 0) {
            this.$store.dispatch('getIncidences')
        }
    }
}
</script>

<style scoped>
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
