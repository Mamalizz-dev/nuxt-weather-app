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

    <client-only>
        <Hotbar />
    </client-only>
<!-- 
    <div class="fixed bottom-0 flex justify-between w-full h-20 px-10 hotbar-buttons rounded-t-xl">
        <div class="flex items-center justify-start w-1/3">
            <i class="text-white scale-125 fa-solid fa-location-dot"></i>
        </div>

        <div class="flex justify-center w-1/3">
            <div class="flex items-center justify-center w-32 h-32 pb-10 bg-white rounded-t-full shadow-md shadow-white">
                <i class="text-black scale-150 fa-solid fa-plus"></i>
            </div>
        </div>

        <div class="flex items-center justify-end w-1/3 h-full">
            <i class="text-white scale-125 fa-solid fa-ellipsis-vertical"></i>
        </div>
    </div>   -->
</template>


<style>
.degree {
  transition: opacity 0.3s ease-out; /* Adjust the duration and easing as needed */
  opacity: 1; /* Initially set the opacity to 1 */
}
</style>