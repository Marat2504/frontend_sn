import axios from "@/api/axios";

// получить всех подписчиков юзера
const getUserSubscribers = () => axios.get('/subscribe/get_all_target_users/')

const getUserSubscriptions = () => axios.get('/subscribe/get_all_sub/')

const getUserSubscribersWithProfileId = (profileId) => axios
    .get(`/subscribe/get_all_target_users/${profileId}/`)

const getUserSubscriptionsWithProfileId = (profileId) => axios
    .get(`/subscribe/get_all_sub_users/${profileId}/`)

// есть ли конкретный пользователь с profile_id у юзера в подписках. ответ bool
const isTargetUserWithProfileId = (profileId) => axios
    .get(`/subscribe/is_target_user/${profileId}/`)


// подписаться на пользователя с profile_id
const sub = (profileId) => axios
    .post(`/subscribe/sub/${profileId}/`)

// отписаться от пользователя с profile_id
const unsub = (profileId) => axios
    .post(`/subscribe/unsub/${profileId}/`)


export default {
    getUserSubscribers,
    getUserSubscriptions,
    getUserSubscribersWithProfileId,
    getUserSubscriptionsWithProfileId,
    isTargetUserWithProfileId,
    sub,
    unsub
}