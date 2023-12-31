import apiWorkout from "@/api/workout"

const state = {
    isSubmitting: false,
    isLoading: false,
    tracks: [],
    successMessage: [],
    errorMessage: [],
}

const mutationsTypes = {
    sendTrackStart: '[workout] sendTrackStart',
    sendTrackSuccess: '[workout] sendTrackSuccess',
    sendTrackFailure: '[workout] sendTrackFailure',

    getAllTrackStart: '[workout] getAllTrackStart',
    getAllTrackSuccess: '[workout] getAllTrackSuccess',
    getAllTrackFailure: '[workout] getAllTrackFailure',

    editTrackStart: '[workout] editTrackStart',
    editTrackSuccess: '[workout] editTrackSuccess',
    editTrackFailure: '[workout] editTrackFailure',

    delTrackStart: '[workout] delTrackStart',
    delTrackSuccess: '[workout] delTrackSuccess',
    delTrackFailure: '[workout] delTrackFailure',

    cleanMessageStart: '[workout] cleanMessageStart',
    cleanMessageSuccess: '[workout] cleanMessageSuccess',
    cleanMessageFailure: '[workout] cleanMessageFailure',

}

const mutations = {
    [mutationsTypes.sendTrackStart](state) {
        state.successMessage = []
        state.errorMessage = []
        state.isSubmitting = true
    },
    [mutationsTypes.sendTrackSuccess](state, payload) {
        state.isSubmitting = false
        state.tracks.unshift(payload)
        state.successMessage = ['Трек успешно загружен']
    },
    [mutationsTypes.sendTrackFailure]() {
        state.isSubmitting = false
        state.errorMessage = ['Ошибка при загрузки трека']
    },

    [mutationsTypes.getAllTrackStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.getAllTrackSuccess](state, payload) {
        state.tracks = payload
        state.isLoading = false
    },
    [mutationsTypes.getAllTrackFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.editTrackStart](state) {
        state.successMessage = []
        state.errorMessage = []
    },
    [mutationsTypes.editTrackSuccess](state, payload) {
        const index = state.tracks.findIndex(track => track.id === payload.id)
        console.log(index)
        if (index !== -1) {
            state.tracks[index] = payload
        }
    },
    [mutationsTypes.editTrackFailure](state) {
        state.successMessage = ['Трек изменен']
    },

    [mutationsTypes.delTrackStart](state) {
        state.successMessage = []
        state.errorMessage = []
    },
    [mutationsTypes.delTrackSuccess](state, payload) {
        console.log('из мутации', payload)
        state.tracks = state.tracks.filter(track => (track.id !== payload.id))
        state.successMessage = ['Трек удален']
    },
    [mutationsTypes.delTrackFailure](state) {
        state.errorMessage = ['Ошибка!']
    },

    [mutationsTypes.cleanMessageStart](state) {
        state.successMessage = []
        state.errorMessage = []
    },
    [mutationsTypes.cleanMessageSuccess]() {},
    [mutationsTypes.cleanMessageFailure]() {},

}

const actions = {
    sendTrack(context, payload) {
        return new Promise(() => {
            context.commit(mutationsTypes.sendTrackStart)
            apiWorkout.sendTrack(payload.profile, payload.data)
                .then(response => {
                    context.commit(mutationsTypes.sendTrackSuccess, response.data)
                    console.log('ответ с сервера', response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.sendTrackFailure)
                })
        })
    },

    getAllTracks(context, profileId) {
        return new Promise(() => {
            context.commit(mutationsTypes.getAllTrackStart)
            apiWorkout.getAllTracks(profileId)
                .then(response => {
                    context.commit(mutationsTypes.getAllTrackSuccess, response.data)
                })
                .catch(() => {
                    console.log('ошибка при получении треков')
                })
        })
    },

    editTrack(context, track) {
        return new Promise(() => {
            context.commit(mutationsTypes.editTrackStart)
            apiWorkout.editTrack(track)
                .then(response => {
                    console.log('Полученный трек после редактирования', response.data)
                    context.commit(mutationsTypes.editTrackSuccess, response.data)
                })
                .catch(() => {
                    console.log('Ошибка при изменении трека')
                    context.commit(mutationsTypes.editTrackFailure)
                })
        })
    },

    delTrack(context, track) {
        return new Promise(() => {
            context.commit(mutationsTypes.delTrackStart)
            apiWorkout.delTrack(track)
                .then(() => {
                    context.commit(mutationsTypes.delTrackSuccess, track)
                })
                .catch(() => {
                    console.log('Ошибка при удалении трека')
                })
        })
    },

    cleanMessage(context) {
        context.commit(mutationsTypes.cleanMessageStart)
    }

}


export default {
    state, mutations, actions, mutationsTypes
}