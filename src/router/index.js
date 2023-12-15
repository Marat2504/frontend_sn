import {createRouter, createWebHashHistory} from 'vue-router'
import Register from "@/views/Register.vue";
import Authorization from "@/views/Authorization.vue";
import Home from "@/views/Home.vue";
import EditProfile from "@/views/EditProfile.vue";
import Teams from "@/views/Teams.vue";
import CreateTeam from "@/views/CreateTeam.vue";

import isLoggedIn from "@/helpers/functions"
import CurrentTeam from "@/views/CurrentTeam.vue";
import UserProfile from "@/views/UserProfile.vue";
import MyPhotos from "@/views/MyPhotos.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Authorization
    },
    {
        path: '/edit',
        name: 'editProfile',
        component: EditProfile,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/teams',
        name: 'teams',
        component: Teams
    },
    {
        path: '/create-team',
        name: 'createTeam',
        component: CreateTeam
    },
    {
        path: '/team/:slugTeam',
        name: 'teamProfile',
        component: CurrentTeam,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/:userProfileUuid',
        name: 'userProfile',
        component: UserProfile
    },
    {
        path: '/photos',
        name: 'myPhotos',
        component: MyPhotos
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = isLoggedIn.isUserLoggedIn()
    if (requiresAuth && !isAuthenticated) {
        next('/login'); // Перенаправляем на страницу входа
    } else {
        next();
    }
});


export default router
