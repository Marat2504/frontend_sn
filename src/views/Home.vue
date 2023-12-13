<template>
  <div class="container class-flex">
    <h1>Главная страница</h1>




  </div>
</template>


<script>

export default {
  name: 'MvcHome',
  components: {
  },

  data() {
    return {
        x: 'баян'
    }
  },

  methods: {
  },

  beforeCreate() {
    const myId = this.$store.getters['getUserProfileId']
    this.$store.dispatch('get_data', myId)
  }

}

</script>


<style scoped>

</style>