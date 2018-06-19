import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import places from '../assets/places';
import categories from '../assets/categories';
import map from './modules/map';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        map
    },
    state: {
        scholarship: 3000,
        places,
        categories
    },
    actions: {
        setScholarship(context, scholarship) {
            context.commit('setScholarship', scholarship);
        },
        createPlace(context, place) {
            context.commit('createPlace', place);
        },
        deletePlaceById(context, id) {
            context.commit('deletePlaceById', id);
        }
    },
    mutations: {
        setScholarship(state, scholarship) {
            state.scholarship = scholarship;
        },
        createPlace(state, place) {
            state.places.push(place);
        },
        deletePlaceById(state, id) {
            state.places = state.places.filter(place => place.id != id);
        }
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
        },
        getNewPlaceId: (state, getters) => {
            let maxPlaceId = Math.max(...getters.places.map(place => place.id), 0);

            return ++maxPlaceId;
        }
    }
});