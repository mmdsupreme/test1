<template>
    <div class="place-item__controls">
        <span class="place-item__control-edit" @click.stop="openEditPage"><a></a></span>
        <span class="place-item__control-delete" @click.stop="$refs.modal.showModal()"><a></a></span>
        <place-delete :placeId="placeId" ref="modal"></place-delete>
    </div>
</template>

<script>
    import PlaceDelete from './PlaceDelete.vue';

    export default {
        components: {
           PlaceDelete
        },
        props: {
            placeId: {
                type: Number
            }
        },
        methods: {
            openEditPage() {
                this.$router.push({ name: 'place-edit', params: { id: this.placeId }});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .place-item__controls {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .place-item__control-edit a {
        display: block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/icon-edit.png');
        background-size: 100%;
    }

    .place-item__control-delete a {
        display: block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/icon-delete.png');
        background-size: 100%;
    }
</style>