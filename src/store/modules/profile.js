import profileApi from '@/api/profile'


const state = {
    isSubmitting: false,
    isLoading: false,
    validationsErrors: null,
    successMessage: null,
    form: {
        id: null,
        name: null,
        surname: null,
        gender: null,
        sport_type: null,
        characteristics: null,
        athlete_photo: null,
        date_of_birth: null,
        city: null,
        contacts_messenger: null,
        user: null
    },
    photos: []
}

const mutationsTypes = {
    getDataStart: '[profile] getDataStart',
    getDataSuccess: '[profile] getDataSuccess',
    getDataFailure: '[profile] getDataFailure',

    putDataStart: '[profile] putDataStart',
    putDataSuccess: '[profile] putDataSuccess',
    putDataFailure: '[profile] putDataFailure',

    getUserprofileStart: '[profile] getUserprofileStart',
    getUserprofileSuccess: '[profile] getUserprofileSuccess',
    getUserprofileFailure: '[profile] getUserprofileFailure',

    clearUserprofileStart: '[profile] clearUserprofileStart',
    clearUserprofileSuccess: '[profile] clearUserprofileSuccess',
    clearUserprofileFailure: '[profile] clearUserprofileFailure',

    getUserProfilePhotosStart: '[profile] getUserProfilePhotosStart',
    getUserProfilePhotosSuccess: '[profile] getUserProfilePhotosSuccess',
    getUserProfilePhotosFailure: '[profile] getUserProfilePhotosFailure',

}

const mutations = {
    [mutationsTypes.getDataStart]() {
        state.isLoading = true,
            state.validationsErrors = null,
            state.successMessage = null
    },
    [mutationsTypes.getDataSuccess](state, payload) {
        state.form.id = payload.id,
            state.form.name = payload.name,
            state.form.surname = payload.surname,
            state.form.gender = payload.gender,
            state.form.sport_type = payload.sport_type,
            state.form.characteristics = payload.characteristics,
            state.form.athlete_photo = payload.athlete_photo,
            state.form.user = payload.user,
            state.form.date_of_birth = payload.date_of_birth,
            state.form.city = payload.city,
            state.form.contacts_messenger = payload.contacts_messenger

            state.isLoading = false
    },
    [mutationsTypes.getDataFailure](state, payload) {
        state.validationsErrors = payload,
            state.isLoading = false
    },


    [mutationsTypes.putDataStart](state) {
        state.isSubmitting = true
        state.validationsErrors = null
        state.successMessage = null
    },
    [mutationsTypes.putDataSuccess](state, payload) {
        state.isSubmitting = false,

            state.form.id = payload.id,
            state.form.name = payload.name,
            state.form.surname = payload.surname,
            state.form.gender = payload.gender,
            state.form.sport_type = payload.sport_type,
            state.form.characteristics = payload.characteristics,
            state.form.inventory_photo = payload.inventory_photo,
            state.form.athlete_photo = payload.athlete_photo,
            state.form.user = payload.user,
            state.form.date_of_birth = payload.date_of_birth,
            state.form.city = payload.city,
            state.form.contacts_messenger = payload.contacts_messenger,

            state.successMessage = ['Данные успешно обновлены!']
    },
    [mutationsTypes.putDataFailure](state, errors) {
        state.validationsErrors = errors
        state.isSubmitting = false
    },

    [mutationsTypes.getUserprofileStart]() {
    },
    [mutationsTypes.getUserprofileSuccess](state, payload) {
        state.form = payload
    },
    [mutationsTypes.getUserprofileFailure]() {
    },

    [mutationsTypes.clearUserprofileStart]() {
    },
    [mutationsTypes.clearUserprofileSuccess](state) {
        state.validationsErrors = null,
            state.form.id = null,
            state.form.name = null,
            state.form.surname = null,
            state.form.gender = null,
            state.form.sport_type = null,
            state.form.characteristics = null,
            state.form.athlete_photo = null,
            state.form.user = null,
            state.form.date_of_birth = null,
            state.form.city = null,
            state.form.contacts_messenger = null

    },

    [mutationsTypes.getUserProfilePhotosStart](state) {
        state.photos = []
        state.isLoading = true
    },
    [mutationsTypes.getUserProfilePhotosSuccess](state, payload) {
        state.photos = payload
        state.isLoading = false
    },
    [mutationsTypes.getUserProfilePhotosFailure](state) {
        state.isLoading = false
    }
}


const actions = {
    get_data(context, uuid) {
        return new Promise(() => {
            context.commit(mutationsTypes.getDataStart)
            profileApi.getProfile(uuid)
                .then(response => {
                    context.commit(mutationsTypes.getDataSuccess, response.data)
                    const serializeObject = JSON.stringify(state.form)
                    localStorage.setItem('userprofile', serializeObject)
                })
                .catch(e => {
                    console.log('Ошибка добавления профиля в state', e)
                    context.commit(mutationsTypes.getDataFailure, e)
                })
        })
    },

    put_data(context, payload) {
        console.log('UUID', payload.myId)
        console.log('Передаваемые данные', payload.formData)
        return new Promise(() => {
            context.commit(mutationsTypes.putDataStart)
            profileApi.editProfile(payload.myId, payload.formData)
                .then(response => {
                    context.commit(mutationsTypes.putDataSuccess, response.data)
                    const serializeObject = JSON.stringify(state.form)
                    localStorage.setItem('userprofile', serializeObject)
                    console.log('Ответ сервера', response)
                })
                .catch(error => {
                    if (error.response) {
                        console.log('Массив ошибок', error.response.data);
                        console.log('Код ошибки', error.response.status);
                        context.commit(mutationsTypes.putDataFailure, error.response.data)
                    } else if (error.request) {
                        console.log('Ошибка при отправке запроса', error.request);
                    } else {
                        console.log('Другие ошибки', error.message);
                    }
                    console.log('Конфиг', error.config);
                })
        })
    },

    initUserProfile(context) {
        if (localStorage.getItem('userprofile')) {
            context.commit(mutationsTypes.getUserprofileStart)
            const userProfileFromLocalStorage = localStorage.getItem('userprofile');
            const dataFromLocalStorage = JSON.parse(userProfileFromLocalStorage);
            context.commit(mutationsTypes.getUserprofileSuccess, dataFromLocalStorage)
            console.log('userprofile обновился', dataFromLocalStorage)
            context.commit(mutationsTypes.getUserprofileFailure)
        } else {
            console.log('Ошибка, в localStorage нет userprofile')
        }
    },

    clearUserProfile(context) {
        context.commit(mutationsTypes.clearUserprofileStart)
        context.commit(mutationsTypes.clearUserprofileSuccess)
    },

    getUserProfilePhotos(context, uuid) {
        console.log('uuid', uuid)
        return new Promise(() => {
            context.commit(mutationsTypes.getUserProfilePhotosStart)
            profileApi.getUserProfilePhotos(uuid)
                .then(response => {
                    context.commit(mutationsTypes.getUserProfilePhotosSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getUserProfilePhotosFailure)
                })
        })
    }

}

const getters = {
    getUserProfile: state => {
        return state.form
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}



