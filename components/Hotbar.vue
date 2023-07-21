<script setup lang="ts">
    const { width: windowWidth, height: windowHeight } = useWindowSize()
</script>


<template>
    <div class="fixed bottom-0 w-full hotbar rounded-t-[2.5rem]" :style="{height: `${windowHeight / 2.5}px`}">
        <div class="flex items-center justify-center w-full h-6">
            <div class="edge" />
        </div>  

        <div class="flex justify-between w-full px-8 py-2">
            <button class="text-sm text-white">
                Hourly Forecast
            </button>
            <button class="text-sm text-white">
                Weekly Forecast
            </button>
        </div>

        <div class="flex w-full gap-5 px-1 pl-5 mt-4 overflow-scroll">
            <div v-for="(item, index) in 10" :key="index" class="w-1/5 shrink-0 min-h-[10rem] rounded-full weather-item">
                moz
            </div>
        </div>
    </div>
</template>

<style scoped>

.edge {
    @apply w-14 h-1 bg-white rounded-full shadow-sm
}

</style>