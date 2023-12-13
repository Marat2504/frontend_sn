import axios from "axios";

const getAllTeams = () => {
    return axios.get('/teams/')
}

const isSubscribe = (credentials) => {
    console.log('team_id, user_id', credentials)
    return axios.post(`/teams/${credentials.team}/${credentials.user}/`)
}

const createTeam = (credential) => {
    console.log('New team data', credential)
    return axios.post(`/teams/create/`, credential, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
}


export default {
    getAllTeams,
    isSubscribe,
    createTeam

}