<template>
    <div>
        <my-header></my-header>
        <slot></slot>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import MyHeader from '../partials/Header.vue';
    import MyFooter from '../partials/Footer.vue';

    export default {
        components: {
            MyHeader,
            MyFooter
        }
    }
</script>