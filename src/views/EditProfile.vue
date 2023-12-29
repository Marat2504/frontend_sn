<script>

import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"
import MvcSpinner from "@/components/Spiner.vue";
import MvcModalMessage from "@/components/modal/ModalMessage.vue";


export default {
    name: 'MvcEditProfile',
    components: {MvcModalMessage, MvcSpinner},
    data() {
        return {
            domain: domainConst.domain,
            form: this.$store.getters['getUserProfile'],
            photo: null,
            componentKey: 0
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoading: state => state.profile.isLoading,
            isSubmitting: state => state.profile.isSubmitting,
            errorMessage: state => state.profile.errorMessage,
            successMessage: state => state.profile.successMessage
        })
    },

    methods: {
        submitForm() {
            const myUserProfile = JSON.parse(localStorage.getItem('userprofile'))
            if (this.photo !== null) {
                this.form.athlete_photo = this.photo
                this.$store.dispatch('put_data', {myId: myUserProfile.id, formData: this.form})
                this.photo = null
            } else {
                this.form.athlete_photo = null
                this.$store.dispatch('put_data', {myId: myUserProfile.id, formData: this.form})
            }

        },
        handleAthletePhoto(event) {
            this.photo = event.target.files[0]
        },
        reRenderComponent() {
            console.log('reRenderComponent')
        },
        toRedirectSuccess() {
            return {
                name: 'userProfile',
                params: {
                    userProfileId: this.userProfile.id
                }
            }
        }
    },

    beforeCreate() {
        const myProfile = JSON.parse(localStorage.getItem('userprofile'))
        this.$store.dispatch('get_data', myProfile.id)

    },
    created() {},
    mounted() {}
}

</script>
<template>
    <mvc-modal-message
            :messages="errorMessage"
            mood="red"
            clear-message="clearSuccessMessage"
    ></mvc-modal-message>
    <mvc-modal-message
            :messages="successMessage"
            mood="green"
            clear-message="clearSuccessMessage"
            :to-redirect=toRedirectSuccess()
    ></mvc-modal-message>

    <div class="profile_block class-flex">
        <h2>Редактирование профиля</h2>
        {{form.avatar}}
        <div v-if="!isLoading" :key="componentKey">

            <form
                    @submit.prevent="submitForm"
            >
                <div class="form-group">
                    <label class="profile-block-label" for="name">Имя</label>
                    <input type="text" id="name" v-model="form.name" required>
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="surname">Фамилия</label>
                    <input
                            type="text"
                            id="surname"
                            v-model="form.surname"
                            required
                    >
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="gender">Пол</label>
                    <select class="userprofile-select" id="gender" v-model="form.gender" required>
                        <option value="male">Мужчина</option>
                        <option value="female">Женщина</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="sport-type">Вид спорта</label>
                    <select class="userprofile-select" id="sport-type" v-model="form.sport_type" required>
                        <option value="ski">Лыжник</option>
                        <option value="run">Бегун</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="characteristics">О себе</label>
                    <textarea id="characteristics" v-model="form.characteristics" rows="5" required></textarea>
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="athlete-photo">Аватар</label>
                    <input type="file" id="athlete-photo" @change="handleAthletePhoto">
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="date-of-birth">Дата рождения</label>
                    <input type="date" id="date-of-birth" v-model="form.date_of_birth" required>
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="city">Город проживания</label>
                    <input type="text" id="city" v-model="form.city" required>
                </div>

                <div class="form-group">
                    <label class="profile-block-label" for="contacts-messenger">Telegram</label>
                    <input type="text" id="contacts-messenger" v-model="form.contacts_messenger" required>
                </div>

                <button class="submit-button" type="submit"
                        :disabled="isSubmitting">Применить
                </button>
            </form>
        </div>
        <mvc-spinner v-else></mvc-spinner>
        </div>


</template>

<style>

</style>