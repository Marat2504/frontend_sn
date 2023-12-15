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

const getUserProfilePhotos = (uuid) => {
    return axios.get(`/profiles/photos/${uuid}/`)
}


export default {
    getProfile,
    editProfile,
    getUserProfilePhotos
}