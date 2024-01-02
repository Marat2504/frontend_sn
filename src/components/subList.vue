<script>
import MvcSpinner from "@/components/Spiner.vue";

export default {
    name: 'MvcSubList',
    components: {MvcSpinner},
    props: {
        isLoading: {
            type: Boolean,
            required: true
        },
        athletes: {
            type: Array,
            required: true
        },
        domain: {
            type: String,
            required: true
        },
        sub: {
            type: String,
            required: true
        }

    },

}
</script>

<template>
    <template v-if="sub==='subscriptions'">
        <div class="captain-block" v-if="!isLoading">
            <div class="captain-block-title">
                <slot></slot>
            </div>

            <div
                    v-for="athlete in athletes" :key="athlete.id"
                    class="captain-block-content-hover"
            >
                <router-link
                        :to="{name: 'userProfile', params: {userProfileId: athlete.target_user.id}}"
                >
                    <div class="captain-block-content">
                        <div class="captain-block-content-foto">
                            <img :src="domain+athlete.target_user.athlete_photo" alt="">
                        </div>
                        <div class="captain-block-content-info">
                            <h3>{{ athlete.target_user.name }}</h3>
                            <h5>{{ athlete.target_user.city }}</h5>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
        <mvc-spinner v-else></mvc-spinner>
    </template>

    <template v-if="sub==='subscribers'">
        <div class="captain-block" v-if="!isLoading">
            <div class="captain-block-title">
                <slot></slot>
            </div>

            <div
                    v-for="athlete in athletes" :key="athlete.id"
                    class="captain-block-content-hover"
            >
                <router-link
                        :to="{name: 'userProfile', params: {userProfileId: athlete.subscriber.id}}"
                >
                    <div class="captain-block-content">
                        <div class="captain-block-content-foto">
                            <img :src="domain+athlete.subscriber.athlete_photo" alt="">
                        </div>
                        <div class="captain-block-content-info">
                            <h3>{{ athlete.subscriber.name }}</h3>
                            <h5>{{ athlete.subscriber.city }}</h5>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
        <mvc-spinner v-else></mvc-spinner>
    </template>

</template>

<style scoped>

</style>