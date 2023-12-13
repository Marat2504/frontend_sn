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
    methods: {}

}
</script>

<template>
        <div class="sidebar_block">
            <div class="sidebar_image-img">
                <img :src="domain + userProfile.athlete_photo" alt="" srcset="">
            </div>
            <h2 class="sidebar-name">{{ userProfile.name }} {{ userProfile.surname }}</h2>
            <ul class="sidebar-menu">
                <li class="sidebar-item">
                    <router-link class="sidebar-link" :to="{name: 'profile'}">Редактировать профиль</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link class="sidebar-link" :to="{name: 'teams'}">Команды</router-link>
                </li>
            </ul>
        </div>
</template>

<style>

</style>