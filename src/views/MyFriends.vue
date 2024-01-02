<script>
import {mapState} from "vuex";
import constData from "@/helpers/const"
import MvcSubList from "@/components/subList.vue";

export default {
    name: "MyFriends",
    components: {MvcSubList,},

    data() {
        return {
            domain: constData.domain
        }
    },

    computed: {
        ...mapState({
            subscriptions: state => state.subscription.subscriptions,
            isLoading: state => state.subscription.isLoading

        })
    },


    beforeCreate() {
        this.$store.dispatch('getSubscriptions')
    }
}
</script>

<template>
    <div class="block-area">
        <mvc-sub-list
                :domain="domain"
                :athletes="subscriptions"
                :is-loading="isLoading"
                sub="subscriptions"
        >
            <h3>Подписки</h3>
        </mvc-sub-list>

    </div>
</template>

<style scoped>

</style>