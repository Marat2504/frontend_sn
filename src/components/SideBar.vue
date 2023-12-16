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
        <ul class="sidebar-menu">
            <li class="sidebar-item">
                <router-link class="sidebar-link"
                             :to="{name: 'userProfile'}">Мой профиль
                </router-link>
            </li>
            <li class="sidebar-item">
                <router-link class="sidebar-link" :to="{name: 'editProfile'}">Редактировать профиль</router-link>
            </li>
            <li class="sidebar-item">
                <router-link class="sidebar-link" :to="{name: 'teams'}">Команды</router-link>
            </li>
            <li class="sidebar-item">
                <router-link class="sidebar-link" :to="{name: 'myPhotos'}">Фотографии</router-link>
            </li>
        </ul>
    </div>
</template>

<style>

</style>