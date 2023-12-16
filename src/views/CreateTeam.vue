<script>
import {mapState} from "vuex";

export default {
    name: 'MvcCreateTeam',
    data() {
        return {
            form: {
                name: '',
                description: '',
                avatar: '',
            },
            imageURL: null,
            errorMessage: []
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.profile.isSubmitting,
            isSubmittingMassage: state => state.teams.isSubmittingMassage,
            userProfile: state => state.profile.form,
        })
    },
    methods: {
        submitForm() {
            console.log('form sended')
            if (this.form.name.length < 50 && this.form.description.length < 200) {
                console.log('form sended 2')
                this.$store.dispatch("createNewTeam", this.form)
                this.form.avatar = ''
                this.imageURL = null
                this.form.name = ''
                this.form.description = ''
                this.errorMessage = []
            } else {
                console.log('not form sended')
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
                        <label class="profile-block-label" for="avatar">Аватар</label>
                        <input type="file" id="avatar" @change="handleTeamPhoto">
                    </div>


                    <button class="submit-button" type="submit"
                            :disabled="isSubmitting">Применить
                    </button>
                </form>
            </div>
        </div>
        <div class="create-team-message" v-if="isSubmittingMassage">
            <ul class="message-success-group" v-for="message in isSubmittingMassage" :key="message">
                <li class="message-element success">{{ message }}</li>
            </ul>
        </div>
        <div class="create-team-message" v-if="errorMessage">
            <ul class="message-success-group" v-for="error in errorMessage" :key="error">
                <li class="message-element error">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>