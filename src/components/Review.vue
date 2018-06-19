<template>
    <div class="review-item">
        <div class="review-item__header">
            <span class="text-primary review-author">{{ review.author }}</span>
            <span class="review-rating"><rating :value="review.rating"></rating></span>
        </div>
        <div class="review-item__text text-primary-dark">
            {{ review.text }}
        </div>
    </div>
</template>

<script>
    import Rating from './Rating.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            Rating
        },
        props: {
            review: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .review-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
    }

    .review-item__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .review-item__text {
        height: 112px;
        padding: 16px 16px 22px 16px;
        box-sizing: border-box;
        border: 1px solid #E5E5E5;
        background: #FFFFFF;
    }

</style>