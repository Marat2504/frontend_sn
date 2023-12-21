<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const";

export default {
    name: 'MvcSideBar',
    data() {
        return {
            domain: domainConst.domain
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.profile.form
        })
    },
    methods: {
        // getUserProfileId() {
        //     const userProfile = JSON.parse(localStorage.getItem('userprofile'))
        //     this.$store.dispatch('get_data', userProfile.id)
        //     console.log('userProfile.id', userProfile.id)
        //     return userProfile.id
        // }
    }

}
</script>

<template>
    <div class="sidebar_block">
        <ul class="sidebar-menu">

            <router-link class="sidebar-link"
                         :to="{name: 'userProfile', params: {userProfileId: 'f7e758af-e58d-42b6-bf7e-2eb86bdaa470'}}">
                <li class="sidebar-item"><i class="fa fa-user-circle-o" aria-hidden="true">&nbsp;&nbsp;</i>Мой профиль</li>
            </router-link>


            <router-link class="sidebar-link" :to="{name: 'teams'}">
                <li class="sidebar-item"><i class="fa fa-users" aria-hidden="true">&nbsp;&nbsp;</i>Команды</li>
            </router-link>


            <router-link class="sidebar-link" :to="{name: 'myPhotos'}">
                <li class="sidebar-item"><i class="fa fa-picture-o" aria-hidden="true">&nbsp;&nbsp;</i>Фотографии</li>
            </router-link>

        </ul>
    </div>
</template>

<style>

</style>