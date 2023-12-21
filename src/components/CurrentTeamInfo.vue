<script>
export default {
    name: 'MvcCurrentTeamInfo',
    props: {
        domain: {
            type: String,
            required: true
        },
        currentTeam: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    methods: {

    }
}
</script>

<template>
<div class="group-container">
            <div class="group-container-left">
                <div class="group-container-left-avatar">
                    <img :src="domain+currentTeam.avatar" alt="">
                </div>

                <div class="group-container-left-button">
                    <router-link
                            :to="{name: 'editTeam', params: {slugTeam: currentTeam.slug}}"
                            v-if="currentTeam.captain_id===user.id"
                    >
                        Редактирвоать
                    </router-link>

                    <a
                            v-if="currentTeam.is_user_member"
                            :href="currentTeam.telegram_team"
                            target="_blank"
                    >Чат
                    </a>

                    <button
                            v-if="!currentTeam.is_user_member"
                            @click="$emit('subscribe')"
                    >Вступить
                    </button>
                    <button
                            v-if="currentTeam.is_user_member && currentTeam.captain_id !== user.id"
                            @click="$emit('subscribe')"
                    >Покинуть
                    </button>

                </div>
            </div>
            <div class="group-container-right">
                <h2>{{ currentTeam.name }}</h2>
                <h3>{{ currentTeam.description }}</h3>
                <h4>{{currentTeam.detailed_description}}</h4>
            </div>
        </div>
</template>

<style scoped>

</style>