<template>
    <nav-bar></nav-bar>
    <div class="main-content container">
        <mvc-side-bar v-if="isLoggedIn"></mvc-side-bar>
        <router-view/>
    </div>


</template>

<script>
import NavBar from "@/components/NavBar.vue";
import MvcSideBar from "@/components/SideBar.vue";
import {mapState} from "vuex";


export default {
    components: {
        MvcSideBar,
        NavBar
    },
    computed: {
      ...mapState({
          isLoggedIn: state => state.auth.isLoggedIn
      })
    },
    beforeCreate() {
        this.$store.dispatch('userStore')
        if (localStorage.getItem('user.access')) {
            this.$store.dispatch('refreshToken')
        }
        this.$store.dispatch('initUserProfile')

    },
    created() {

    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
