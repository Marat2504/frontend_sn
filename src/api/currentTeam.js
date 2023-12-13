import axios from "@/api/axios";

const getCurrentTeam = (teamSlug) => {
    return axios.get(`/teams/${teamSlug}`)
}

const getTeamAthletes = (teamSlug) => {
    return axios.get(`/teams/${teamSlug}/athletes/`)
}

const getCaptainTeam = (teamSlug) => {
    return axios.get(`/profiles/${teamSlug}/`)
}


export default {
    getCurrentTeam,
    getTeamAthletes,
    getCaptainTeam
}