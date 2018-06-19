<template>
    <main-layout>
        <nav>
            <filters @filters-applied="setFilteredPlaces" ref="filters"></filters>
        </nav>
        <main>
            <div class="container">
                <div class="filters-info">
                    <span class="text-primary">Показано: {{ filteredPlacesNumber }} из {{ totalPlacesNumber }}
                        <span class="filters-info__reset" @click="resetFilters">(очистить фильтры)</span>
                    </span>
                </div>
                <div class="places">
                    <div class="places__map">
                        <yandex-map
                            class="places__map_body"
                            :places="filteredPlaces"
                            :width="'816px'"
                            :height="'624px'"
                            @placemark-clicked="switchPlaceState"
                        >
                        </yandex-map>
                    </div>
                    <div class="places__items">
                        <template v-if="filteredPlacesNumber">
                            <place v-for="place in filteredPlaces" :place="place" :key="place.id" :ref="'place' + place.id"></place>
                        </template>
                        <div v-else class="places__not-found text-secondary">
                            Заведения не найдены
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </main-layout>
</template>

<script>
    import MainLayout from './layouts/Main.vue';
    import Filters from '../Filters.vue';
    import Place from '../Place.vue';
    import YandexMap from '../Map.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            MainLayout,
            Filters,
            Place,
            YandexMap
        },
        data() {
            return {
                filteredPlaces: this.$store.getters.places
            }
        },
        computed: {
            ...mapGetters([
                'places',
                'totalPlacesNumber'
            ]),
            filteredPlacesNumber() {
                return this.filteredPlaces.length;
            }
        },
        methods: {
            setFilteredPlaces(filteredPlaces) {
                this.filteredPlaces = filteredPlaces;
            },
            resetFilters() {
                this.$refs.filters.resetFilters();
            },
            switchPlaceState(place) {
                this.$refs['place' + place.id][0].switchItemState();
            }
        },
        watch: {
            places: function() {
                this.$refs.filters.applyFilters();
            }
        }
    }
</script>

<style lang="scss" scoped>
    nav {
        border-bottom: 1px solid #BDBDBD;
    }

    .filters-info {
        padding: 28px 0 21px 0;
    }

    .filters-info__reset {
        cursor: pointer;
    }

    .places {
        display: flex;
        height: 624px;
        padding-bottom: 47px;
    }

    .places__map {
        display: flex;
        flex-direction: column;
    }

    .places__map_body {
        flex: 1;
        border: 1px solid #E0E0E0;
        box-sizing: border-box;
    }

    .places__items {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 460px;
        overflow-y: auto;
        border-top: 1px solid #E0E0E0;
        border-bottom: 1px solid #E0E0E0;
    }

    .places__not-found {
        margin-top: 20px;
    }
</style>