<template>
    <div class="register_container">
        <h2 class="h2-auth">Авторизация</h2>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="username">Логин:</label>
                <input
                        v-model="form.username"
                        type="text"
                        id="username"
                        name="username"
                        required
                >
            </div>
            <div class="form-group">
                <label for="password1">Пароль:</label>
                <input
                        v-model="form.password"
                        type="password"
                        id="password1"
                        name="password1"
                        required
                >
            </div>
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

            <input
                    type="submit"
                    value="Войти"
                    :disabled="isSubmitting"
            >
        </form>
    </div>
</template>


<script>

export default {
    name: 'MvcAuthorization',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.state.auth.validationsErrors = []

            if (this.form.username === '') {
                this.errors.push('Поле Логин не заполнено')
            }
            if (this.form.password === '') {
                this.errors.push('Поле Пароль не заполнено')
            }

            if (this.errors.length === 0) {
                console.log('Данные отправлены на сервер')
                this.$store.dispatch('authenticated', this.form)
                        .then(response => {
                            if (response === true) {
                                this.$store.dispatch('getUserInfo')
                                        .then(res => {
                                            this.$store.dispatch('get_data', localStorage.getItem('user.profile'))
                                            location.reload()
                                            if (res === true) {
                                                this.$router.push({
                                                    name: 'userProfile',
                                                    params: {
                                                        userProfileId: localStorage.getItem('user.profile')
                                                    }
                                                })
                                            }
                                        })
                            }
                        })
            }
        }
    },
    computed: {
        isSubmitting() {
            return this.$store.state.auth.isSubmitting
        },
        errors() {
            return this.$store.state.auth.validationsErrors
        },
        isLoggedIn() {
            return this.$store.auth.isLoggedIn
        }
    }

}

</script>


<style scoped>

</style>