<template>
    <div class="container">
        <div class="filters">
            <div class="filter-items">
                <div class="filter-item__scholarship">
                    <label class="text-primary">Сколько: {{ scholarshipPercentMin }}% - {{ scholarshipPercentMax }}% стипендии</label>
                    <slider @drag-end="applyFilters" v-model="scholarshipPercentRange" ref="slider"></slider>
                </div>
                <div class="filter-item__rating">
                    <label class="text-primary">Как:</label>
                    <span class="star-rating star-5">
                        <input type="radio" name="rating" value="1" v-model="rating" @change="applyFilters"><i></i>
                        <input type="radio" name="rating" value="2" v-model="rating" @change="applyFilters"><i></i>
                        <input type="radio" name="rating" value="3" v-model="rating" @change="applyFilters"><i></i>
                        <input type="radio" name="rating" value="4" v-model="rating" @change="applyFilters"><i></i>
                        <input type="radio" name="rating" value="5" v-model="rating" @change="applyFilters"><i></i>
                    </span>
                </div>
                <div class="filter-item__place">
                    <label class="text-primary">Где:</label>
                    <select v-model="categoryId" @change="applyFilters" >
                        <option></option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from './Slider.vue';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                scholarshipPercentRange: [],
                categoryId: null,
                rating: null
            }
        },
        components: {
            Slider
        },
        computed: {
            ...mapGetters([
                'places',
                'categories',
                'getPlaceRating',
                'getPlacePercentOfScholarship'
            ]),
            scholarshipPercentMin() {
                return this.scholarshipPercentRange[0];
            },
            scholarshipPercentMax() {
                return this.scholarshipPercentRange[1];
            }
        },
        methods: {
            getFilteredPlaces() {
                return this.places.filter(place => {
                    let percentOfScholarship = this.getPlacePercentOfScholarship(place);
                    return (this.scholarshipPercentMin <= percentOfScholarship) && (percentOfScholarship <= this.scholarshipPercentMax);
                }).filter(place => {
                    return this.categoryId ? (place.category.id == this.categoryId) : true;
                }).filter(place => {
                    let rating = this.getPlaceRating(place);
                    return this.rating ? (Math.round(rating) == this.rating) : true;
                });
            },
            applyFilters() {
                let filteredPlaces = this.getFilteredPlaces();
                this.$emit('filters-applied', filteredPlaces);
            },
            resetFilters() {
                this.categoryId = null;
                this.rating = null;
                this.$refs.slider.value = [0, 100];
                this.$emit('filters-applied', this.places);
            }
        }
    }
</script>

<style lang="scss" scoped>
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url('../assets/images/arrow-down.png') #fff 95% 50% no-repeat;
        padding: 8px 15px 8px 16px;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }

    label {
        margin-bottom: 12px;
    }

    .filters {
        margin: 0 0 20px 0;
    }

    .filter-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 136px;
    }

    .filter-item__scholarship {
        display: flex;
        flex-direction: column;

        label, input {
            width: 816px;
        }
    }

    .filter-item__rating {
        display: flex;
        flex-direction: column;

        label, div {
            width: 163px;
        }
    }

    .filter-item__place {
        display: flex;
        flex-direction: column;

        label, select {
            width: 193px;
        }
    }

    .star-rating {
        font-size: 0;
        white-space: nowrap;
        display: inline-block;
        height: 15px;
        overflow: hidden;
        position: relative;
        background: url('../assets/images/rating-actual-star.png') repeat-x;
        background-size: contain;
    }

    .star-rating i {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 1;
        background: url('../assets/images/rating-star.png') repeat-x;
        background-size: contain;
    }

    .star-rating input {
        -moz-appearance: none;
        -webkit-appearance: none;
        opacity: 0;
        display: inline-block;
        height: 100%;
        margin: 0;
        padding: 0;
        z-index: 2;
        position: relative;
    }

    .star-rating input:hover + i,
    .star-rating input:checked + i {
        opacity: 1;
    }

    .star-rating i ~ i {
        width: 40%;
    }

    .star-rating i ~ i ~ i {
        width: 60%;
    }

    .star-rating i ~ i ~ i ~ i {
        width: 80%;
    }

    .star-rating i ~ i ~ i ~ i ~ i {
        width: 100%;
    }

    ::after,
    ::before {
        height: 100%;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
    }

    .star-rating.star-5 {
        width: 80px;
    }

    .star-rating.star-5 input,
    .star-rating.star-5 i {
        width: 20%;
    }

    .star-rating.star-5 i ~ i {
        width: 40%;
    }

    .star-rating.star-5 i ~ i ~ i {
        width: 60%;
    }

    .star-rating.star-5 i ~ i ~ i ~ i {
        width: 80%;
    }

    .star-rating.star-5 i ~ i ~ i ~ i ~ i {
        width: 100%;
    }
</style>