<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"
import MvcSpinner from "@/components/Spiner.vue";
import MvcModalMessage from "@/components/modal/ModalMessage.vue";
import MvcModalFoto from "@/components/modal/ModalFoto.vue";


export default {
    name: "MvcMyPhotos",
    components: {MvcModalFoto, MvcModalMessage, MvcSpinner},
    data() {
        return {
            domain: domainConst.domain,
            selectedFiles: null,
            all: [],
            isVisible: false,
            idPhoto: ''
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoading: state => state.profile.isLoading,
            isSubmitting: state => state.profile.isSubmitting,
            successMessage: state => state.profile.successMessage,
            errorMessage: state => state.profile.errorMessage
        }),
        photos() {
            return this.$store.state.profile.photos
        },
        selectedPhotoForSendToServer() {
            const values = this.all.filter(v => v.selected === true)
                    .map(v => v.id)
            console.log('values', values)
            return values
        }
    },
    methods: {
        toggleClicked(photo) {
            this.isVisible = !this.isVisible
            this.idPhoto = photo.id
        },

        closeModal() {
            this.isVisible = false
            this.idPhoto = ''
        },

        handleFileSelect(event) {
            this.selectedFiles = event.target.files
            console.log(this.selectedFiles)
        },

        addPhoto() {
            const credentials = {
                uuid: this.userProfile.id,
                data: this.selectedFiles
            }
            this.$store.dispatch('addPhotos', credentials)
                    .then(data => {
                        const newPhoto = data.map(photo => ({...photo, selected: false}))
                        this.all.unshift(...newPhoto)
                    })
            this.selectedFiles = null
            this.$store.dispatch('getUserProfilePhotos', this.userProfile.id)
        },

        selectedPhoto(photo) {
            let targetPhoto = this.all.find(p => p === photo)
            if (targetPhoto) {
                targetPhoto.selected = !targetPhoto.selected
                console.log("Объект найден и параметр изменен.");
            } else {
                console.log("Объект с указанным id не найден.");
            }
        },

        delPhotos() {
            const credentials = {
                uuid: this.userProfile.id,
                data: this.selectedPhotoForSendToServer
            }
            this.$store.dispatch('delPhotos', credentials)
        }
    },

    beforeCreate() {
        const profile = JSON.parse(localStorage.getItem('userprofile'))
        console.log('userprofile', profile)
        this.$store.dispatch('initUserProfile')
        this.$store.dispatch('getUserProfilePhotos', profile.id)
        this.$store.dispatch('clearSuccessMessage')
    },

    watch: {
        photos: {
            handler(value) {
                this.all = value.map(photo => ({...photo, selected: false}))
            },
            immediate: true
        }
    },

}
</script>

<template>
    <mvc-modal-message
            :messages="successMessage"
            mood="green"
            clear-message="clearSuccessMessage"
    ></mvc-modal-message>
    <mvc-modal-message
            :messages="errorMessage"
            mood="red"
            clear-message="clearSuccessMessage"
    ></mvc-modal-message>
    <div class="userProfileContainer block-area">
        <div class="block-title">
            <h2>Все фотографии</h2>
            <div>
                <input
                        @change="handleFileSelect"
                        type="file"
                        accept="image/*"
                        multiple
                        id="upload-btn"
                >
                <label for="upload-btn" id="upload-label">
                    <span>Загрузить фото</span>
                </label>
            </div>
        </div>

        <div class="selected-foto" v-if="selectedFiles">
            <h3>Выбрано {{ selectedFiles.length }} фото</h3>
            <button
                    @click="addPhoto"
                    class="submit-button"
                    type="submit"
                    :disabled="isSubmitting"
            >
                Добавить
            </button>
        </div>
        <div class="selected-foto" v-if="selectedPhotoForSendToServer.length > 0">
            <button
                    v-if="selectedPhotoForSendToServer.length > 0"
                    @click="delPhotos"
                    class="submit-button"
                    type="submit"
            >Удалить
            </button>
        </div>

        <div v-if="!isLoading" class="album">
            <div class="album-block"
                 v-for="p in all"
                 :key="p.id"
            >
                <span class="close" v-if="p.selected === false" @click="selectedPhoto(p)">️☐</span>
                <span class="close" v-else @click="selectedPhoto(p)">✔️</span>
                <img
                        :src="domain + p.photo"
                        class="thumbnail"
                        @click="toggleClicked(p)"
                >
            </div>
        </div>
        <mvc-spinner v-else></mvc-spinner>

    </div>
    <mvc-modal-foto v-if="isVisible"
                    :is-visible="isVisible"
                    :id-photo="idPhoto"
                    :photos="all"
                    :domain="domain"
                    @click="closeModal"
    >
    </mvc-modal-foto>

</template>

<style scoped>
.selected-foto {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
}

.submit-button {
    background-color: #638bad;
    color: white;
    width: 150px;
    height: 40px;
    border-radius: 5px;
    font-size: 20px;
    transition: all ease 0.5s;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #4caf50;
}

.block-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
</style>


<!--<script>-->
<!--import {mapState} from "vuex";-->
<!--import domainConst from "@/helpers/const.js"-->
<!--import MvcSpinner from "@/components/Spiner.vue";-->
<!--import MvcModalMessage from "@/components/modal/ModalMessage.vue";-->


<!--export default {-->
<!--    name: "MvcMyPhotos",-->
<!--    components: {MvcModalMessage, MvcSpinner},-->
<!--    data() {-->
<!--        return {-->
<!--            domain: domainConst.domain,-->
<!--            modalVisible: false,-->
<!--            modalPhotoUrl: "",-->
<!--            modalPhotoWidth: "",-->
<!--            modalPhotoHeight: "",-->
<!--            selectedFiles: null,-->
<!--            all: [],-->
<!--        }-->
<!--    },-->
<!--    computed: {-->
<!--        ...mapState({-->
<!--            userProfile: state => state.profile.form,-->
<!--            isLoading: state => state.profile.isLoading,-->
<!--            isSubmitting: state => state.profile.isSubmitting,-->
<!--            successMessage: state => state.profile.successMessage,-->
<!--            errorMessage: state => state.profile.errorMessage-->
<!--        }),-->
<!--        photos() {-->
<!--            return this.$store.state.profile.photos-->
<!--        },-->
<!--        selectedPhotoForSendToServer() {-->
<!--            const values = this.all.filter(v => v.selected === true)-->
<!--                    .map(v => v.id)-->
<!--            console.log('values', values)-->
<!--            return values-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        openModal(url) {-->
<!--            this.modalVisible = true;-->
<!--            this.modalPhotoUrl = url;-->
<!--            this.calculateModalPhotoSize();-->
<!--            window.addEventListener('resize', this.calculateModalPhotoSize);-->
<!--        },-->
<!--        calculateModalPhotoSize() {-->
<!--            const viewportWidth = window.innerWidth;-->
<!--            const viewportHeight = window.innerHeight;-->
<!--            const modalContentMargin = 40; // Adjust this value as needed-->
<!--            const modalContentSize = Math.min(viewportWidth - modalContentMargin, viewportHeight - modalContentMargin);-->

<!--            this.modalPhotoWidth = `max-width: ${modalContentSize}px;`;-->
<!--            this.modalPhotoHeight = `max-height: ${modalContentSize}px;`;-->
<!--        },-->

<!--        closeModal() {-->
<!--            this.modalVisible = false;-->
<!--            this.modalPhotoUrl = "";-->
<!--        },-->
<!--        handleFileSelect(event) {-->
<!--            this.selectedFiles = event.target.files-->
<!--            console.log(this.selectedFiles)-->
<!--        },-->
<!--        addPhoto() {-->
<!--            const credentials = {-->
<!--                uuid: this.userProfile.id,-->
<!--                data: this.selectedFiles-->
<!--            }-->
<!--            this.$store.dispatch('addPhotos', credentials)-->
<!--                    .then(data => {-->
<!--                        const newPhoto = data.map(photo => ({...photo, selected: false}))-->
<!--                        this.all.unshift(...newPhoto)-->
<!--                    })-->
<!--            this.selectedFiles = null-->
<!--            this.$store.dispatch('getUserProfilePhotos', this.userProfile.id)-->
<!--        },-->
<!--        selectedPhoto(photo) {-->
<!--            let targetPhoto = this.all.find(p => p === photo)-->
<!--            if (targetPhoto) {-->
<!--                targetPhoto.selected = !targetPhoto.selected-->
<!--                console.log("Объект найден и параметр изменен.");-->
<!--            } else {-->
<!--                console.log("Объект с указанным id не найден.");-->
<!--            }-->
<!--        },-->
<!--        delPhotos() {-->
<!--            const credentials = {-->
<!--                uuid: this.userProfile.id,-->
<!--                data: this.selectedPhotoForSendToServer-->
<!--            }-->
<!--            this.$store.dispatch('delPhotos', credentials)-->
<!--        }-->
<!--    },-->
<!--    beforeCreate() {-->
<!--        const profile = JSON.parse(localStorage.getItem('userprofile'))-->
<!--        console.log('userprofile', profile)-->
<!--        this.$store.dispatch('initUserProfile')-->
<!--        this.$store.dispatch('getUserProfilePhotos', profile.id)-->
<!--        this.$store.dispatch('clearSuccessMessage')-->
<!--    },-->
<!--    watch: {-->
<!--        photos: {-->
<!--            handler(value) {-->
<!--                this.all = value.map(photo => ({...photo, selected: false}))-->
<!--            },-->
<!--            immediate: true-->
<!--        }-->
<!--    },-->

<!--}-->
<!--</script>-->

<!--<template>-->
<!--    <mvc-modal-message-->
<!--            :messages="successMessage"-->
<!--            mood="green"-->
<!--            clear-message="clearSuccessMessage"-->
<!--    ></mvc-modal-message>-->
<!--    <mvc-modal-message-->
<!--            :messages="errorMessage"-->
<!--            mood="red"-->
<!--            clear-message="clearSuccessMessage"-->
<!--    ></mvc-modal-message>-->
<!--    <div class="userProfileContainer block-area">-->
<!--        <div class="block-title">-->
<!--            <h2>Все фотографии</h2>-->
<!--            <div>-->
<!--                <input-->
<!--                        @change="handleFileSelect"-->
<!--                        type="file"-->
<!--                        accept="image/*"-->
<!--                        multiple-->
<!--                        id="upload-btn"-->
<!--                >-->
<!--                <label for="upload-btn" id="upload-label">-->
<!--                    <span>Загрузить фото</span>-->
<!--                </label>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="selected-foto" v-if="selectedFiles">-->
<!--            <h3>Выбрано {{ selectedFiles.length }} фото</h3>-->
<!--            <button-->
<!--                    @click="addPhoto"-->
<!--                    class="submit-button"-->
<!--                    type="submit"-->
<!--                    :disabled="isSubmitting"-->
<!--            >-->
<!--                Добавить-->
<!--            </button>-->
<!--        </div>-->
<!--        <div class="selected-foto" v-if="selectedPhotoForSendToServer.length > 0">-->
<!--            <button-->
<!--                    v-if="selectedPhotoForSendToServer.length > 0"-->
<!--                    @click="delPhotos"-->
<!--                    class="submit-button"-->
<!--                    type="submit"-->
<!--            >Удалить-->
<!--            </button>-->
<!--        </div>-->

<!--        <div v-if="!isLoading" class="album">-->
<!--            <div class="album-block"-->
<!--                 v-for="p in all"-->
<!--                 :key="p.id"-->
<!--            >-->
<!--                <span class="close" v-if="p.selected === false" @click="selectedPhoto(p)">️☐</span>-->
<!--                <span class="close" v-else @click="selectedPhoto(p)">✔️</span>-->
<!--                <img-->
<!--                        :src="domain + p.photo"-->
<!--                        class="thumbnail"-->
<!--                        @click="openModal(domain + p.photo)"-->

<!--                >                -->
<!--            </div>-->
<!--        </div>-->
<!--        <mvc-spinner v-else></mvc-spinner>-->
<!--        <div v-if="modalVisible" class="modal" @click="closeModal">-->
<!--            <div class="modal-content">-->
<!--                <span class="close" @click="closeModal">&times;</span>-->
<!--                <img :src="modalPhotoUrl" class="modal-photo" :style="[modalPhotoWidth, modalPhotoHeight]">-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->


<!--</template>-->

<!--<style scoped>-->
<!--.selected-foto {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    justify-content: flex-end;-->
<!--    align-items: center;-->
<!--    gap: 20px;-->
<!--}-->

<!--.submit-button {-->
<!--    background-color: #638bad;-->
<!--    color: white;-->
<!--    width: 150px;-->
<!--    height: 40px;-->
<!--    border-radius: 5px;-->
<!--    font-size: 20px;-->
<!--    transition: all ease 0.5s;-->
<!--    cursor: pointer;-->
<!--}-->

<!--.submit-button:hover {-->
<!--    background-color: #4caf50;-->
<!--}-->

<!--.block-title {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    justify-content: space-between;-->
<!--}-->

<!--#upload-btn {-->
<!--    display: none;-->
<!--}-->

<!--#upload-label {-->
<!--    background-color: #e91e63; /* Цвет фона кнопки */-->
<!--    color: #ffffff; /* Цвет текста */-->
<!--    padding: 10px 20px;-->
<!--    cursor: pointer;-->
<!--}-->

<!--#upload-label:hover {-->
<!--    background-color: #ff4081; /* Цвет фона кнопки при наведении */-->
<!--}-->
<!--</style>-->
