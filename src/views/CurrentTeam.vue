<script>
import {mapState} from "vuex";
import domainConst from "@/helpers/const"
import MvcAthletesBlock from "@/components/AthletesBlock.vue"
import MvcCaptainBlock from "@/components/CaptainBlock.vue"

export default {
    name: 'MvcCurrentTeam',
    components: {
        MvcAthletesBlock, MvcCaptainBlock
    },
    data() {
        return {
            domain: domainConst.domain,
        }
    },
    computed: {
        ...mapState({
            currentTeam: state => state.currentTeam.currentTeam,
            teamAthletes: state => state.currentTeam.teamAthletes,
            teamCaptain: state => state.currentTeam.teamCaptain
        })
    },
    beforeCreate() {
        this.$store.dispatch('getCurrentTeam', this.$route.params.slugTeam)
        this.$store.dispatch('getAthletesTeam', this.$route.params.slugTeam)
        this.$store.dispatch('getCaptainTeam', this.$route.params.slugTeam)
    }
}
</script>

<template>
    <div class="class-flex">
        <div class="current-team-block-people">
            <mvc-athletes-block
                    :athletes="teamAthletes"
                    :domain="domain"
            ></mvc-athletes-block>

            <mvc-captain-block
                    :domain="domain"
                    :captain="teamCaptain">
            </mvc-captain-block>
        </div>


        <br>
        <div>{{ currentTeam }}</div>
        <br>
        <div>{{ domain }}</div>
        <br>
        <div>{{ teamAthletes }}</div>
                <br>
        <div>{{ teamCaptain }}</div>
    </div>
</template>

<style scoped>

</style>