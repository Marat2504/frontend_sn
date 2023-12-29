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

const addPhoto = (credentials) => {
    return axios.post(`/profiles/add_photos/${credentials.uuid}/`, credentials.data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const delPhoto = (credentials) => {
    return axios.post(`/profiles/del_photo/${credentials.uuid}/`, credentials.data)
}

export default {
    getProfile,
    editProfile,
    getUserProfilePhotos,
    addPhoto,
    delPhoto
}