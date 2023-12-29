import subscriptionApi from "@/api/subscription"

const state = {
    subscribers: [],
    errorMessage: [],
    subscriptions: [],
    // подписан ли юзер на пользовтеля
    isTargetUser: false,
    isLoading: false,
}

const mutationsTypes = {

    getSubscribersStart: '[subscription] getSubscribersStart',
    getSubscribersSuccess: '[subscription] getSubscribersSuccess',
    getSubscribersFailure: '[subscription] getSubscribersFailure',

    getSubscriptionsStart: '[subscription] getSubscriptionsStart',
    getSubscriptionsSuccess: '[subscription] getSubscriptionsSuccess',
    getSubscriptionsFailure: '[subscription] getSubscriptionsFailure',

    getSubscribersWithProfileIdStart: '[subscription] getSubscribersWithProfileIdStart',
    getSubscribersWithProfileIdSuccess: '[subscription] getSubscribersWithProfileIdSuccess',
    getSubscribersWithProfileIdFailure: '[subscription] getSubscribersWithProfileIdFailure',

    getSubscriptionsWithProfileIdStart: '[subscription] getSubscriptionsWithProfileIdStart',
    getSubscriptionsWithProfileIdSuccess: '[subscription] getSubscriptionsWithProfileIdSuccess',
    getSubscriptionsWithProfileIdFailure: '[subscription] getSubscriptionsWithProfileIdFailure',

    isTargetUserWithProfileIdStart: '[subscription] isTargetUserWithProfileIdStart',
    isTargetUserWithProfileIdSuccess: '[subscription] isTargetUserWithProfileIdSuccess',
    isTargetUserWithProfileIdFailure: '[subscription] isTargetUserWithProfileIdFailure',

    isSubStart: '[subscription] isSubStart',
    isSubSuccess: '[subscription] isSubSuccess',
    isSubFailure: '[subscription] isSubFailure',

    isUnSubStart: '[subscription] isUnSubStart',
    isUnSubSuccess: '[subscription] isUnSubSuccess',
    isUnSubFailure: '[subscription] isUnSubFailure',
}

const mutations = {
    [mutationsTypes.getSubscribersStart](state) {
        state.subscribers = []
    },
    [mutationsTypes.getSubscribersSuccess](state, payload) {
        state.subscribers = payload
    },
    [mutationsTypes.getSubscribersFailure]() {
    },

    [mutationsTypes.getSubscriptionsStart](state) {
        state.subscriptions = []
    },
    [mutationsTypes.getSubscriptionsSuccess](state, payload) {
        state.subscriptions = payload
    },
    [mutationsTypes.getSubscriptionsFailure]() {
    },

    [mutationsTypes.getSubscribersWithProfileIdStart](state) {
        state.subscribers = []
    },
    [mutationsTypes.getSubscribersWithProfileIdSuccess](state, payload) {
        state.subscribers = payload
    },
    [mutationsTypes.getSubscribersWithProfileIdFailure]() {
    },

    [mutationsTypes.getSubscriptionsWithProfileIdStart](state) {
        state.subscriptions = []
    },
    [mutationsTypes.getSubscriptionsWithProfileIdSuccess](state, payload) {
        state.subscriptions = payload
    },
    [mutationsTypes.getSubscriptionsWithProfileIdFailure]() {
    },

    [mutationsTypes.isTargetUserWithProfileIdStart](state) {
        state.isTargetUser = null
    },
    [mutationsTypes.isTargetUserWithProfileIdSuccess](state, payload) {
        state.isTargetUser = payload[0]
    },
    [mutationsTypes.isTargetUserWithProfileIdFailure]() {
    },

    [mutationsTypes.isSubStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.isSubSuccess](state, payload) {
        state.isTargetUser = !state.isTargetUser
        state.isLoading = false
        state.subscribers.push(payload)
    },
    [mutationsTypes.isSubFailure](state) {
        state.isLoading = false
    },

    [mutationsTypes.isUnSubStart](state) {
        state.isLoading = true
    },
    [mutationsTypes.isUnSubSuccess](state, payload) {
        state.isTargetUser = !state.isTargetUser
        state.isLoading = false
        state.subscribers = state.subscribers.filter(sub => sub.id !== payload.id)
    },
    [mutationsTypes.isUnSubFailure](state) {
        state.isLoading = false
    },

}

const actions = {
    getSubscribers(context) {
        context.commit(mutationsTypes.getSubscribersStart)
        return new Promise(() => {
            subscriptionApi.getUserSubscribers()
                .then(response => {
                    console.log('Список подписчиков', response.data)
                    context.commit(mutationsTypes.getSubscribersSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getSubscribersFailure)
                    console.log('Ошибка получения подписчиков юзера')
                })
        })
    },

    getSubscriptions(context) {
        context.commit(mutationsTypes.getSubscriptionsStart)
        return new Promise(() => {
            subscriptionApi.getUserSubscriptions()
                .then(response => {
                    console.log('Список подписок', response.data)
                    context.commit(mutationsTypes.getSubscriptionsSuccess, response.data)
                })
                .catch(() => {
                        context.commit(mutationsTypes.getSubscriptionsFailure)
                        console.log('Ошибка получения подписок юзера')
                    }
                )
        })
    },

    getSubscribersWithProfileId(context, profileId) {
        context.commit(mutationsTypes.getSubscribersWithProfileIdStart)
        return new Promise(() => {
            subscriptionApi.getUserSubscribersWithProfileId(profileId)
                .then(response => {
                    console.log(`Список подписчиков пользователя ${profileId}`, response.data)
                    context.commit(mutationsTypes.getSubscribersWithProfileIdSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getSubscribersWithProfileIdFailure)
                    console.log(`Ошибка получения подписчиков пользователя ${profileId}`)
                })
        })
    },

    getSubscriptionsWithProfileId(context, profileId) {
        context.commit(mutationsTypes.getSubscriptionsWithProfileIdStart)
        return new Promise(() => {
            subscriptionApi.getUserSubscriptionsWithProfileId(profileId)
                .then(response => {
                    console.log(`Список подписок пользователя ${profileId}`, response.data)
                    context.commit(mutationsTypes.getSubscriptionsWithProfileIdSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.getSubscriptionsWithProfileIdFailure)
                    console.log(`Ошибка получения подписок пользователя ${profileId}`)
                })
        })
    },

    isTargetUserWithProfileId(context, profileId) {
        context.commit(mutationsTypes.isTargetUserWithProfileIdStart)
        return new Promise(() => {
            subscriptionApi.isTargetUserWithProfileId(profileId)
                .then(response => {
                    console.log(`Юзер подписан на пользователя ${profileId}?`, response.data)
                    context.commit(mutationsTypes.isTargetUserWithProfileIdSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.isTargetUserWithProfileIdFailure)
                    console.log(`Ошибка получения данных о подписке`)
                })
        })
    },

    isSub(context, profileId) {
        context.commit(mutationsTypes.isSubStart)
        return new Promise(() => {
            subscriptionApi.sub(profileId)
                .then(response => {
                    console.log(`Юзер подписался на пользователя ${profileId}`, response.data)
                    context.commit(mutationsTypes.isSubSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.isSubFailure)
                    console.log(`Ошибка при подписании на пользователя`)
                })
        })
    },

    isUnSub(context, profileId) {
        context.commit(mutationsTypes.isUnSubStart)
        return new Promise(() => {
            subscriptionApi.unsub(profileId)
                .then(response => {
                    console.log(`Юзер отписался от пользователя ${profileId}`, response.data)
                    context.commit(mutationsTypes.isUnSubSuccess, response.data)
                })
                .catch(() => {
                    context.commit(mutationsTypes.isUnSubFailure)
                    console.log(`Ошибка при отписке от пользователя`)
                })
        })
    }
}

const getters = {}


export default {
    state, mutations, mutationsTypes, actions, getters
}