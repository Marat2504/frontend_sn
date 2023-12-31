import axios from "@/api/axios";

const sendTrack = (profileId, photo) => {
    return axios.post(`/workout/${profileId}/`, photo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
}

const getAllTracks = (profileId) => {
    return axios.get(`/workout/tracks/${profileId}/`)
}

const editTrack = (data) => {
    return axios.put(`/workout/edit/${data.id}/`, data)
}

const delTrack = (data) => {
    return axios.delete(`/workout/del/${data.id}/`)
}

export default {
    sendTrack,
    getAllTracks,
    editTrack,
    delTrack
}