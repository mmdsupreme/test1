export default {
    state: {
        map: null,
        defaultPlaceIcon: 'islands#redDotIcon',
        placeCategoryMap: {
            1: 'islands#blueFoodCircleIcon',
            2: 'islands#blueFoodCircleIcon',
            3: 'islands#blueCinemaCircleIcon',
            4: 'islands#blueBarCircleIcon'
        }
    },
    mutations: {
        setMap: (state) => {
            if (state.map) {
                return;
            }

            state.map = new Promise((resolve, reject) => {
                const yandexMapScript = document.createElement('script');
                const ymapSource = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

                yandexMapScript.setAttribute('src', ymapSource);
                yandexMapScript.setAttribute('defer', '');
                document.body.appendChild(yandexMapScript);

                yandexMapScript.onload = () => {
                    window.ymaps.ready(() => {
                        resolve(window.ymaps);
                    });
                };

                yandexMapScript.onerror = (error) => reject(error);
            });
        }
    },
    actions: {
        getMap(context) {
            context.commit('setMap');

            return context.state.map.then(map => {
                return new map.Map('map', {
                    center: [54.314680, 48.395923],
                    zoom: 12
                });
            }).catch(error => {
                console.error('Error occurred while loading Yandex.Maps:', error);

                return error;
            });
        }
    },
    getters: {
        getPlaceIconByCategoryId: state => categoryId => {
            return state.placeCategoryMap[categoryId] ? state.placeCategoryMap[categoryId] : state.placeCategoryMap[0];
        },
        defaultPlaceIcon: state => {
            return state.defaultPlaceIcon;
        }
    }
}