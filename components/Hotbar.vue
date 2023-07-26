<script setup lang="ts">
    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const toggleSlide = ref<boolean>(false)
    const touchStartPosition = ref<any>(windowHeight.value / 2)
    const touchCurrentPosition = ref<any>(0)
    const hotbarStatus = ref<string>('middle')
    const hotbar = ref<HTMLDivElement | null>(null)

    const toggleMove = (event: any) => {
        toggleSlide.value = !toggleSlide.value
        touchStartPosition.value = event.touches[0].clientY;
    }

    const onTouchMove = (event: any) => {
        
        if (touchStartPosition.value !== null) {
            touchCurrentPosition.value = windowHeight.value - event.touches[0].clientY;
            const touchDelta = touchCurrentPosition.value - touchStartPosition.value;
            if (touchCurrentPosition.value > windowHeight.value / 1.5) {
                hotbarStatus.value = 'top';
            } else if (touchCurrentPosition.value >= windowHeight.value / 1.5 - 150) {
                hotbarStatus.value = 'middle';
            } else {
                hotbarStatus.value = 'bottom';
            }

            // toggleSlide.value = touchDelta > 50; // Adjust this threshold as needed 
        }
    }

    const onTouchEnd = (event: any) => {
        toggleSlide.value = false
        touchStartPosition.value = null;
    }


    const hotbarHeightStyle = computed(() => {
        if (toggleSlide.value){
            return `${touchCurrentPosition.value}px`
        } else {
            if (hotbarStatus.value == 'top'){
                return `${windowHeight.value - 20}px`
            } else if (hotbarStatus.value == 'middle') {
                return `${windowHeight.value / 2}px`
            } else {
                return `8rem`
            }
        }
    })

    watch([hotbarHeightStyle, hotbarStatus], ([hotbarHeight, status]) => {
        const element: HTMLDivElement | null = document.querySelector('.degree');
        const hotbarElement: HTMLDivElement | null = hotbar.value;
        if (element && hotbarElement) {
            const screenHeight: number = windowHeight.value;
            const halfScreenHeight: number = screenHeight / 2; // Half of the screen height
            const triggerPosition: number = halfScreenHeight; // The position where we start fading out
            const fadeOutHeight: number = screenHeight / 3; // The position at which fading out completes (approximately 1/3 of the screen height)
            const opacityRange: number = 1; // The range of opacity values (0 to 1)

            // Calculate the opacity based on the hotbarHeight relative to the trigger position
            let opacity = 1;
            if (hotbarHeight <= halfScreenHeight || status === 'middle') {
            opacity = 1;
            } else if (hotbarHeight > halfScreenHeight && hotbarHeight <= fadeOutHeight) {
            opacity = 1 - (hotbarHeight - triggerPosition) / (fadeOutHeight - triggerPosition);
            } else if (hotbarHeight > fadeOutHeight || status === 'top') {
            opacity = 0;
            }

            opacity = Math.min(Math.max(opacity, 0), opacityRange); // Clamp the opacity between 0 and 1

            // Apply the calculated opacity as a style property
            element.style.opacity = opacity.toString();
        }
    });

</script>


<template>
    <div class="fixed bottom-0 w-full hotbar rounded-t-[2.5rem] transition-all duration-200 ease-out" ref="hotbar" :style="{height: hotbarHeightStyle}">
        <div class="flex items-center justify-center w-full h-10"
            @touchstart="toggleMove"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
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

        <div class="flex w-full gap-5 px-5 py-5 mt-3 overflow-scroll">
            <div v-for="(item, index) in 10" :key="index" class="min-w-1/5 shrink-0 min-h-[10rem] rounded-full hotbar-item flex flex-col items-center justify-between px-3 py-5">
                <p class="text-white text-md">12 AM</p>
                <i class="text-white scale-150 fa-solid fa-cloud-showers-heavy"></i>
                <p class="text-white text-md">64°</p>
            </div>
        </div>

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
        </div>  
    </div>
</template>

<style scoped>

.edge {
    @apply w-14 h-1 bg-white rounded-full shadow-sm
}

</style>