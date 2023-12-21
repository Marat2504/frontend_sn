<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"
import MvcPhotoPreview from "@/components/PhotoPreview.vue";

export default {
    name: 'MvcUserProfile',
    components: {MvcPhotoPreview},
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoading: state => state.profile.isLoading,
            photos: state => state.profile.photos
        })
    },
    data() {
        return {
            isUserProfile: null,
            domain: domainConst.domain,
            uuidRoute: this.$route.params.userProfileId,
            userProfileUuid: this.$store.getters['getUserProfileId']
        }
    },
    beforeCreate() {
        const uuidProfile = this.$route.params.userProfileId
        this.$store.dispatch('getDataOtherUser', uuidProfile)

        this.$store.dispatch('getUserProfilePhotos', uuidProfile)
    },
    methods: {},
    watch: {
        $route(newRoute, oldRoute) {
            console.log('oldRoute', oldRoute)
            this.uuidRoute = newRoute.params.userProfileId
            this.$store.dispatch('getDataOtherUser', this.uuidRoute)
            this.$store.dispatch('getUserProfilePhotos', this.uuidRoute)
        }
    }
}
</script>

<template>
    <div class="userProfileContainer">
        <div class="userProfileBlock">

            <div class="userProfileBlock-graph">
                <div v-if="!isLoading" class="userProfileBlock-img">
                    <img :src="domain + userProfile.athlete_photo" alt="" srcset="">
                </div>
                <div v-else class="loader"></div>

                <div
                        v-if="uuidRoute === userProfileUuid"
                        class="userProfileBlock-button">
                    <router-link class="userProfileBlock_link" :to="{name: 'editProfile'}">Редактировать профиль
                    </router-link>
                </div>
                <h4>Подписчиков 5</h4>
                <h4>Подписок 10</h4>
            </div>


            <div v-if="!isLoading" class="profile-table">
                <h2>{{ userProfile.name }} {{ userProfile.surname }}</h2>
                <table>
                    <tr>
                        <td class="profile-table-title">Город</td>
                        <td>{{ userProfile.city }}</td>
                    </tr>
                    <tr>
                        <td class="profile-table-title">Дата рождения</td>
                        <td>{{ userProfile.date_of_birth }}</td>
                    </tr>
                    <tr>
                        <td class="profile-table-title">Пол</td>
                        <td v-if="userProfile.gender == 'male'">Мужской</td>
                        <td v-else>Женский</td>
                    </tr>
                    <tr>
                        <td class="profile-table-title">Вид спорта</td>
                        <td v-if="userProfile.sport_type==='ski'">Лыжные гонки</td>
                        <td v-if="userProfile.sport_type==='run'">Легкая атлетика</td>
                    </tr>
                    <tr>
                        <td class="profile-table-title">Telegram</td>
                        <td>{{ userProfile.contacts_messenger }}</td>
                    </tr>
                    <tr>
                        <td class="profile-table-title">О себе</td>
                        <td>{{ userProfile.characteristics }}</td>
                    </tr>
                </table>
            </div>
            <div v-else class="loader"></div>

        </div>
        <mvc-photo-preview
                :isLoading="isLoading"
                :domain="domain"
                :photos="photos">
        </mvc-photo-preview>
    </div>

</template>

<style scoped>
</style>