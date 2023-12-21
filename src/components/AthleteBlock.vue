<script>

export default {
    name: 'MvcAthleteBlock',
    props: {
        athletes: {
            type: Array,
            required: false
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
            <h3>Члены команды</h3>
        </div>

        <div
                v-for="athlete in athletes" :key="athlete.id"
                class="captain-block-content-hover"
        >
            <router-link
                    :to="{name: 'userProfile', params: {userProfileId: athlete.id}}"
            >
                <div class="captain-block-content">
                    <div class="captain-block-content-foto">
                        <img :src="domain+athlete.athlete_photo" alt="">
                    </div>
                    <div class="captain-block-content-info">
                        <h3>{{ athlete.name }}</h3>
                        <h5>{{ athlete.city }}</h5>
                    </div>
                </div>
            </router-link>


        </div>

    </div>
</template>

<style scoped>

</style>