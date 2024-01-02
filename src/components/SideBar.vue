<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const";

export default {
    name: 'MvcSideBar',
    data() {
        return {
            domain: domainConst.domain,
            userId: null
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoggedIn: state => state.auth.isLoggedIn
        })
    },
    methods: {
        // getUserProfileId() {
        //     const userProfile = JSON.parse(localStorage.getItem('userprofile'))
        //     this.$store.dispatch('get_data', userProfile.id)
        //     console.log('userProfile.id', userProfile.id)
        //     return userProfile.id
        // }
    },
    created() {
        const id = localStorage.getItem('user.profile')
        if (id && id !== '') {
            this.userId = id
        }
    }

}
</script>

<template>
    <div class="sidebar_block" v-if="isLoggedIn">
        <ul class="sidebar-menu">

            <!--            <router-link-->
            <!--                    v-if="userId === null"-->
            <!--                    class="sidebar-link"-->
            <!--                    :to="{name: 'userProfile', params: {userProfileId: userProfile.id}}">-->
            <!--                <li class="sidebar-item"><i class="fa fa-user-circle-o" aria-hidden="true">&nbsp;&nbsp;</i>Мой профиль-->
            <!--                </li>-->
            <!--            </router-link>-->
            <router-link
                    v-if="userId"
                    class="sidebar-link"
                    :to="{name: 'userProfile', params: {userProfileId: userId}}">
                <li class="sidebar-item"><i class="fa fa-user-circle-o" aria-hidden="true">&nbsp;&nbsp;</i>Мой профиль
                </li>
            </router-link>


            <router-link class="sidebar-link" :to="{name: 'teams'}">
                <li class="sidebar-item"><i class="fa fa-users" aria-hidden="true">&nbsp;&nbsp;</i>Команды</li>
            </router-link>


            <router-link class="sidebar-link" :to="{name: 'myPhotos'}">
                <li class="sidebar-item"><i class="fa fa-picture-o" aria-hidden="true">&nbsp;&nbsp;</i>Фотографии</li>
            </router-link>

            <router-link class="sidebar-link" :to="{name: 'myFriends'}">
                <li class="sidebar-item"><i class="fa fa-user" aria-hidden="true">&nbsp;&nbsp;</i>Друзья</li>
            </router-link>

        </ul>
    </div>
</template>

<style>

</style>