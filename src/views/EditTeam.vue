<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const"

export default {
    name: 'MvcEditTeam',
    computed: {
        ...mapState({
            currentTeam: state => state.currentTeam.currentTeam,
            isSubmittingMassage: state => state.teams.isSubmittingMassage,
            user: state => state.auth.user
        }),
    },
    data() {
        return {
            domain: domainConst.domain,
            selectedImage: null,
            form: {}
        }
    },
    methods: {
        handleTeamPhoto(event) {
            const file = event.target.files[0]
            this.form.avatar = file
            if (file && file.type.includes('image/')) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.selectedImage = reader.result
                }
                reader.readAsDataURL(file)
            } else {
                this.selectedImage = null
            }
        },
        submitForm() {
            const credentials = {
                team: this.currentTeam.id,
                user: this.user.id,
                formData: this.form
            }
            this.$store.dispatch('editTeam', credentials)
        }
    },
    created() {
        this.form = {...this.currentTeam}
        this.$store.dispatch('clearIsSubmitMessage')
    }
}
</script>

<template>
    <div class="class-flex block-area">
        <h2>Редактировать данные</h2>

        <div class="create-team_block">
            <div class="create-team_block-image">
                <img
                        v-if="selectedImage"
                        :src="selectedImage"
                        alt="тут должно быть фото Команды">
                <img
                        v-else
                        :src="domain+form.avatar"
                        alt="тут должно быть фото Команды">
            </div>

            <div class="create-team_block-content">
                <form
                        @submit.prevent="submitForm"
                >
                    <div class="form-group">
                        <label class="profile-block-label" for="name">Название</label>
                        <input
                                v-model="form.name"
                                type="text"
                                id="name"
                                required>
                    </div>

                    <div class="form-group">
                        <label class="profile-block-label" for="description">Краткое описание</label>
                        <input
                                v-model="form.description"
                                type="text"
                                id="description"
                                required
                        >
                    </div>

                    <div class="form-group">
                        <label class="profile-block-label">Полное описание</label>
                        <textarea
                                v-model="form.detailed_description"
                        >
                        </textarea>
                    </div>

                    <div class="form-group">
                        <label class="profile-block-label" for="telegram_team">Телеграмм чат</label>
                        <input
                                v-model="form.telegram_team"
                                type="text"
                                id="telegram_team"
                                required
                        >
                    </div>


                    <div class="form-group">
                        <label class="profile-block-label" for="avatar">Аватар</label>
                        <input
                                type="file"
                                id="avatar"
                                @change="handleTeamPhoto">
                    </div>


                    <button class="submit-button" type="submit"
                            :disabled="isSubmitting">Применить
                    </button>
                </form>
            </div>

        </div>
        <div v-if="validationsErrors">
            <ul v-for="error in validationsErrors" :key="error">
                <li>{{ error[0] }}</li>
            </ul>
        </div>
        <div class="block-massege" v-if="isSubmittingMassage">
            <ul v-for="message in isSubmittingMassage" :key="message">
                <li>{{ message }}</li>
            </ul>
        </div>

    </div>
</template>

<style scoped>

</style>