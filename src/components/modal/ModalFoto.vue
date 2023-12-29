<script>
export default {
    name: 'MvcModalFoto',
    props: {
        photos: {
            type: Array,
            required: true
        },
        idPhoto: {
            type: [Number, String],
            required: true
        },
        isVisible: {
            type: Boolean,
            required: true,
            defaults: false
        },
        domain: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            modalPhotoUrl: '',
            modalPhotoWidth: '',
            modalPhotoHeight: ''
        }
    },
    methods: {
        closeModal() {
            this.modalPhotoUrl = ""
            this.modalPhotoWidth = ''
            this.modalPhotoHeight = ''
            this.$emit('closeModal')
        },

        calculateModalPhotoSize() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const modalContentMargin = 40;
            const modalContentSize = Math.min(viewportWidth - modalContentMargin, viewportHeight - modalContentMargin);

            this.modalPhotoWidth = `max-width: ${modalContentSize}px;`;
            this.modalPhotoHeight = `max-height: ${modalContentSize}px;`;
        },

        prevPhoto() {
            const currentIndex = this.photos.findIndex(photo => photo.photo === this.modalPhotoUrl);
            if (currentIndex !== 0) {
                const prevIndex = currentIndex - 1
                this.modalPhotoUrl = this.photos[prevIndex].photo
            } else {
                this.modalPhotoUrl = this.photos[currentIndex].photo
            }
        },

        nextPhoto() {
            const currentIndex = this.photos.findIndex(photo => photo.photo === this.modalPhotoUrl);
            if (currentIndex !== this.photos.length - 1) {
                const nextIndex = currentIndex + 1
                this.modalPhotoUrl = this.photos[nextIndex].photo
            } else {
                this.modalPhotoUrl = this.photos[currentIndex].photo
            }
        },

        handleKeyDown(event) {
            if (event.key === "ArrowLeft") {
                this.prevPhoto();
            } else if (event.key === "ArrowRight") {
                this.nextPhoto();
            }
        },
    },

    beforeMount() {
        const indexPhoto = this.photos.findIndex(photo => (photo.id === this.idPhoto))
        this.modalPhotoUrl = this.photos[indexPhoto].photo
        this.calculateModalPhotoSize()

        window.addEventListener('resize', this.calculateModalPhotoSize)
        this.$nextTick(() => {
            this.$refs.modal.focus()
        })
    },


}
</script>

<template>
    <div v-if="isVisible" class="modal" @click="closeModal" @keydown="handleKeyDown" tabindex="0" ref="modal">
        <div class="modal-content">
            <span class="arrow left" @click.stop="prevPhoto">&lt;</span>

            <span class="close" @click="closeModal">&times;</span>
            <img :src="domain + modalPhotoUrl" class="modal-photo" :style="[modalPhotoWidth, modalPhotoHeight]">

            <span class="arrow right" @click.stop="nextPhoto">&gt;</span>
        </div>
    </div>
</template>

<style scoped>
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