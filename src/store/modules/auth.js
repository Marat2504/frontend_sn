import authApi from '@/api/auth'
import axios from "axios";


const state = {
    isSubmitting: false,
    validationsErrors: [],
    isLoggedIn: null,
    user: {
        access: null,
        refresh: null,
        username: null,
        email: null,
        id: null,
        profile: null
    }
}

const mutationsTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    authenticatedStart: '[auth] authenticatedStart',
    authenticatedSuccess: '[auth] authenticatedSuccess',
    authenticatedFailure: '[auth] authenticatedFailure'

}

const mutations = {
    [mutationsTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationsErrors = []
    },
    [mutationsTypes.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = false
    },
    [mutationsTypes.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationsErrors = payload
    },

    [mutationsTypes.authenticatedStart](state) {
        state.isSubmitting = true
        state.validationsErrors = []
    },
    [mutationsTypes.authenticatedSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationsTypes.authenticatedFailure](state, payload) {
        state.isSubmitting = false
        state.validationsErrors = payload
    },

    initStore(state) {
        if (localStorage.getItem('user.access')) {
            state.user.access = localStorage.getItem('user.access')
            state.user.refresh = localStorage.getItem('user.refresh')
            state.user.id = localStorage.getItem('user.id')
            state.user.username = localStorage.getItem('user.username')
            state.user.email = localStorage.getItem('user.email')
            state.user.profile = localStorage.getItem('user.profile')
            state.isLoggedIn = localStorage.getItem('user.isLoggedIn')

            console.log('Загрузка токена из LocalStorage')
        }
    },
    setToken(state, data) {
        console.log('Запись токена в LocalStorage', data)

        state.user.access = data.access
        state.user.refresh = data.refresh
        state.isLoggedIn = true

        localStorage.setItem('user.access', data.access)
        localStorage.setItem('user.refresh', data.refresh)
        localStorage.setItem('user.isLoggedIn', String(true))
    },
    removeToken(state) {
        console.log('Удаление токена из LocalStorage')

        state.user.refresh = null
        state.user.access = null
        state.user.id = null
        state.user.username = null
        state.user.email = null
        state.user.profile = null
        state.isLoggedIn = false

        localStorage.setItem('user.access', '')
        localStorage.setItem('user.refresh', '')
        localStorage.setItem('user.id', '')
        localStorage.setItem('user.username', '')
        localStorage.setItem('user.email', ''),
            localStorage.setItem('user.profile', ''),
            localStorage.setItem('user.isLoggedIn', '')
    },
    setUserInfo(state, user) {
        console.log('Получение данных о пользователе', user)

        state.user.id = user.id
        state.user.username = user.username
        state.user.email = user.email
        state.user.profile = user.profile

        localStorage.setItem('user.id', state.user.id)
        localStorage.setItem('user.username', state.user.username)
        localStorage.setItem('user.email', state.user.email)
        localStorage.setItem('user.profile', state.user.profile)

        console.log('Текущий пользователь', state.user)
    }
}

const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.registerStart)
            authApi.register(credentials)
                .then(response => {
                    console.log('response', response)
                    if (response.data.status === 'success') {
                        console.log('Пользователь зарегистрирован')
                        context.commit(mutationsTypes.registerSuccess, response.data)
                        resolve({submits: ['Поздравляем!', 'Вы успешно зарегистрировались!']})
                    } else {
                        console.log('Пользователь не зарегистрирован', response.data.errors)
                        context.commit(mutationsTypes.registerFailure, response.data.errors)
                        resolve({errors: response.data.errors})
                    }
                })
                .catch(result => {
                    context.commit(mutationsTypes.registerFailure, result.data.errors)
                    console.log('result errors', result)
                })
        })
    },

    refreshToken(context) {
        return new Promise(() => {
            authApi.refreshToken({'refresh': state.user.refresh})
                .then(response => {
                    state.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                    console.log('Refresh token обновлен')
                })
                .catch(error => {
                    console.log('Ошибка обновления токена', error)
                    context.commit('removeToken')
                })
        })
    },

    authenticated(context, credentials) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.authenticatedStart)
            authApi.authenticated(credentials)
                .then(response => {
                    console.log('Ответ сервера на предоставленные логин и пароль', response)
                    context.commit('setToken', response.data)
                    context.commit(mutationsTypes.authenticatedSuccess)

                    axios.defaults.headers.common["Authorization"] = 'Bearer ' + response.data.access
                    resolve(true)
                })
                .catch(error => {
                    console.log('error', error)
                    context.commit(mutationsTypes.authenticatedFailure, ['Ошибка авторизации'])
                })
        })
    },

    getUserInfo(context) {
        return new Promise((resolve) => {
            authApi.userInfo()
                .then(response => {
                    context.commit('setUserInfo', response.data)
                    resolve(true)
                })
                .catch(error => {
                    console.log('Ошибка получения данных о пользователе', error)
                })
        })
    },

    userStore(context) {
        context.commit('initStore')
    },

    logoutUser(context) {
        context.commit('removeToken')
        localStorage.setItem('userprofile', '')
        context.dispatch('clearUserProfile')
    }
}

const getters = {
    getUserProfileId: state => {
        return state.user.profile
    },

    getUser: state => {
        return state.user
    },

    isLoggedIn: state => {
        return state.isLoggedIn
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
