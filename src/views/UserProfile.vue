<script>

import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"


export default {
    name: 'MvcUserProfile',
    data() {
        return {
            domain: domainConst.domain,
            form: null,
            photo: null,
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoading: state => state.profile.isLoading,
            isSubmitting: state => state.profile.isSubmitting,
            validationsErrors: state => state.profile.validationsErrors
        })
    },

    methods: {
        submitForm() {
            this.dataUpdate = null
            const myId = this.$store.getters['getUserProfileId']
            if (this.photo !== null) {
                this.form.athlete_photo = this.photo
                this.$store.dispatch('put_data', {myId: myId, formData: this.form})
                this.photo = null
            } else {
                this.$store.dispatch('put_data', {myId: myId, formData: this.form})
            }


        },
        handleAthletePhoto(event) {
            this.photo = event.target.files[0]
        }
    },

    beforeCreate() {
        const myId = this.$store.getters['getUserProfileId']
        this.$store.dispatch('get_data', myId)
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.userProfile));
        delete this.form.athlete_photo
    },
    mounted() {

    }
}

</script>
<template>
    <div class="profile_block class-flex">
        <h2>Редактирование профиля</h2>
        <div v-if="!isLoading">

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
                    <label class="profile-block-label" for="characteristics">Антропометрические данные</label>
                    <textarea id="characteristics" v-model="form.characteristics" required></textarea>
                </div>
                <div class="form-group">
                    <label class="profile-block-label" for="inventory">Инвентарь</label>
                    <textarea id="inventory" v-model="form.inventory" required></textarea>
                </div>
                <div class="form-group">
                    <label class="profile-block-label" for="athlete-photo">Аватар</label>
                    <input type="file" id="athlete-photo" @change="handleAthletePhoto">
                </div>
                <!--    <label class="profile-block-label" for="inventory-photo">Inventory Photo:</label>-->
                <!--    <input type="file" id="inventory-photo" @change="onPhotoChange">-->


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
                    <textarea id="contacts-messenger" v-model="form.contacts_messenger" required></textarea>
                </div>


                <button class="submit-button" type="submit"
                        :disabled="isSubmitting">Применить
                </button>
            </form>
        </div>
        <div class="loader" v-else>
        </div>
        <div v-if="validationsErrors">
            <ul v-for="error in validationsErrors" :key="error">
                <li>{{ error[0] }}</li>
            </ul>
        </div>
    </div>
</template>

<style>

</style>