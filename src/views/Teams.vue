<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const"
import MvcTeamsList from "@/components/TeamsList.vue";


export default {
    name: 'MvcTeams',
    components: {
        MvcTeamsList,
    },
    data() {
        return {
            domain: domainConst.domain,
            searchQuery: '',
            sortedType: 'none',

        }
    },
    methods: {
        handleButtonClick(team) {
            const user = this.$store.getters['getUser']
            const credentials = {
                team: team,
                user: user.id
            }
            this.$store.dispatch('isSubmitting', credentials)
        }
    },
    computed: {
        ...mapState({
            allTeams: state => state.teams.allTeams,
            isLoading: state => state.teams.isLoading,
            isLoggedIn: state => state.auth.isLoggedIn,
        }),
        otherTeams() {
            return this.allTeams.filter(team => team.is_user_member === false)
        },
        userTeams() {
            return this.allTeams.filter(team => team.is_user_member === true)
        }
    },
    watch: {
        sortedType() {
            this.$store.dispatch('sortedTeams', this.sortedType)
        },
        searchQuery() {
            this.$store.dispatch('searchTeams', this.searchQuery)
        }
    },

    beforeCreate() {
        this.$store.dispatch('getAllTeams')
    },
    created() {

    }

}
</script>
<template>
    <div class="class-flex">
        <div class="block-search-area">
            <div class="block-search">
                <input type="text" placeholder="Поиск по названию или описанию" v-model="searchQuery"
                       class="search-input">
                <router-link
                        v-if="isLoggedIn"
                        :to="{name: 'createTeam'}"
                        class="create-team"
                >Создать новую команду
                </router-link>
            </div>

            <div class="block-sort-team">
                <label class="block-sort-team-label" for="sorted">Сортировать по:</label>
                <select class="block-sort-team-select" id="sorted" v-model="sortedType" required>
                    <option value="none" v-if="sortedType==='none'">выберите фильтр</option>
                    <option value="count">Количество участников</option>
                    <option value="name">Названию команды</option>
                </select>
            </div>
        </div>

            <div v-if="userTeams.length !== 0" class="block-search-area">
                <h2>Мои команды</h2>
                <mvc-teams-list
                        v-if="!isLoading"
                        :teams="userTeams"
                        :domain="domain"
                        @button-clicked="handleButtonClick"
                >
                </mvc-teams-list>
                <div class="loader" v-else></div>
            </div>

            <div v-if="otherTeams.length !== 0" class="block-search-area">
                <h2>Все команды</h2>
                <mvc-teams-list
                        v-if="!isLoading"
                        :teams="otherTeams"
                        :domain="domain"
                        @button-clicked="handleButtonClick"
                >
                </mvc-teams-list>
                <div class="loader" v-else></div>
            </div>

    </div>
</template>

<style>

</style>


