<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const"
import MvcCaptainBlock from "@/components/CaptainBlock.vue";
import MvcAthleteBlock from "@/components/AthleteBlock.vue";
import MvcCurrentTeamInfo from "@/components/CurrentTeamInfo.vue";

export default {
    name: 'MvcCurrentTeam',
    components: {MvcCurrentTeamInfo, MvcAthleteBlock, MvcCaptainBlock,},
    data() {
        return {
            domain: domainConst.domain,
            userProfile: JSON.parse(localStorage.getItem('userprofile'))
        }
    },
    methods: {
        handleChildClick() {
            console.log('кнопка нажата')
            const credentials = {
                user: this.user.id,
                team: this.currentTeam.id
            }
            this.$store.dispatch('isSubscribeCurrentTeam', credentials)
            const profile = {...this.userProfile}
            this.$store.dispatch('changeUserStatus', profile)
        }
    },
    computed: {
        ...mapState({
            currentTeam: state => state.currentTeam.currentTeam,
            teamAthletes: state => state.currentTeam.teamAthletes,
            teamCaptain: state => state.currentTeam.teamCaptain,
            isLoading: state => state.currentTeam.isLoading,
            user: state => state.auth.user,
        })
    },
    watch: {
        teamAthletes() {
            console.log('список атлетов команды изменен')
        }
    },
    beforeCreate() {
        const userProfile = JSON.parse(localStorage.getItem('userprofile'))
        this.$store.dispatch('getCurrentTeam', this.$route.params.slugTeam)
        this.$store.dispatch('getAthletesTeam', this.$route.params.slugTeam)
        this.$store.dispatch('getCaptainTeam', this.$route.params.slugTeam)
        this.$store.dispatch('getDataOtherUser', userProfile.id)
    }
}
</script>

<template>
    <div class="class-flex">
        <div class=" block-area">
            <MvcCurrentTeamInfo
                    @click="handleChildClick"
                    v-if="!isLoading"
                    :domain="domain"
                    :currentTeam="currentTeam"
                    :user="user"
            ></MvcCurrentTeamInfo>
        </div>

        <div class="block-area">
            <MvcCaptainBlock
                    v-if="!isLoading"
                    :domain="domain"
                    :captain="teamCaptain"
            ></MvcCaptainBlock>
            <div v-else class="loader"></div>
        </div>
        <div class="block-area" v-if="teamAthletes.length !== 0">
            <MvcAthleteBlock
                    v-if="!isLoading"
                    :domain="domain"
                    :athletes="teamAthletes"
            ></MvcAthleteBlock>
            <div v-else class="loader"></div>
        </div>
    </div>


</template>

<style scoped>

</style>