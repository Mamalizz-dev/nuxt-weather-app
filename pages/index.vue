<script setup lang="ts">
    document.documentElement.style.overflow = 'hidden'

    import { useUserLocation } from '~~/composibles/useUserLocation'

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    

</script>

<template>
    <div class="relative flex w-full h-full">
        <div 
            class="absolute inset-0 w-full h-full"
            :style="{width: `${windowWidth}px`, height: `${windowHeight}px`}"
        >
            <img src="~~/assets/images/background.jpg" alt="BACKGROUND" class="w-full h-full bg-cover">
        </div>
    </div>

    <div class="flex flex-col items-center absolute inset-0 top-[15%] degree">
        <h1 class="text-[2rem] text-white">
            <i class="fa-solid fa-location-dot"></i>
            Shiraz
        </h1>
        <h2 class="text-[5rem] text-white pl-6">
            64°
        </h2>
        <div class="flex gap-x-5">  
            <p class="text-sm text-white">
                H:34deg
            </p>
            <p class="text-sm text-white">
                L:34deg
            </p>
        </div>
    </div>

    <Hotbar />
</template>


<style>
.degree {
  transition: opacity 0.3s ease-out; /* Adjust the duration and easing as needed */
  opacity: 1; /* Initially set the opacity to 1 */
}
</style>