<script>
export default {
    name: 'MvcCreateTeam'
}
</script>

<template>
    <router-link
            :to="{name: 'createTeam'}"
            class="create-team"
    >
        <slot></slot>
    </router-link>
</template>

<style scoped>

.create-team {
    margin-left: auto;
    display: block;
    background-color: #4caf50;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: all 0.4s ease;
}

.create-team:hover {
    background-color: #a1dca1;
}

</style>