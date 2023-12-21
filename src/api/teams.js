import axios from "axios";

const getAllTeams = () => {
    let userId = localStorage.getItem('user.id')
    if (userId === '' || userId === null) {
        return axios.get(`/teams/`)
    }
    return axios.get(`/teams/${userId}`)
}

const isSubscribe = (credentials) => {
    return axios.post(`/teams/${credentials.team}/${credentials.user}/`)
}

const createTeam = (credential) => {
    return axios.post(`/teams/create/`, credential, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const editTeam = (credentials) => {
    return axios.put(`/teams/edit/${credentials.team}/${credentials.user}/`, credentials.formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export default {
    getAllTeams,
    isSubscribe,
    createTeam,
    editTeam

}