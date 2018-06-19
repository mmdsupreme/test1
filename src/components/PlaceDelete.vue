<template>
    <modal :showCancelButton="true" v-show="isModalVisible" @close="closeModal">
        <template slot="header">
            Удаление места
        </template>

        <template slot="body">
            Вы действительно хотите удалить место?
        </template>

        <template slot="footer">
            <button class="btn btn-accept" @click.stop="deletePlace">Удалить</button>
        </template>
    </modal>
</template>

<script>
    import Modal from './Modal.vue';

    export default {
        components: {
            Modal
        },
        props: {
            placeId: null
        },
        data() {
            return {
                isModalVisible: false
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            deletePlace() {
                this.$store.dispatch('deletePlaceById', this.placeId);
                this.closeModal();
            }
        }
    }
</script>