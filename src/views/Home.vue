<template>
    <div class="container class-flex">

        <section class="hero-section">
            <h2>Добро пожаловать в Лыжи и Бег!</h2>
            <p>Социальная сеть, объединяющая лыжников и бегунов со всего мира.</p>
            <a href="#" class="btn btn-primary">Присоединиться</a>
        </section>

        <section class="features-section">
            <div class="feature">
                <i class="fas fa-skiing"></i>
                <h3>Лыжи</h3>
                <p>Поделитесь своими трассами, техникой и событиями. Найдите новых компаньонов для тренировок.</p>
            </div>

            <div class="feature">
                <i class="fas fa-running"></i>
                <h3>Бег</h3>
                <p>Отслеживайте свои пробежки, устанавливайте рекорды и получайте поддержку от сообщества.</p>
            </div>
        </section>

    </div>
</template>


<script>

export default {
    name: 'MvcHome',
    components: {},

    data() {
        return {
            x: 'баян'
        }
    },

    methods: {},

}

</script>


<style scoped>

</style>