<script>
export default {
    name: 'MvcTeamsList',
    props: {
        teams: {
            type: Array,
            required: true
        },
        domain: {
            type: String,
            required: true
        },
    },
    methods: {
        handleButtonClick(team) {
            this.$emit('button-clicked', team)
        },
        truncatedDescription(description, value) {
            return description.substring(0, value) + '...'
        }
    },
    mounted() {
        console.log('Массив команд', this.teams)
    },

}
</script>

<template>
    <div v-if="teams.length !== 0">
        <div class="group-card" v-for="team in teams" :key="team">
            <div class="avatar">
                <img :src="domain + team.avatar" alt="Group Avatar">
            </div>
            <div class="group-info">
                <router-link
                        :to="{name: 'teamProfile', params: {slugTeam: team.slug}}">
                    <h3 v-if="team.name.length > 40">{{ truncatedDescription(team.name, 40) }}</h3>
                    <h3 v-else>{{ team.name }}</h3>
                </router-link>
                <p v-if="team.description.length > 80">{{truncatedDescription(team.description, 80)}}</p>
                <p v-else>{{ team.description }}</p>
                <p class="subscribers">{{ team.count_members }} подписчиков</p>
            </div>

            <div v-if="!team.is_user_member" class="group-card-button">
                <button class="submit-button"
                        @click="handleButtonClick(team.id)">Вступить
                </button>
            </div>

            <div v-else class="group-card-button">
                <button class="submit-button submit-button-red"
                        @click="handleButtonClick(team.id)">Выйти
                </button>
            </div>
        </div>
    </div>

    <div v-else>

    </div>

</template>

<style scoped>

</style>