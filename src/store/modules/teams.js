import apiTeams from "@/api/teams"

const state = {
    allTeams: [],
    allTeamsCopy: [],
    isLoading: false,
    isSubmitting: false,
    isSubmittingMassage: null,

}

const mutationsTypes = {
    getAllTeamsStart: '[teams] getAllTeamsStart',
    getAllTeamsSuccess: '[teams] getAllTeamsSuccess',
    getAllTeamsFailure: '[teams] getAllTeamsFailure',


    isSubscribeStart: '[teams] isSubscribeStart',
    isSubscribeSuccess: '[teams] isSubscribeSuccess',
    isSubscribeFailure: '[teams] isSubscribeFailure',

    createNewTeamStart: '[teams] createNewTeamStart',
    createNewTeamSuccess: '[teams] createNewTeamSuccess',
    createNewTeamFailure: '[teams] createNewTeamFailure',

    getClearIsSubmittingMassageStart: '[teams] getClearIsSubmittingMassageStart',
    getClearIsSubmittingMassageSuccess: '[teams] getClearIsSubmittingMassageSuccess',
    getClearIsSubmittingMassageFailure: '[teams] getClearIsSubmittingMassageFailure',

    sortedTeamStart: '[teams] sortedTeamStart',
    sortedTeamSuccess: '[teams] sortedTeamSuccess',
    sortedTeamFailure: '[teams] sortedTeamFailure',

    searchTeamStart: '[teams] searchTeamStart',
    searchTeamSuccess: '[teams] searchTeamSuccess',
    searchTeamFailure: '[teams] searchTeamFailure',


}

const mutations = {
    [mutationsTypes.getAllTeamsStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.getAllTeamsSuccess](state, payload) {
        state.allTeams = payload
        state.allTeamsCopy = payload
        state.isLoading = false
    },
    [mutationsTypes.getAllTeamsFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.isSubscribeStart](state) {
        state.isSubmitting = true
        state.allTeamsCopy = []
    },
    [mutationsTypes.isSubscribeSuccess](state, payload) {
        state.isSubmitting = false
        const currentObject = state.allTeams.find(obj => obj.id === payload)
        if (currentObject) {
            if (currentObject.is_user_member) {
                currentObject.count_members -= 1
            } else {
                currentObject.count_members += 1
            }
            currentObject.is_user_member = !currentObject.is_user_member
        }
        state.allTeamsCopy = [...state.allTeams]
    },
    [mutationsTypes.isSubscribeFailure](state) {
        state.isSubmitting = false
    },

    [mutationsTypes.createNewTeamStart](state) {
        state.isSubmitting = true
        state.isSubmittingMassage = []
    },
    [mutationsTypes.createNewTeamSuccess](state, payload) {
        state.allTeams.push(payload)
        state.allTeamsCopy.push(payload)
        state.isSubmitting = false
        state.isSubmittingMassage = [`Поздравляем, команда "${payload.name}" успешно создана!`]
    },
    [mutationsTypes.createNewTeamFailure](state, payload) {
        state.isSubmitting = false
        state.isSubmittingMassage = payload
    },

    [mutationsTypes.getClearIsSubmittingMassageStart](state) {
        state.isSubmittingMassage = null
    },
    [mutationsTypes.getClearIsSubmittingMassageSuccess]() {},
    [mutationsTypes.getClearIsSubmittingMassageFailure]() {},

    [mutationsTypes.sortedTeamStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.sortedTeamSuccess](state, payload) {
        if (payload === 'count') {
            state.allTeams.sort((a, b) => b.count_members - a.count_members)
        } else if (payload === 'name') {
            state.allTeams.sort((a, b) => a.name.localeCompare(b.name))
        }
        state.isLoading = false
    },
    [mutationsTypes.sortedTeamFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.searchTeamStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.searchTeamSuccess](state, payload) {

        state.allTeams = state.allTeamsCopy
            .filter(obj => obj.name.toLowerCase().includes(payload.toLowerCase()) ||
            obj.description.toLowerCase().includes(payload.toLowerCase()))
        state.isLoading = false
    },
    [mutationsTypes.searchTeamFailure](state) {
        state.isLoading = false
    }

}

const actions = {
    getAllTeams(context) {
        return new Promise(() => {
            context.commit(mutationsTypes.getAllTeamsStart)
            apiTeams.getAllTeams()
                .then(response => {
                    context.commit(mutationsTypes.getAllTeamsSuccess, response.data)
                })
                .catch(e => {
                    console.log('Ошибка получения всех существующих команд', e)
                })
        })
    },

    isSubmitting(context, credentials) {
        return new Promise(() => {
            context.commit(mutationsTypes.isSubscribeStart)
            apiTeams.isSubscribe(credentials)
                .then(() => {
                    context.commit(mutationsTypes.isSubscribeSuccess, credentials.team)
                })
                .catch(() => {
                    console.log('ошибка при подписке/отписке')
                    context.commit(mutationsTypes.isSubscribeFailure)
                })
        })
    },

    createNewTeam(context, credentials) {
        return new Promise(() => {
            context.commit(mutationsTypes.createNewTeamStart)
            console.log('Полученные данные из формы', credentials)
            apiTeams.createTeam(credentials)
                .then(response => {
                    context.commit(mutationsTypes.createNewTeamSuccess, response.data)
                })
                .catch(e => {
                    console.log('Ошибка при создании новой команды', e)
                    context.commit(mutationsTypes.createNewTeamFailure, e)
                })
        })
    },

    clearIsSubmitMessage(context) {
        context.commit(mutationsTypes.getClearIsSubmittingMassageStart)
    },

    sortedTeams(context, sortedType) {
        console.log('Sorted type selected', sortedType)
        context.commit(mutationsTypes.sortedTeamStart)
        try {
            context.commit(mutationsTypes.sortedTeamSuccess, sortedType)
        } catch {
            context.commit(mutationsTypes.sortedTeamFailure)
        }
    },

    searchTeams(context, searchQuery) {
        console.log('searchQuery selected', searchQuery)
        context.commit(mutationsTypes.searchTeamStart)
        try {
            context.commit(mutationsTypes.searchTeamSuccess, searchQuery)
        }
        catch {
            context.commit(mutationsTypes.searchTeamFailure)
        }

    }


}


export default {
    state, mutations, actions, mutationsTypes
}