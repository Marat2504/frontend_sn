<template>

  <div class="register_container">
    <h2 class="h2-auth">Регистрация</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Почта:</label>
        <input
            v-model="form.email"
            type="email" id="email"
            name="email"
            required>
      </div>
      <div class="form-group">
        <label for="name">Логин:</label>
        <input
            v-model="form.username"
            type="text"
            id="name"
            name="name"
            required
        >
      </div>
      <div class="form-group">
        <label for="password1">Пароль:</label>
        <input
            v-model="form.password1"
            type="password"
            id="password1"
            name="password1"
            required
        >
      </div>
      <div class="form-group">
        <label for="password2">Повторите пароль:</label>
        <input
            v-model="form.password2"
            type="password"
            id="password2"
            name="password2"
            required
        >
      </div>
      <input
             type="submit"
             value="Зарегистрироваться"
             :disabled="isSubmitting">
    </form>

    <template v-if="errors">
      <div>
        <p
            class="error-message"
            v-for="error in errors"
            :key="error">
          {{ error }}
        </p>
      </div>
    </template>
    <template v-if="submits">
      <div>
        <p
            class="success-message"
            v-for="message in submits"
            :key="message">
          {{ message }}
        </p>
      </div>
    </template>
  </div>


</template>


<script>

export default {
  name: 'McvRegister',
  data() {
    return {
      form: {
        email: '',
        username: '',
        password1: '',
        password2: ''
      },
      errors: [],
      submits: []
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      this.submits =  []
      if (this.form.email === '') {
        this.errors.push('Поле Почта не заполнено')
      }
      if (this.form.username === '') {
        this.errors.push('Поле Логин не заполнено')
      }
      if (this.form.password1 === '') {
        this.errors.push('Поле Пароль не заполнено')
      }
      if (this.form.password1 !== this.form.password2) {
        this.errors.push('Пароли не совпадают')
      }

      if (this.errors.length === 0) {
        console.log('Форма регистрации отправлена')
        this.$store.dispatch('register', this.form)
            .then(response => {
                let key = Object.keys(response)
              if (key[0] === "submits") {
                this.submits = response.submits
                this.form.username = ''
                this.form.email = ''
                this.form.password1 = ''
                this.form.password2 = ''
                setTimeout(() => {
                  this.$router.push({name: 'login'})
                } , 2000)
              }
              else {
                this.errors = response.errors
              }

            })
      }
    },

  }
}
</script>


<style scoped>

</style>