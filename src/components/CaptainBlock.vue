<script>
export default {
    name: 'MvcCaptainBlock',
    props: {
        captain: {
            type: Object,
            required: true
        },
        domain: {
            type: String,
            required: true
        }
    },
}
</script>

<template>

    <div class="captain-block">
        <div class="captain-block-title">
            <h3>Капитан команды</h3>
        </div>

        <div class="captain-block-content-hover">
            <router-link
                    :to="{name: 'userProfile', params: {userProfileId: captain.id}}"
            >
                <div class="captain-block-content">
                    <div class="captain-block-content-foto">
                        <img :src="domain+captain.athlete_photo" alt="">
                    </div>
                    <div class="captain-block-content-info">
                        <h3>{{ captain.name }}</h3>
                        <h5>{{ captain.city }}</h5>
                    </div>
                </div>
            </router-link>

        </div>
    </div>

</template>

<style scoped>

</style>