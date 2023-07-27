<script setup lang="ts">

    import Slider from "vue3-slider"

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const toggleSlide = ref<boolean>(false)
    const touchStartPosition = ref<any>(null)
    const touchCurrentPosition = ref<any>(0)
    const nu = ref<any>(40)
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
                return `${windowHeight.value / 2 - 60}px`
            } else {
                return `8rem`
            }
        }
    })

    watch([hotbarHeightStyle, hotbarStatus], ([hotbarHeight, status]) => {
        const locationDegrees: HTMLDivElement | null = document.querySelector('.degree')!;
        const locationDetails: HTMLDivElement | null = document.querySelector('.hotbar-details')!;
        const hotbarElement: HTMLDivElement | null = hotbar.value;
        
        if (locationDegrees && locationDetails && hotbarElement) {
            const screenHeight: number = windowHeight.value;
            const halfScreenHeight: number = screenHeight / 2; // Half of the screen height
            const triggerPosition: number = halfScreenHeight; // The position where we start fading out
            const fadeOutHeight: number = screenHeight / 3; // The position at which fading out completes (approximately 1/3 of the screen height)
            const opacityRange: number = 1; // The range of opacity values (0 to 1)

            // Calculate the opacity based on the hotbarHeight relative to the trigger position
            let degreesOpacity = 1;
            let detailsOpacity = 0;

            if (hotbarHeight <= halfScreenHeight || status === 'middle') {
                degreesOpacity = 1;
                detailsOpacity = 0;
            } else if (hotbarHeight > halfScreenHeight && hotbarHeight <= fadeOutHeight) {
                degreesOpacity = 1 - (hotbarHeight - triggerPosition) / (fadeOutHeight - triggerPosition);
                detailsOpacity = 1 - degreesOpacity;
            } else if (hotbarHeight > fadeOutHeight || status === 'top') {
                degreesOpacity = 0;
                detailsOpacity = 1;
            }

            // Clamp the opacity values between 0 and 1
            degreesOpacity = Math.min(Math.max(degreesOpacity, 0), opacityRange);
            detailsOpacity = Math.min(Math.max(detailsOpacity, 0), opacityRange);

            // Apply the calculated opacity as a style property
            locationDegrees.style.opacity = degreesOpacity.toString();
            locationDetails.style.opacity = detailsOpacity.toString();
        }
    });


</script>


<template>
    <div class="fixed bottom-0 w-full hotbar rounded-t-[2.5rem] transition-all duration-200 ease-out" ref="hotbar" :style="{height: hotbarHeightStyle}">
        <div class="flex items-center justify-center w-full h-10"
            @touchstart.passive="toggleMove"
            @touchmove.passive="onTouchMove"
            @touchend.passive="onTouchEnd"
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

        <div class="flex w-full gap-5 px-5 py-4 mt-3 overflow-scroll">
            <div v-for="(item, index) in 10" :key="index" class="min-w-1/5 shrink-0 min-h-[10rem] rounded-full hotbar-item flex flex-col items-center justify-between px-3 py-5">
                <p class="text-white text-md">12 AM</p>
                <i class="text-white scale-150 fa-solid fa-cloud-showers-heavy"></i>
                <p class="text-white text-md">64°</p>
            </div>
        </div>

        <div class="grid w-full grid-cols-2 gap-5 px-5 py-2 overflow-scroll h-[28rem] pb-[20%] hotbar-details transition-all">

            <HotbarItem :icon-classes="`fa-solid fa-heart-pulse`" title="AIR QULITY" :item-classes="`col-span-full justify-between`" >
            
                <template #content>
                    <div class="flex flex-col gap-4 range-progress">
                        <p class="text-[--primary-text-color] text-xl font-semibold">3-Low Health Risk</p>
                        <Slider v-model="nu" />
                    </div>
                </template>


                <template #footer>
                    <p class="text-[--secondary-text-color] text-lg font-semibold">See more</p>
                    <i class="fa-solid fa-angle-right text-[--secondary-text-color] text-xl pt-1"></i>
                </template>
               
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-glasses`" title="UV INDEX">
                <template #content>
                    <div class="flex flex-col gap-4 pt-2 range-progress">
                        <div class="flex flex-col">
                            <p class="text-[--primary-text-color] text-2xl font-semibold">4</p>
                            <p class="text-[--primary-text-color] text-xl font-semibold">Moderate</p>
                        </div>
                        <Slider v-model="nu" color="#FB278D" track-color="#FEFEFE" />
                    </div>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-sun`" title="SUNRISE" :item-classes="`justify-between`">
                <template #content>
                    <div class="flex flex-col gap-4 pt-2">
                        <div class="flex flex-col">
                            <p class="text-[--primary-text-color] text-3xl font-semibold">5:32 AM</p>
                        </div>
                    </div>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">5:32 AM</p>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-wind`" title="WIND" :with-footer="false">
                <template #content>
                    <Compass :wind-speed="34" :wind-angle="10" />
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-cloud`" title="CLOUD" :item-classes="`justify-between`">
                <template #content>
                    <p class="text-[--primary-text-color] text-3xl font-semibold">75%</p>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">Wind dir: W</p>
                </template>
            </HotbarItem>
            
            <HotbarItem :icon-classes="`fa-solid fa-temperature-high`" title="FEELS LIKE" :item-classes="`justify-between`">
                <template #content>
                    <p class="text-[--primary-text-color] text-3xl font-semibold">19°</p>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">Based on actual temperature</p>
                </template>
            </HotbarItem>
            
            <HotbarItem :icon-classes="`fa-solid fa-temperature-low`" title="HUMIDITY" :item-classes="`justify-between`">
                <template #content>
                    <p class="text-[--primary-text-color] text-3xl font-semibold">47%</p>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">Based on actual temperature</p>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-eye`" title="VISIBILITY" :item-classes="`justify-between`">
                <template #content>
                    <div class="flex items-end gap-1 pb-5">
                        <p class="text-[--primary-text-color] text-[2rem] font-semibold">8</p>
                        <p class="text-[--primary-text-color] text-xl font-semibold">/kph</p>
                    </div>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">Based on actual temperature</p>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-gauge-high`" title="PRESSURE" :item-classes="`justify-between`" :with-footer="false">
                <template #content>
                    <div class="flex justify-center range-progress">
                        <Slider v-model="nu" orientation="circular" track-color="purple" width="100px" :tooltip="true" />
                    </div>
                </template>
            </HotbarItem>

        </div>
    </div>
</template>

<style scoped>

.hotbar {
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.hotbar-item {
    background: rgba(170, 37, 201, 0.2);
    box-shadow: 0 1px 10px 0 rgba(109, 31, 135, 1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8px);
    border: 2px solid rgba(255, 255, 255, .3);
}

.hotbar-buttons{
    background: rgba( 170, 37, 201, 0.1 );
    backdrop-filter: blur( 20px );
    -webkit-backdrop-filter: blur( 20px );
}

.hotbar-details {
  transition: opacity 0.3s ease-out; /* Adjust the duration and easing as needed */
  opacity: 1; /* Initially set the opacity to 1 */
}

.edge {
    @apply w-14 h-1 bg-white rounded-full shadow-sm
}

</style>