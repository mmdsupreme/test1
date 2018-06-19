<template>
    <main-layout>
        <nav>
            <div class="container">
                <div class="nav">
                    <div>
                        <div class="nav__back">
                            <router-link to="/" class="text-primary">&laquo; Вернуться к списку</router-link>
                        </div>
                        <h3 class="nav__title">
                            <template v-if="place">
                                <div class="text-secondary">
                                    {{ place.name }} <rating class="rating text-primary" :value="rating"></rating>
                                </div>
                                <div>
                                    <span class="text-primary">{{ place.category ? place.category.name : '' }},</span>
                                    <span class="place-address text-primary">{{ place.address }}</span>
                                </div>
                            </template>
                            <template v-else>
                                <div class="text-secondary">Место не найдено</div>
                            </template>
                        </h3>
                    </div>
                </div>
            </div>
        </nav>
        <main>
            <div v-show="place" class="container">
                <svg viewBox="0 0 32 32">
                    <circle :style="{ 'stroke-dasharray': percentOfScholarship + ' 100' }" r="16" cx="16" cy="16" />
                </svg>
                <div class="content">
                    <div class="place-info">
                        <div class="place-info__main">
                            <div>
                                <span class="text-primary">Cредний чек:</span> <span class="text-primary-dark">{{ place && place.averageCheck }} &#x20bd;</span>
                            </div>
                            <span class="text-primary">Здесь можно прогулять</span>
                            <span class="text-primary-dark">{{ isFinite(percentOfScholarship) ? percentOfScholarship + '% стипендии' : 'нисколько' }}</span>
                        </div>
                        <div class="place-info__images">
                            <img class="place-info__images_photo" :src="place && place.image">
                            <div class="place-info__images_map">
                                <yandex-map :width="'400px'" :height="'400px'" :places="[place]" :center="place && [place.lat, place.lon]" :zoom="15"></yandex-map>
                            </div>
                        </div>
                    </div>
                    <div class="place-reviews">
                        <div class="place-reviews__header">
                            <span class="text-primary-dark">Отзывы:</span>
                            <button @click.stop="$refs.modal.showModal()" class="text-primary">Написать отзыв</button>
                        </div>
                        <div v-if="place && place.reviews && place.reviews.length" class="place-reviews__items">
                            <review v-for="review in place.reviews" :review="review" :key="review.id"></review>
                        </div>
                        <div class="text-secondary text-center" v-else>Отзывов пока нет. Оставьте свой!</div>
                    </div>
                    <review-create :placeId="place && place.id" ref="modal"></review-create>
                </div>
            </div>
        </main>
    </main-layout>
</template>

<script>
    import MainLayout from './layouts/Main.vue';
    import Rating from '../Rating.vue';
    import Review from '../Review.vue';
    import ReviewCreate from '../ReviewCreate.vue';
    import YandexMap from '../Map.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            MainLayout,
            Rating,
            Review,
            ReviewCreate,
            YandexMap
        },
        computed: {
            ...mapGetters([
                'getPlaceById',
                'getPlaceRating',
                'getPlacePercentOfScholarship',
                'getPlaceReviewNumber'
            ]),
            place() {
                return this.getPlaceById(this.$route.params.id);
            },
            percentOfScholarship() {
                return this.getPlacePercentOfScholarship(this.place);
            },
            rating() {
                return this.getPlaceRating(this.place);
            },
            reviewNumber() {
                return this.getPlaceReviewNumber(this.place);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        padding: 0 0 48px 0;
    }

    .nav__title {
        font-weight: normal;
    }

    nav {
        border-bottom: 1px solid #BDBDBD;
    }

    .nav {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        height: 137px;
        justify-content: space-evenly;
    }

    .nav__back {
        position: relative;
        left: -8px;
        margin-bottom: 8px;
    }

    .rating {
        margin-left: 5px;
    }

    svg {
        width: 40px;
        height: 40px;
        transform: rotate(-90deg);
        border-radius: 50%;
        position: relative;
        top: -10px;
    }

    circle {
        fill: #A1CCF7;
        stroke: #0073E6;
        stroke-width: 32;
    }

    .place-info__main {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }

    .place-reviews {
        display: flex;
        flex-direction: column;
        width: 816px;
        position: relative;
        top: -18px;
    }

    .place-reviews__items {
        height: 584px;
        overflow-y: auto;
    }

    .place-reviews__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

        span {
            border-bottom: 1px solid #E5E5E5;
            width: 608px;
            padding-top: 8px;
        }

        button {
            width: 192px;
            height: 32px;
            padding: 8px 16px 8px 16px;
            color: #fff;
            background: #0073E6;
            border: none;
            cursor: pointer;
        }
    }

    .place-info {
        display: flex;
        flex-direction: column;
        margin-right: 16px;
    }

    .place-info__images {
        display: flex;
        flex-direction: column;
    }

    .place-info__images_photo {
        box-sizing: border-box;
        border: 1px solid #BDBDBD;
        padding: 8px;
        width: 400px;
        height: 168px;
        margin-bottom: 16px;
    }

    .place-info__images_map {
        box-sizing: border-box;
        border: 1px solid #E0E0E0;
    }

    .place-address {
        color: #333333;
    }
</style>