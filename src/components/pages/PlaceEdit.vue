<template>
    <main-layout>
        <nav>
            <div class="container">
                <div class="nav">
                    <div>
                        <div class="nav__back">
                            <router-link to="/" class="text-primary">&laquo; Вернуться к списку</router-link>
                        </div>
                        <h3 class="nav__title text-secondary">
                            <template v-if="place">Редактирование места</template>
                            <template v-else>Место не найдено</template>
                        </h3>
                    </div>
                </div>
            </div>
        </nav>
        <main>
            <div v-show="place" class="container">
                <section>
                    <div class="content">
                        <form class="content__form">
                            <label class="text-primary" for="name">Название:</label>
                            <input v-model="place && place.name" type="text" name="name" id="name" placeholder="Введите название места">

                            <label class="text-primary" for="address">Адрес:</label>
                            <input v-model="place && place.address" type="text" name="address" id="address" placeholder="Введите точный адрес места">

                            <label class="text-primary" for="average-check">Средний чек:</label>
                            <input v-model="place && place.averageCheck" type="number" name="average_check" id="average-check"
                                   placeholder="Введите размер среднего чека, руб." min="1" step="0.01">

                            <label class="text-primary">Категория:</label>
                            <select v-model="place && place.category">
                                <option></option>
                                <option v-for="category in categories" :value="{ id: category.id, name: category.name }">{{ category.name }}</option>
                            </select>

                            <label class="text-primary" for="photo">Фото:</label>
                            <input v-model="place && place.image" type="text" name="photo_url">
                            <input type="file" name="photo" id="photo" accept="image/*">

                            <img :src="place && place.image">

                            <button class="text-primary" type="submit" @click.prevent="updatePlace">Сохранить</button>
                        </form>
                        <div class="content__map">
                            <span class="content__map_title text-primary">Укажите место на карте:</span>
                                <yandex-map
                                    class="content__map_body"
                                    :width="'816px'"
                                    :height="'100%'"
                                    :places="[place]"
                                    :center="place && [place.lat, place.lon]"
                                    :zoom="15"
                                >
                                </yandex-map>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </main-layout>
</template>

<script>
    import MainLayout from './layouts/Main.vue';
    import YandexMap from '../Map';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            MainLayout,
            YandexMap
        },
        computed: {
            ...mapGetters([
                'categories',
                'getPlaceById'
            ]),
            place() {
                return this.getPlaceById(this.$route.params.id);
            }
        },
        methods: {
            updatePlace() {
                this.$store.dispatch('updatePlace', { place: this.place, router: this.$router });
            }
        }
    }
</script>

<style lang="scss" scoped>
    nav {
        border-bottom: 1px solid #BDBDBD;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url('../../assets/images/arrow-down.png') #fff 98% 50% no-repeat;
        padding: 8px 15px 8px 16px;
        margin-bottom: 24px;
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
        left: -10px;
        margin-bottom: 8px;
    }

    .content {
        display: flex;
        justify-content: space-between;
        padding: 30px 0 30px 0;
    }

    .content__form {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        width: 400px;

        label {
            display: block;
            margin-bottom: 8px;
        }

        input, select {
            padding: 8px 15px 8px 16px;
            margin-bottom: 24px;
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
        }

        button {
            padding: 10px;
            color: #fff;
            background: #0073E6;
            border: none;
            cursor: pointer;
        }

        img {
            box-sizing: border-box;
            width: 400px;
            border: 1px solid #BDBDBD;
            padding: 8px;
            margin-bottom: 24px;
        }

        #photo {
            display: none;
        }
    }

    .content__map {
        display: flex;
        flex-direction: column;
    }

    .content__map_title {
        margin-bottom: 8px;
    }

    .content__map_body {
        flex: 1;
        border: 1px solid #E0E0E0;
    }
</style>