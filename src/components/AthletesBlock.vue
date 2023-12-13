<script>


export default {
    name: 'MvcAthletesBlock',
    computed: {
        athletesCount() {
            return this.athletes.length
        }
    },
    props: {
        athletes: {
            type: Array,
            required: true
        },
        domain: {
            type: String,
            required: true
        }
    }
}
</script>

<template>

    <div class="team-athletes">
        <div class="team-athletes-title">
            <p>Одноклубники<span class="team-athletes-title_span">&nbsp;{{athletesCount}}</span></p>
        </div>
        <div class="team-athletes-block">
            <div v-for="athlete in athletes" :key="athlete" class="team-athletes_item-block">
                <div class="athletes-img">
                    <img :src="domain + athlete.athlete_photo" alt="">
                </div>
                <div class="athletes-name">
                    <h4>{{ athlete.name }}</h4>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>