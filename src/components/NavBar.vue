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
          <router-link :to="{name: 'home',}">
              <div class="menu-block_logo">
              <img src="/logo.png" alt="logo">
          </div>
          </router-link>

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