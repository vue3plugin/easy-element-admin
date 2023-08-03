<template>
    <div class="loading-wrapper" v-if="loading">
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
        border-color: thVar.$th-primary-1 thVar.$th-primary-1 thVar.$th-primary thVar.$th-primary ;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        transform: rotate(40deg);
        -webkit-animation: loader 1.2s linear infinite;
        animation: loader 1.2s linear infinite;
    }
}

</style>