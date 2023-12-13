import apiCurrentTeam from "@/api/currentTeam"

const state = {
    currentTeam: null,
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
}

const mutations = {
    [mutationsTypes.getCurrentTeamStart](state) {
        state.currentTeam = null
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
    }
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
    }
}


export default {
    state, mutationsTypes, mutations, actions
}