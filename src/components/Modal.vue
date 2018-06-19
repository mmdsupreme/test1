<template>
    <div class="modal-background">
        <div class="modal">
            <div class="modal-header">
                <div>
                    <slot name="header">
                    </slot>
                </div>
                <button class="btn-close" @click.stop="close">&#x274c;</button>
            </div>
            <div class="modal-body">
                <slot name="body">
                </slot>
            </div>
            <div class="modal-footer">
                <slot name="footer">
                </slot>
                <button class="btn btn-cancel" @click.stop="close">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-background {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #fff;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
    }

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .modal-header {
        background: #4296EA;
        border-bottom: 1px solid #eeeeee;
        color: #fff;
        justify-content: space-between;
        align-items: baseline;
        font-family: 'Roboto Slab', serif;
        font-size: 18px;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
        justify-content: space-evenly;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
    }

    .btn-close {
        border: none;
        padding: 5px 10px 5px 10px;
        cursor: pointer;
        font-weight: bold;
        color: #fff;
        background: transparent;
    }

    .btn {
        color: white;
        border: none;
        padding: 10px 20px 10px 20px;
        cursor: pointer;
    }

    .btn-accept {
        background: #0073E6;
    }

    .btn-cancel {
        background: #989898;
    }
</style>