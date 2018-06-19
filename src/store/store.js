import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import map from './modules/map';
import api from './modules/api';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        map,
        api
    },
    state: {
        scholarship: 10000,
        places: [],
        categories: []
    },
    mutations: {
        setPlaces(state, places) {
            state.places = places;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setScholarship(state, scholarship) {
            state.scholarship = scholarship;
        },
        createPlace(state, place) {
            state.places.push(place);
        },
        deletePlaceById(state, id) {
            state.places = state.places.filter(place => place.id != id);
        },
        createReview(state, { review, place }) {
            place.reviews.push(review);
        },
    },
    getters: {
        scholarship: state => {
            return state.scholarship;
        },
        categories: state => {
            return state.categories;
        },
        places: state => {
            return state.places;
        },
        totalPlacesNumber: state => {
            return state.places.length;
        },
        getPlaceById: (state, getters) => placeId => {
            return getters.places.find(place => place.id == placeId);
        },
        getPlaceRating: state => place => {
            let rating = 0;
            let reviews = place.review;

            if (reviews) {
                reviews.forEach(review => {
                    rating += review.rating;
                });

                rating /= reviews.length;
            }

            return rating;
        },
        getPlacePercentOfScholarship: state => place => {
            return place ? Math.round(place.averageCheck / parseFloat(state.scholarship) * 100) : 0;
        },
        getPlaceReviewNumber: state => place => {
            return place && place.review ? place.review.length : 0;
        }
    }
});