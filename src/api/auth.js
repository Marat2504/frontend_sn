import axios from "@/api/axios";

const register = credentials => {
    return axios.post('/signup/', credentials)
}

const authenticated = credentials => {
    return axios.post('/token/', credentials)
}

const refreshToken = token => {
    return axios.post('/token/refresh/', token)
}

const userInfo = () => {
    return axios.get('/me/')
}

export default {
    register,
    authenticated,
    refreshToken,
    userInfo
}