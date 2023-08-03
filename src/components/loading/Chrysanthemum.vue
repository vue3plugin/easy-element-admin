<template>
    <div class="loading-wrapper">
        <div class="chrysanthemum box-border flex items-center justify-center absolute top-0 left-0 bottom-0 right-0" v-if="loading">
            <span class="chrysanthemum loading block" v-for="i in 12"
                :style="{ transform: `rotate(${i * 30}deg) translate(0, -18px)`, animationDelay: `0.${i}s` }"></span>
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
<style lang="scss">
@keyframes loading {
    from {
        opacity: 1;
    }

    to {
        opacity: 0.25;
    }
}

.loading-wrapper {
    position: relative;
    width: fit-content;
}
.chrysanthemum {
    z-index: 1000;

    .loading {
        position: absolute;
        height: 15px;
        width: 5px;
        background-color: thVar.$th-primary;
        border-radius: 5px;
        animation: loading 1.2s linear infinite;
    }
}
</style>