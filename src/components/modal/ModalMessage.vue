<script>
export default {
    name: 'MvcModalMessage',
    props: {
        messages: {
            type: Array,
            required: true
        },
        mood: {
            type: String,
            required: true
        },
        clearMessage: {
            type: String,
            required:false,
        },
        toRedirect: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            isModalHidden: false,
        }
    },
    computed: {
        textContent() {
            return this.messages
        },
        isOpen() {
            return this.messages.length !== 0
        }
    },
    methods: {
        closeButton() {
            if (!this.clearMessage) {
                this.isModalHidden = !this.isModalHidden
            }

            if (this.clearMessage) {
                this.$store.dispatch(this.clearMessage)
            }

            if(this.toRedirect) {
                this.$router.push(this.toRedirect)
            }
        },
        outsideClick(event) {
            if (event.target.classList.contains('modal')) {
                this.closeButton()
            }
        }
    },
}
</script>

<template>
    <div
            v-if="isOpen"
            :class="['modal', { 'modal-hidden': isModalHidden }]" @click="outsideClick">
        <div class="modal-content">
            <span class="close" @click="closeButton">&times;</span>
            <ul v-for="message in textContent" :key="message">
                <li :class=mood>{{ message }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-hidden {
    display: none;
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 350px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.red {
    color: red;
}
.green {
    color: green;
}
</style>