import apiCurrentTeam from "@/api/currentTeam"

const state = {
    currentTeam: {},
    isLoading: false,
    teamAthletes: [],
    teamCaptain: {}
}

const mutationsTypes = {
    getCurrentTeamStart: '[currentTeam] getCurrentTeamStart',
    getCurrentTeamSuccess: '[currentTeam] getCurrentTeamSuccess',
    getCurrentTeamFailure: '[currentTeam] getCurrentTeamFailure',

    getAthletesTeamStart: '[currentTeam] getAthletesTeamStart',
    getAthletesTeamSuccess: '[currentTeam] getAthletesTeamSuccess',
    getAthletesTeamFailure: '[currentTeam] getAthletesTeamFailure',

    getCaptainTeamStart: '[currentTeam] getCaptainTeamStart',
    getCaptainTeamSuccess: '[currentTeam] getCaptainTeamSuccess',
    getCaptainTeamFailure: '[currentTeam] getCaptainTeamFailure',

    isSubscribeCurrentTeamStart: '[currentTeam] isSubscribeCurrentTeamStart',
    isSubscribeCurrentTeamSuccess: '[currentTeam] isSubscribeCurrentTeamSuccess',
    isSubscribeCurrentTeamFailure: '[currentTeam] isSubscribeCurrentTeamFailure',

    changeUserStatusStart: '[currentTeam] changeUserStatusStart',
    changeUserStatusSuccess: '[currentTeam] changeUserStatusSuccess',
    changeUserStatusFailure: '[currentTeam] changeUserStatusFailure',
}

const mutations = {
    [mutationsTypes.getCurrentTeamStart](state) {
        state.currentTeam = {}
        state.isLoading = true
    },
    [mutationsTypes.getCurrentTeamSuccess](state, payload) {
        state.currentTeam = payload
        state.isLoading = false
    },
    [mutationsTypes.getCurrentTeamFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.getAthletesTeamStart](state) {
        state.isLoading = true
        state.teamAthletes = []
    },
    [mutationsTypes.getAthletesTeamSuccess](state, payload) {
        state.isLoading = false
        state.teamAthletes = payload
    },
    [mutationsTypes.getAthletesTeamFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.getCaptainTeamStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.getCaptainTeamSuccess](state, payload) {
        state.teamCaptain = payload
        state.isLoading = false
    },
    [mutationsTypes.getCaptainTeamFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.isSubscribeCurrentTeamStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.isSubscribeCurrentTeamSuccess](state) {
        state.isLoading = false
        state.currentTeam.is_user_member = !state.currentTeam.is_user_member
    },
    [mutationsTypes.isSubscribeCurrentTeamFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.changeUserStatusStart]() {},
    [mutationsTypes.changeUserStatusSuccess](state, userProfile) {
        const index = state.teamAthletes.findIndex(obj => obj.id === userProfile.id)
        if (index !== -1) {
            state.teamAthletes.splice(index, 1)
        } else {
            state.teamAthletes.push(userProfile)
        }
    },
    [mutationsTypes.changeUserStatusFailure]() {}
}

const actions = {
    getCurrentTeam(context, slugTeam) {
        return new Promise(() => {
            context.commit(mutationsTypes.getCurrentTeamStart)
            apiCurrentTeam.getCurrentTeam(slugTeam)
                .then(response => {
                    console.log('Текущая команда', response.data)
                    context.commit(mutationsTypes.getCurrentTeamSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getCurrentTeamFailure)
                })

        })
    },

    getAthletesTeam(context, slugTeam) {
        return new Promise(() => {
            context.commit(mutationsTypes.getAthletesTeamStart)
            apiCurrentTeam.getTeamAthletes(slugTeam)
                .then(response => {
                    console.log('Список спортсменов в команде', response.data)
                    context.commit(mutationsTypes.getAthletesTeamSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getAthletesTeamFailure)
                })
        })
    },

    getCaptainTeam(context, slugTeam) {
        return new Promise(() => {
            context.commit(mutationsTypes.getCaptainTeamStart)
            apiCurrentTeam.getCaptainTeam(slugTeam)
                .then(response => {
                    console.log('Профиль капитана команды', response.data)
                    context.commit(mutationsTypes.getCaptainTeamSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getCaptainTeamFailure)
                })
        })
    },

    isSubscribeCurrentTeam(context, credentials) {
        return new Promise(() => {
            context.commit(mutationsTypes.isSubscribeCurrentTeamStart)
            apiCurrentTeam.isSubscribeCurrentTeam(credentials)
                .then(() => {
                    context.commit(mutationsTypes.isSubscribeCurrentTeamSuccess)
                })
                .catch(() => {
                    console.log('Ошибка при подписке/отписке текущей команды')
                })
        })
    },

    changeUserStatus(context, userProfile) {
        return new Promise(() => {
            console.log('userProfile', userProfile)
            context.commit(mutationsTypes.changeUserStatusStart)
            context.commit(mutationsTypes.changeUserStatusSuccess, userProfile)
            context.commit(mutationsTypes.changeUserStatusFailure)
        })
    }
}

const getters = {
    getCurrentTeam: state => {
        return state.currentTeam
    }
}

export default {
    state, mutationsTypes, mutations, actions, getters
}