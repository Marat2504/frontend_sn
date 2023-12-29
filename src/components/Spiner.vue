<script>
export default {
    name: 'MvcSpinner'
}
</script>

<template>
<div class="loader">

</div>
</template>

<style scoped>
.loader {
    border: 4px solid #f3f3f3; /* цвет внешнего кольца */
    border-top: 4px solid #3498db; /* цвет активного сектора */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite; /* анимация вращения */
    margin: 0 auto; /* для отображения по центру */
}

@keyframes spin { /* анимация вращения */
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>