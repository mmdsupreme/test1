<template>
    <span class="rating">
        <span :style="{ 'width': ratingPercent + '%' }" class="rating__actual"></span>
    </span>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number
            }
        },
        computed: {
            ratingPercent() {
                return (this.value / 5) * 100;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rating {
        display: inline-block;
        width: 80px;
        height: 16px;
        background: url('../assets/images/rating-actual-star.png') repeat-x;
        margin-right: 8px;
    }

    .rating__actual {
        display: inline-block;
        height: 16px;
        background: url('../assets/images/rating-star.png') repeat-x;
    }
</style>