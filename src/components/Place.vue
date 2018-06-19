<template>
    <div class="place-item text-primary"
         :class="{ active: itemActive }"
         @click="openDetailPage"
         @mouseenter="switchControlsState"
         @mouseleave="switchControlsState"
    >
        <place-controls :placeId="place.id" :class="{ hidden: !controlsActive }"></place-controls>
        <div class="place-item__title">{{ place.name }}</div>
        <div class="place-item__reviews">
            <rating class="text-primary" :value="rating"></rating>
            <span class="text-primary">(Отзывов: {{ reviewNumber }})</span>
        </div>
        <div>
            <span class="text-primary">Средний чек:</span>
            <span class="place-item__average-check">{{ place.averageCheck }} &#x20bd; ({{ percentOfScholarship }})
            </span>
        </div>
        <div>
            <span class="text-primary">{{ place.category ? place.category.name : '' }},</span>
            <span class="place-item__address text-primary">{{ place.address }}</span>
        </div>
    </div>
</template>

<script>
    import PlaceControls from './PlaceControls.vue';
    import Rating from './Rating.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            PlaceControls,
            Rating
        },
        props: {
            place: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                controlsActive: false,
                itemActive: false
            }
        },
        computed: {
            ...mapGetters([
                'getPlaceRating',
                'getPlacePercentOfScholarship',
                'getPlaceReviewNumber'
            ]),
            percentOfScholarship() {
                let percentOfScholarship = this.getPlacePercentOfScholarship(this.place);

                return isFinite(percentOfScholarship) ? percentOfScholarship + '% стипендии' : 'Никак не потянуть'
            },
            rating() {
                return this.getPlaceRating(this.place);
            },
            reviewNumber() {
                return this.getPlaceReviewNumber(this.place);
            }
        },
        methods: {
            switchControlsState() {
                this.controlsActive = !this.controlsActive;
            },
            switchItemState() {
                this.itemActive = !this.itemActive;
            },
            openDetailPage() {
                this.$router.push({ name: 'place-detail', params: { id: this.place.id }});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .place-item {
        position: relative;
        box-sizing: border-box;
        border: 1px solid #E0E0E0;
        margin-bottom: 16px;
        padding: 8px 8px 8px 16px;
        width: 392px;
        height: 112px;
        background: #fff;
        cursor: pointer;

        &:hover {
            border: 1px solid #BDBDBD;
        }
    }

    .place-item__title {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: #333333;
        margin-bottom: 8px;
    }

    .place-item__reviews {
        margin-bottom: 8px;
    }

    .place-item__average-check, .place-item__address {
        color: #333333;
    }

    .place-item__reviews {
        display: flex;
        align-content: center;
    }

    .active:after, .active:before {
        right: 100%;
        top: 50%;
        border: 1px solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .active:after {
        border-right-color: #FFF;
        border-width: 24px;
        margin-top: -24px;
    }
    .active:before {
        border-right-color: #E0E0E0;
        border-width: 25px;
        margin-top: -25px;
    }

    .active:hover:before {
        border-right-color: #BDBDBD;
    }
</style>