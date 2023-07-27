<script setup lang="ts">

    const props = defineProps({
        windSpeed: Number,
        windAngle: {
            type: Number,
            default: 0
        }
    })

    const compassAngle = computed(() => {
        return `transform: rotate(${props.windAngle}deg)`
    })

</script>


<template>
    <div class="relative w-full h-full pt-1.5">
        <div 
            :style="compassAngle"
            class="w-[5rem] h-[5rem] bg-transparent top-[16%] border-[.1rem] border-white border-dashed relative rounded-full mx-auto"
        >
            <div class="absolute inset-x-0 -top-6">
                <div class="flex flex-col items-center">
                    <p class="text-sm text-white">N</p>
                </div>
            </div>
            <div class="absolute top-[50%] -translate-y-1/2 -right-4">
                <div class="flex items-center">
                    <p class="text-sm text-white">E</p>
                </div>
            </div>
            <div class="absolute inset-x-0 -bottom-6">
                <div class="flex flex-col items-center">
                    <p class="text-sm text-white">S</p>
                </div>
            </div>
            <div class="absolute top-[50%] -translate-y-1/2 -left-5">
                <div class="flex items-center">
                    <p class="text-sm text-white">W</p>
                </div>
            </div>
        </div>
        <div class="absolute inset-x-0 flex flex-col items-center justify-center -translate-y-1/2 top-1/2 pt-1.5">
            <p class="text-[--primary-text-color] text-xl">
                {{ windSpeed }}
            </p>
            <p class="text-[--primary-text-color] text-sm">Kph</p>
        </div>
    </div>
</template>