import Vue from 'vue/dist/vue';
import App from './App';
import router from './routing/router';
import store from './store/store';
import 'normalize.css';
import './assets/styles/main.scss';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});