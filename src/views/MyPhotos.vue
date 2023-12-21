<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"


export default {
    name: "MvcMyPhotos",
    data() {
        return {
            domain: domainConst.domain,
            modalVisible: false,
            modalPhotoUrl: "",
            modalPhotoWidth: "",
            modalPhotoHeight: ""
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            photos: state => state.profile.photos,
            isLoading: state => state.profile.isLoading
        })
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
            const modalContentMargin = 40; // Adjust this value as needed
            const modalContentSize = Math.min(viewportWidth - modalContentMargin, viewportHeight - modalContentMargin);

            this.modalPhotoWidth = `max-width: ${modalContentSize}px;`;
            this.modalPhotoHeight = `max-height: ${modalContentSize}px;`;
        },

        closeModal() {
            this.modalVisible = false;
            this.modalPhotoUrl = "";
        }
    },
    beforeCreate() {
        const profile = JSON.parse(localStorage.getItem('userprofile'))
        this.$store.dispatch('getUserProfilePhotos', profile.id)
    }

}
</script>

<template>
    <div class="userProfileContainer block-area">
        <div>
            <h2>Все фотографии</h2>
        </div>

        <div v-if="!isLoading" class="album">
            <img
                    v-for="p in photos"
                    :key="p.id"
                    :src="domain + p.photo"
                    class="thumbnail"
                    @click="openModal(domain + p.photo)"
            >
        </div>
        <div v-else class="loader"></div>
        <div v-if="modalVisible" class="modal" @click="closeModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <img :src="modalPhotoUrl" class="modal-photo" :style="[modalPhotoWidth, modalPhotoHeight]">
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>