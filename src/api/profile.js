import axios from "@/api/axios";

const getProfile = uuid => {
    return axios.get(`/profiles/${uuid}/`)
}

const editProfile = (uuid, credentials) => {
    return axios.put(`/profiles/edit/${uuid}/`, credentials, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}


export default {
    getProfile,
    editProfile
}