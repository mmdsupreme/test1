<template>
    <main-layout>
        <div class="not-found">
            <div class="not-found__image">
                <img src="../../assets/images/page-not-found.jpg">
            </div>
            <div class="not-found__back">
                <router-link to="/">&laquo; Вернуться на главную страницу</router-link>
            </div>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from './layouts/Main.vue';

    export default {
        components: {
            MainLayout
        }
    }
</script>

<style lang="scss" scoped>
    .not-found {
        font-family: 'Roboto', sans-serif;
        text-align: center;
    }

    .not-found__image {
        margin: 20px 0 20px 0;
    }

    .not-found__back {
        margin: 0 0 20px 0;

        a {
            color: #0073E6;
        }
    }
</style>