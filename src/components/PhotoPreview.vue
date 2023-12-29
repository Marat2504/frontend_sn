<script>
import MvcSpinner from "@/components/Spiner.vue";
import MvcModalFoto from "@/components/modal/ModalFoto.vue";

export default {
    name: 'MvcPhotoPreview',
    components: {MvcModalFoto, MvcSpinner},
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
            isVisible: false,
            idPhoto: '',
        }
    },
    methods: {
        toggleClicked(photo) {
            this.isVisible = !this.isVisible
            this.idPhoto = photo.id
        },
        closeModal() {
            this.isVisible = false;
            this.idPhoto = ''
        },
        openModalPhotos() {
            if (localStorage.getItem('user.profile') === this.$route.params.userProfileId) {
                this.$router.push({name: 'myPhotos'})
            } else {
                this.$router.push({name: 'userPagePhotos'})
            }
        }
    }
}

</script>

<template>
    <div class="block-area-profile">
        <h3 @click="openModalPhotos">Фотографии</h3>
        <div class="user-profile-foto"
             v-if="photos.length > 0 && !isLoading">
            <div class="user-profile-foto-block"
                 v-for="photo in photos" :key="photo.id"
            >
                <img :src="domain+photo.photo"
                     style="cursor: pointer"
                     @click="toggleClicked(photo)"
                >
            </div>
        </div>

        <div class="user-profile-foto"
             v-else-if="photos.length > 0 && isLoading">
            <mvc-spinner></mvc-spinner>
        </div>

        <div class="user-profile-foto"
             v-else>
            <h3>Пользователь пока не загрузил ни одной фотографии...</h3>
        </div>
    </div>


    <mvc-modal-foto v-if="isVisible"
                    :is-visible="isVisible"
                    :id-photo="idPhoto"
                    :photos="photos"
                    :domain="domain"
                    @click="closeModal"
    >
    </mvc-modal-foto>


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
    transition: all 0.5s ease;
    cursor: pointer;
}

.block-area-profile h3:hover {
    color: rgb(0, 0, 0);
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

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.arrow:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.arrow.left {
    left: 10px;
}

.arrow.right {
    right: 10px;
}
</style>


<!--<script>-->
<!--import MvcSpinner from "@/components/Spiner.vue";-->

<!--export default {-->
<!--    name: 'MvcPhotoPreview',-->
<!--    components: {MvcSpinner},-->
<!--    props: {-->
<!--        photos: {-->
<!--            type: Array,-->
<!--            required: false,-->
<!--            default: () => []-->
<!--        },-->
<!--        domain: {-->
<!--            type: String,-->
<!--            required: true-->
<!--        },-->
<!--        isLoading: {-->
<!--            type: Boolean,-->
<!--            required: true-->
<!--        }-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            modalVisible: false,-->
<!--            modalPhotoUrl: "",-->
<!--            modalPhotoWidth: "",-->
<!--            modalPhotoHeight: ""-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        openModal(url) {-->
<!--            this.modalVisible = true;-->
<!--            this.modalPhotoUrl = url;-->
<!--            this.calculateModalPhotoSize();-->
<!--            window.addEventListener('resize', this.calculateModalPhotoSize);-->
<!--            this.$nextTick(() => {-->
<!--                this.$refs.modal.focus()-->
<!--            })-->
<!--        },-->
<!--        calculateModalPhotoSize() {-->
<!--            const viewportWidth = window.innerWidth;-->
<!--            const viewportHeight = window.innerHeight;-->
<!--            const modalContentMargin = 40;-->
<!--            const modalContentSize = Math.min(viewportWidth - modalContentMargin, viewportHeight - modalContentMargin);-->

<!--            this.modalPhotoWidth = `max-width: ${modalContentSize}px;`;-->
<!--            this.modalPhotoHeight = `max-height: ${modalContentSize}px;`;-->
<!--        },-->

<!--        closeModal() {-->
<!--            this.modalVisible = false;-->
<!--            this.modalPhotoUrl = "";-->
<!--        },-->

<!--        prevPhoto() {-->
<!--            const currentIndex = this.photos.findIndex(photo => this.domain + photo.photo === this.modalPhotoUrl);-->
<!--            if (currentIndex !== 0) {-->
<!--                const prevIndex = currentIndex - 1-->
<!--                this.modalPhotoUrl = this.domain + this.photos[prevIndex].photo-->
<!--            } else {-->
<!--                this.modalPhotoUrl = this.domain + this.photos[currentIndex].photo-->
<!--            }-->
<!--        },-->

<!--        nextPhoto() {-->
<!--            const currentIndex = this.photos.findIndex(photo => this.domain + photo.photo === this.modalPhotoUrl);-->
<!--            if (currentIndex !== this.photos.length - 1) {-->
<!--                const nextIndex = currentIndex + 1-->
<!--                this.modalPhotoUrl = this.domain + this.photos[nextIndex].photo-->
<!--            } else {-->
<!--                this.modalPhotoUrl = this.domain + this.photos[currentIndex].photo-->
<!--            }-->
<!--        },-->

<!--        handleKeyDown(event) {-->
<!--            if (event.key === "ArrowLeft") {-->
<!--                this.prevPhoto();-->
<!--            } else if (event.key === "ArrowRight") {-->
<!--                this.nextPhoto();-->
<!--            }-->
<!--        },-->
<!--    }-->

<!--}-->

<!--</script>-->

<!--<template>-->
<!--    <div class="block-area-profile">-->
<!--        <h3 @click="openModalPhotos">Фотографии</h3>-->
<!--        <div class="user-profile-foto"-->
<!--             v-if="photos.length > 0 && !isLoading">-->
<!--            <div class="user-profile-foto-block"-->
<!--                 v-for="photo in photos" :key="photo.id"-->
<!--            >-->
<!--                <img :src="domain+photo.photo"-->
<!--                     style="cursor: pointer"-->
<!--                     @click="openModal(domain + photo.photo)"-->
<!--                >-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="user-profile-foto"-->
<!--             v-else-if="photos.length > 0 && isLoading">-->
<!--            <mvc-spinner></mvc-spinner>-->
<!--        </div>-->

<!--        <div class="user-profile-foto"-->
<!--             v-else>-->
<!--            <h3>Пользователь пока не загрузил ни одной фотографии...</h3>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div v-if="modalVisible" class="modal" @click="closeModal" @keydown="handleKeyDown" tabindex="0" ref="modal">-->
<!--        <div class="modal-content">-->
<!--            <span class="arrow left" @click.stop="prevPhoto">&lt;</span>-->

<!--            <span class="close" @click="closeModal">&times;</span>-->
<!--            <img :src="modalPhotoUrl" class="modal-photo" :style="[modalPhotoWidth, modalPhotoHeight]">-->

<!--            <span class="arrow right" @click.stop="nextPhoto">&gt;</span>-->
<!--        </div>-->
<!--    </div>-->

<!--</template>-->

<!--<style scoped>-->
<!--.block-area-profile {-->
<!--    background-color: white;-->
<!--    padding: 20px;-->
<!--    margin-top: 10px;-->
<!--    border-radius: 10px;-->
<!--    height: auto;-->
<!--    flex: 1;-->
<!--    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--}-->

<!--.block-area-profile h3 {-->
<!--    margin: 0 0 20px 0;-->
<!--    text-align: start;-->
<!--    transition: all 0.5s ease;-->
<!--    cursor: pointer;-->
<!--}-->

<!--.block-area-profile h3:hover {-->
<!--    color: rgb(0, 0, 0);-->
<!--}-->

<!--.user-profile-foto {-->
<!--    display: flex;-->
<!--    gap: 10px;-->
<!--    flex-wrap: wrap;-->
<!--    align-content: flex-start;-->
<!--    overflow: hidden;-->
<!--    max-height: 115px;-->
<!--}-->

<!--.user-profile-foto h3 {-->
<!--    margin: 0 auto 0 auto;-->
<!--    text-align: center;-->
<!--}-->

<!--.user-profile-foto-block {-->
<!--    width: 115px;-->
<!--    height: 115px;-->
<!--    border-radius: 10px;-->
<!--    overflow: hidden;-->
<!--}-->

<!--.user-profile-foto-block img {-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    object-fit: cover;-->
<!--}-->

<!--.arrow {-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    transform: translateY(-50%);-->
<!--    font-size: 24px;-->
<!--    color: white;-->
<!--    background-color: rgba(0, 0, 0, 0.3);-->
<!--    padding: 8px;-->
<!--    border-radius: 50%;-->
<!--    cursor: pointer;-->
<!--    transition: background-color 0.3s ease;-->
<!--}-->

<!--.arrow:hover {-->
<!--    background-color: rgba(0, 0, 0, 0.5);-->
<!--}-->

<!--.arrow.left {-->
<!--    left: 10px;-->
<!--}-->

<!--.arrow.right {-->
<!--    right: 10px;-->
<!--}-->
<!--</style>-->