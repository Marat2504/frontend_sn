<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const.js"
import MvcSpinner from "@/components/Spiner.vue";
import MvcModalFoto from "@/components/modal/ModalFoto.vue";


export default {
    name: "MvcMyPhotos",
    components: {MvcModalFoto, MvcSpinner},
    data() {
        return {
            domain: domainConst.domain,
            isVisible: false,
            idPhoto: ''
        }
    },

    computed: {
        ...mapState({
            userProfile: state => state.profile.form,
            isLoading: state => state.profile.isLoading,
        }),
        photos() {
            return this.$store.state.profile.photos
        },
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

    },
    beforeCreate() {
        const profile = this.$store.getters['getUserProfile']
        this.$store.dispatch('getUserProfilePhotos', profile.id)
        this.$store.dispatch('clearSuccessMessage')
    },


}
</script>

<template>

    <div class="userProfileContainer block-area">
        <div class="block-title">
            <h2>Все фотографии</h2>

        </div>


        <div v-if="!isLoading" class="album">
            <div class="album-block"
                 v-for="photo in photos"
                 :key="photo.id"
            >

                <img
                        :src="domain + photo.photo"
                        class="thumbnail"
                        @click="toggleClicked(photo)"
                >
            </div>
        </div>
        <mvc-spinner v-else></mvc-spinner>

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

.block-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>
