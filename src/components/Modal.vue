<template>
    <div class="modal-background">
        <div class="modal">
            <div class="modal-header">
                <div class="modal-container">
                    <div>
                        <slot name="header">
                        </slot>
                    </div>
                    <button class="btn-close" @click.stop="close">&#x274c;</button>
                </div>
            </div>

            <div class="modal-body">
                <div class="modal-container">
                    <slot name="body">
                    </slot>
                </div>
            </div>

            <div class="modal-footer">
                <div class="modal-container">
                    <slot name="footer">
                    </slot>
                    <button v-show="showCancelButton" class="btn btn-cancel" @click.stop="close">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showCancelButton: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    .modal-background {
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
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
        width: 464px;
        background: #fff;
        box-shadow: none;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
    }

    .modal-footer {
        padding: 0 32px 32px 32px;
    }
    .modal-header {
        padding: 15px;
        color: #333333;
        justify-content: space-between;
        align-items: baseline;
        font-family: 'Roboto Slab', serif;
        font-size: 22px;
        font-weight: bold;
    }

    .modal-body {
        padding: 0 0 20px 0;
    }

    .btn-close {
        border: none;
        padding: 5px 10px 5px 10px;
        cursor: pointer;
        color: #BDBDBD;
        background: transparent;
    }

    .btn {
        width: 192px;
        height: 40px;
        color: white;
        border: none;
        padding: 8px 16px 8px 16px;
        cursor: pointer;
    }

    .btn-accept {
        background: #0073E6;
    }

    .btn-cancel {
        background: #989898;
    }
</style>