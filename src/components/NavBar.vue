<script>
import {mapState} from "vuex";

export default {
  name: 'MvcNavBar',
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.isLoggedIn,
      username: state => state.auth.user.username
    })

  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
      this.$router.push({name: 'home'})
    }
  }
}

</script>


<template>
  <header>
    <nav style="padding: 0">
      <div class="menu-block container">
        <h1 class="menu-title">
          <router-link :to="{name: 'home'}"><span class="nav-logo">YOUR SPORT</span></router-link>
        </h1>
        <ul class="menu-list">
          <template v-if="!isLoggedIn">
            <li class="menu-item">
              <router-link :to="{name: 'register'}" class="menu-item-link">Регистрация</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{name: 'login'}" class="menu-item-link">Логин</router-link>
            </li>
          </template>
          <template v-if="isLoggedIn">
            <li class="menu-item">
              <i class="fa fa-comments fa-2x" aria-hidden="true"></i>
            </li>
            <li class="menu-item">
              <i class="fa fa-envelope fa-2x" aria-hidden="true"></i>
            </li>
            <li class="menu-item">
              <i class="fa fa-bell fa-2x" aria-hidden="true"></i>
            </li>

            <li class="menu-item menu-item-link" @click="logout">
              <RouterLink :to="{name: 'login'}" class="menu-item-link">
              <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i>
              </RouterLink>
            </li>
          </template>

        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>