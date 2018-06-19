<template>
    <header>
        <div class="container">
            <div class="header">
                <h2 class="header__title">Прогуляй стипендию!</h2>
                <div class="header__scholaship-sum">
                    <label class="text-primary">Размер стипендии:</label>
                    <input class="text-secondary" v-model="scholarship">
                    &#x20bd;
                </div>
                <div class="header__action-link">
                    <router-link to="/place/create" class="text-primary">Добавить место</router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        computed: {
            scholarship: {
                get() {
                    return this.$store.getters.scholarship;
                },
                set(value) {
                    this.$store.dispatch('setScholarship', value);
                }
            }
        }
    }
</script>

<style lang="scss">
    header {
        color: #fff;
        background: #4296EA;

        .text-primary {
            color: #fff;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }

    .header__title {
        font-family: 'Roboto Slab', serif;
        font-size: 22px;
        font-weight: bold;
    }

    .header__action-link {
        background: #0073E6;
        line-height: 50px;
        text-align: center;
        width: 192px;
    }

    .header__scholaship-sum input {
        border: none;
        background: #0073E6;
        line-height: 50px;
        text-align: center;
        padding: 0;
        color: #fff;
        width: 112px;
    }
</style>