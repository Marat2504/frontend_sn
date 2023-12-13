<script>
export default {
    name: "MvcCaptainBlock",
    props: {
        captain: {
            type: Object,
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
            <p>Капитан</p>
        </div>
        <div class="team-athletes-block">
            <div class="team-athletes_item-block">
                <div class="athletes-img">
                    <img :src="domain + captain.athlete_photo" alt="">
                </div>
                <div class="athletes-name">
                    <h4>{{ captain.name }}</h4>
                </div>
            </div>
        </div>
    </div></template>

<style scoped>

</style>