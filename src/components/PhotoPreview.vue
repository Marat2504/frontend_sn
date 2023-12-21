<script>
export default {
    name: 'MvcPhotoPreview',
    props: {
        photos: {
            type: Array,
            required: false,
            default: () => []
        },
        domain: {
            type: String,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            modalVisible: false,
            modalPhotoUrl: "",
            modalPhotoWidth: "",
            modalPhotoHeight: ""
        }
    },
    methods: {
        openModal(url) {
            this.modalVisible = true;
            this.modalPhotoUrl = url;
            this.calculateModalPhotoSize();
            window.addEventListener('resize', this.calculateModalPhotoSize);
        },
        calculateModalPhotoSize() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const modalContentMargin = 40;
            const modalContentSize = Math.min(viewportWidth - modalContentMargin, viewportHeight - modalContentMargin);

            this.modalPhotoWidth = `max-width: ${modalContentSize}px;`;
            this.modalPhotoHeight = `max-height: ${modalContentSize}px;`;
        },

        closeModal() {
            this.modalVisible = false;
            this.modalPhotoUrl = "";
        }
    }

}

</script>

<template>
<div class="block-area-profile">
           <h3>Фотографии</h3>
            <div class="user-profile-foto"
                 v-if="photos.length > 0 && !isLoading">
                <div class="user-profile-foto-block"
                     v-for="photo in photos" :key="photo.id"
                >
                    <img :src="domain+photo.photo"
                    @click="openModal(domain + photo.photo)"
                    >
                </div>
            </div>

            <div class="user-profile-foto"
                 v-else-if="photos.length > 0 && isLoading">
                <div class="loader"></div>
            </div>

            <div class="user-profile-foto"
                 v-else>
                <h3>Пользователь пока не загрузил ни одной фотографии...</h3>
            </div>
        </div>

        <div v-if="modalVisible" class="modal" @click="closeModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <img :src="modalPhotoUrl" class="modal-photo" :style="[modalPhotoWidth, modalPhotoHeight]">
            </div>
        </div>

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
.block-area-profile h3 {
    margin: 0 0 20px 0;
    text-align: start;
}
.user-profile-foto {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: hidden;
    max-height: 115px;
}
.user-profile-foto h3 {
    margin: 0 auto 0 auto;
    text-align: center;
}

.user-profile-foto-block {
    width: 115px;
    height: 115px;
    border-radius: 10px;
    overflow: hidden;
}

.user-profile-foto-block img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>