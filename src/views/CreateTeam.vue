<script>
import {mapState} from "vuex";
import MvcModalMessage from "@/components/modal/ModalMessage.vue";

export default {
    name: 'MvcCreateTeam',
    components: {MvcModalMessage},
    data() {
        return {
            form: {
                name: '',
                description: '',
                avatar: '',
                detailedDescription: '',
                telegramTeam: ''
            },
            imageURL: null,
            errorMessage: [],
            toRedirect: {},
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.profile.isSubmitting,
            isSubmittingMassage: state => state.teams.isSubmittingMassage,
            userProfile: state => state.profile.form,
        }),

    },
    methods: {
        submitForm() {
            console.log('form sended')
            if (this.form.name.length < 50 && this.form.description.length < 200) {
                this.$store.dispatch("createNewTeam", this.form)
                        .then(data => {
                            const newTeam = data
                            this.toRedirect = {name: 'teamProfile', params: {slugTeam: newTeam.slug}}
                        })
                this.form.avatar = ''
                this.imageURL = null
                this.form.name = ''
                this.form.description = ''
                this.detailedDescription = ''
                this.telegramTeam = ''
                this.errorMessage = []
            } else {
                if (this.form.name.length > 50) {
                    this.errorMessage.push('Название команды слишком длинное, допустимая длина 50 символов')
                } else if (this.form.description > 200) {
                    this.errorMessage.push('Краткое описание команды слишком длинное, допустимая длина 200 символов')
                }
            }

        },
        handleTeamPhoto(event) {
            this.form.avatar = event.target.files[0]
            const reader = new FileReader()

            reader.onload = () => {
                this.imageURL = reader.result
            }

            reader.readAsDataURL(this.form.avatar)
        }
    },
    beforeCreate() {
        this.$store.dispatch('clearIsSubmitMessage')
    }
}

</script>

<template>
    <mvc-modal-message
            :messages="errorMessage"
            mood="red"
            clear-message="clearIsSubmitMessage"
    ></mvc-modal-message>
    <mvc-modal-message
            :messages="isSubmittingMassage"
            mood="green"
            clear-message="clearIsSubmitMessage"
            :to-redirect="toRedirect"
    ></mvc-modal-message>
    <div class="class-flex block-area">
        <h2>Создание новой команды</h2>
        <div class="create-team_block">
            <div class="create-team_block-image">
                <img v-if="form.avatar" :src="imageURL" alt="тут должно быть фото Команды">
                <div v-else class="create-team_block-image-block">
                    <h1>Логотип</h1>
                    <h1>команды</h1>
                </div>

            </div>
            <div class="create-team_block-content">
                <form
                        @submit.prevent="submitForm"
                >
                    <div class="form-group">
                        <label class="profile-block-label" for="name">Название</label>
                        <input type="text" id="name" v-model="form.name" required>
                    </div>
                    <div class="form-group">
                        <label class="profile-block-label" for="description">Краткое описание</label>
                        <input
                                type="text"
                                id="description"
                                v-model="form.description"
                                required
                        >
                    </div>

                    <div class="form-group">
                        <label class="profile-block-label">Полное описание</label>
                        <textarea
                                v-model="form.detailedDescription"
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label class="profile-block-label" for="telegramTeam">Телеграм</label>
                        <input
                                type="text"
                                id="telegramTeam"
                                v-model="form.telegramTeam"
                                required
                        >
                    </div>

                    <div class="form-group">
                        <label class="profile-block-label" for="avatar">Аватар</label>
                        <input type="file" id="avatar" @change="handleTeamPhoto">
                    </div>


                    <button class="submit-button" type="submit"
                            :disabled="isSubmitting">Применить
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>