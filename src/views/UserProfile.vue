<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"
import MvcPhotoPreview from "@/components/PhotoPreview.vue";
import MvcSpinner from "@/components/Spiner.vue";
import MvcTrackBlock from "@/components/TrackBlock.vue"
import MvcSubList from "@/components/subList.vue";

export default {
    name: 'MvcUserProfile',
    components: {MvcSubList, MvcSpinner, MvcPhotoPreview, MvcTrackBlock},
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoading: state => state.profile.isLoading,
            isLoad: state => state.subscription.isLoading,
            photos: state => state.profile.photos,
            subscribers: state => state.subscription.subscribers,
            subscriptions: state => state.subscription.subscriptions,
            isTargetUser: state => state.subscription.isTargetUser,
            tracks: state => state.workout.tracks,
        })
    },
    data() {
        return {
            isUserProfile: null,
            domain: domainConst.domain,
            uuidRoute: this.$route.params.userProfileId,
            userProfileUuid: this.$store.getters['getUserProfileId'],
            showModalSubscriptions: false,
            showModalSubscribers: false
        }
    },
    beforeCreate() {
        const uuidProfile = this.$route.params.userProfileId
        this.$store.dispatch('getDataOtherUser', uuidProfile)
        this.$store.dispatch('getUserProfilePhotos', uuidProfile)
        if (uuidProfile === localStorage.getItem('user.profile')) {
            this.$store.dispatch('getSubscribers')
            this.$store.dispatch('getSubscriptions')
        } else {
            this.$store.dispatch('getSubscribersWithProfileId', uuidProfile)
            this.$store.dispatch('getSubscriptionsWithProfileId', uuidProfile)
            this.$store.dispatch('isTargetUserWithProfileId', uuidProfile)
        }
        this.$store.dispatch('getAllTracks', uuidProfile)

    },
    methods: {
        subscribe() {
            this.$store.dispatch('isSub', this.uuidRoute)
        },
        UnSubscribe() {
            this.$store.dispatch('isUnSub', this.uuidRoute)
        },
        openModalSubscribers() {
            this.showModalSubscribers = true
        },
        openModalSubscriptions () {
            this.showModalSubscriptions = true
        }
    },
    watch: {
        $route(newRoute, oldRoute) {
            console.log('oldRoute', oldRoute)
            this.uuidRoute = newRoute.params.userProfileId
            this.$store.dispatch('getDataOtherUser', this.uuidRoute)
            this.$store.dispatch('getUserProfilePhotos', this.uuidRoute)
            this.$store.dispatch('getSubscribersWithProfileId', this.uuidRoute)
            this.$store.dispatch('getSubscriptionsWithProfileId', this.uuidRoute)
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
                <mvc-spinner v-else></mvc-spinner>

                <div
                        v-if="uuidRoute === userProfileUuid"
                        class="userProfileBlock-button">
                    <router-link class="userProfileBlock_link" :to="{name: 'editProfile'}">Редактировать профиль
                    </router-link>
                </div>
                <div class="userProfileBlock-sub">
                    <h3
                            @click="openModalSubscribers"
                    >Подписчиков &nbsp; {{ subscribers.length }}</h3>
                    <h3
                        @click="openModalSubscriptions"
                    >Подписок &nbsp; {{ subscriptions.length }}</h3>
                </div>
                <div v-if="uuidRoute !== userProfileUuid">
                    <button v-if="!isTargetUser"
                            class="submit-button"
                            @click="subscribe"
                            :disabled="isLoad"
                    >
                        Подписаться
                    </button>
                    <button v-else
                            class="submit-button submit-button-red"
                            @click="UnSubscribe"
                            :disabled="isLoad"
                    >
                        Отписаться
                    </button>
                </div>
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
            <mvc-spinner v-else></mvc-spinner>

        </div>
        <mvc-photo-preview
                :isLoading="isLoading"
                :domain="domain"
                :photos="photos">
        </mvc-photo-preview>

        <mvc-track-block
                :profile-id="uuidRoute"
                :tracks="tracks"
                :domain="domain"
        >
        </mvc-track-block>
    </div>


    <div v-if="showModalSubscriptions" class="modal" @click="showModalSubscriptions = false">
        <div class="modal-content">
            <span class="close" @click="showModalSubscriptions = false">&times;</span>

            <div class="modal-athletes-block">
                <mvc-sub-list
                        :domain="domain"
                        :athletes="subscriptions"
                        :is-loading="isLoading"
                        sub="subscriptions"
                >
                    Подписки
                </mvc-sub-list>
            </div>
        </div>
    </div>

    <div v-if="showModalSubscribers" class="modal" @click="showModalSubscribers = false">
        <div class="modal-content">
            <span class="close" @click="showModalSubscribers = false">&times;</span>
            <mvc-sub-list
                    :domain="domain"
                    :athletes="subscribers"
                    :is-loading="isLoading"
                    sub="subscribers"
            >
                Подписчики
            </mvc-sub-list>

        </div>
    </div>


</template>

<style scoped>
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 300px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>