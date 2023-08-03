<template>
    <div class="loading-wrapper">
        <div class="chrysanthemum box-border flex items-center justify-center absolute top-0 left-0 bottom-0 right-0" v-if="loading">
            <div class="loader">
                <span class="arrowhead"></span>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    loading: {
        default: false,
        type: Boolean
    }
})
</script>
<style lang="scss" scoped>
.loading-wrapper {
    position: relative;
    width: fit-content;
}
@keyframes loader {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
.chrysanthemum {
    z-index: 1000;

    .loader {
        z-index: 1000;
        width: 48px;
        height: 48px;
        border: 3px solid;
        border-color: transparent thVar.$th-primary transparent thVar.$th-primary ;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        transform: rotate(360deg);
        -webkit-animation: loader 1.2s linear infinite;
        animation: loader 1.2s linear infinite;
        
    }
    .loader:after {
        content: "";
        position: absolute;
        left: 20px;
        top: 31px;
        border: 10px solid transparent;
        border-right-color: thVar.$th-primary;
        transform: rotate(-40deg);
    }
    .arrowhead{
        content: "";
        position: absolute;
        left: 4px;
        top: -10px;
        border: 10px solid transparent;
        border-left-color: thVar.$th-primary;
        transform: rotate(-40deg);
    }
}

</style>