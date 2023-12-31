<script>
import {mapState} from "vuex";
import func from "@/helpers/functions";
import MvcModalMessage from "@/components/modal/ModalMessage.vue";

export default {
    name: 'MvcTrackBlock',
    components: {MvcModalMessage},
    props: {
        profileId: {
            type: String,
            required: true,
            newData: null,
        },
        tracks: {
            type: Array,
            required: true
        },
        domain: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            selectedFiles: null,
            showModal: false,
            track: null
        }
    },
    computed: {
        ...mapState({
            successMessage: state => state.workout.successMessage,
            errorMessage: state => state.workout.errorMessage
        })
    },

    methods: {
        handleFileSelect(event) {
            this.selectedFiles = event.target.files[0]
        },
        sendTrack() {
            const formData = new FormData()
            formData.append('file', this.selectedFiles)
            console.log(formData)

            this.$store.dispatch('sendTrack', {profile: this.profileId, data: formData})
            this.selectedFiles = null
        },
        cancelSend() {
            this.selectedFiles = null
        },
        editData(str) {
            return func.selectDate(str)
        },
        allDistance(arr) {
            return func.allDistance(arr)
        },
        allTime(arr) {
            return func.sumTime(arr)
        },
        editTrack(track) {
            console.log(track)
            this.track = {...track}
            this.showModal = true
        },
        closeModal() {
            this.track = null
            this.showModal = false
        },
        sendData() {
            this.$store.dispatch('editTrack', this.track)
            this.closeModal()
        },
        delData() {
            this.$store.dispatch('delTrack', this.track)
            this.closeModal()
        }
    },
}

</script>

<template>
    <div class="block-area-profile">
        <div class="block-title">
            <div class="title_block-title"><h3>Треки</h3></div>
            <div class="title_block-button">
                <div v-if="selectedFiles">
                    <button
                            style="margin-right: 10px"
                            class="submit-button"
                            @click="sendTrack"
                    >
                        Добавить
                    </button>
                    <button
                            class="submit-button submit-button-red"
                            @click="cancelSend"
                    >
                        Отменить
                    </button>
                </div>
                <div>
                    <input
                            @change="handleFileSelect"
                            type="file"
                            accept="image/*"
                            id="upload-btn"
                    >
                    <label for="upload-btn" id="upload-label">
                        <span>Загрузить трек</span>
                    </label>
                </div>

            </div>

        </div>

        <div class="title_block">
            <div class="title_block-training">
                Всего тренировок: {{ tracks.length }}
            </div>
            <div>
                Всего пройдено: {{ allDistance(tracks) }} км
            </div>
            <div>
                Всего времени: {{ allTime(tracks) }}
            </div>


        </div>
        <div class="block-tracks">
            <div class="block-tracks-container"
                 v-for="track in tracks" :key="track"
            >
                <div class="tracks-time">
                    <h4>{{ editData(track.created_at) }}</h4>
                    <h2 @click="editTrack(track)">...</h2>
                </div>
                <div class="tracks-value">
                    <div class="tracks-distance">
                        <h3>Дистанция</h3>
                        <h4>{{ track.distance }} км</h4>

                    </div>
                    <div class="tracks-duration">
                        <h3>Время</h3>
                        <h4>{{ track.duration }}</h4>
                    </div>
                    <div class="tracks-pace">
                        <h3>Темп</h3>
                        <h4>{{ track.pace }} км/ч</h4>
                    </div>
                    <div class="tracks-photo">
                        <h3>Источник</h3>
                        <a :href="domain+track.photo" target="_blank">
                            <img :src="domain + track.photo">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <h1>Редактирование данных</h1>
            <span class="close" @click="closeModal">&times;</span>
            <h3>Расстояние: </h3>
            <input
                    class="modal-content-input"
                    v-model="track.distance"
                    type="text"
                    placeholder="Допустимый формат: XX,XX"
            >
            <h3>Продолжительность: </h3>
            <input
                    class="modal-content-input"
                    v-model="track.duration"
                    type="text"
                    placeholder="Допустимый формат: XX:XX или ХХ:ХХ:ХХ"
            >
            <h3>Темп: </h3>
            <input
                    class="modal-content-input"
                    v-model="track.pace"
                    type="text"
                    placeholder="Допустимый формат: XX:XX"
            >
            <div class="modal-content_button">
                <button
                        @click="sendData"
                        class="submit-button"
                >
                    Изменить
                </button>
                <button
                        class="submit-button submit-button-red"
                        @click="closeModal"
                >
                    Отменить
                </button>
                <button
                        class="submit-button submit-button-red red"
                        @click="delData"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
    <mvc-modal-message
            :messages="errorMessage"
            mood="red"
            clear-message="cleanMessage"
    ></mvc-modal-message>
    <mvc-modal-message
            :messages="successMessage"
            mood="green"
            clear-message="cleanMessage"
    ></mvc-modal-message>

</template>

<style scoped>

.block-area-profile {
    background-color: white;
    padding: 20px;
    margin-top: 10px;
    border-radius: 10px;
    height: auto;
    flex: 1;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.block-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.block-area-profile h3 {
    margin-top: 0;
    text-align: start;
}

.title_block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 10px;
}

.title_block-button {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

#upload-btn {
    display: none;
}

#upload-label {
    background-color: #e91e63; /* Цвет фона кнопки */
    color: #ffffff; /* Цвет текста */
    padding: 10px 20px;
    cursor: pointer;
}

#upload-label:hover {
    background-color: #ff4081; /* Цвет фона кнопки при наведении */
}

.block-tracks-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    border-bottom: 1px solid #dddddd;
}

.block-tracks-container {
    display: flex;
    flex-direction: column;
}

.tracks-value {
    display: flex;
    flex-direction: row;
    gap: 120px;
}

.tracks-photo {
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin: 0 auto;
}

.tracks-photo img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.tracks-distance, .tracks-duration, .tracks-pace, .tracks-photo {
    display: flex;
    flex-direction: column;
}

.tracks-time {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}

.tracks-time h2 {
    margin-left: 10px;
    padding: 0 5px 5px 5px;
    background-color: #c3d7c3;
    border-radius: 3px;
    cursor: pointer;
    transition: all ease 0.5s;
}

.tracks-time h2:hover {
    background-color: #c6c6c6;
}

.tracks-time h4 {
    margin-right: 10px;
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
}

.modal-content-input {
    font-size: 24px;
    width: 100%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-content_button {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.red {
    background-color: red;
}

.red:hover {
    background-color: orangered;
}
</style>