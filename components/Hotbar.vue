<script setup lang="ts">

// import

    import Slider from "vue3-slider"
    import { useHomeService } from '~/composables/useHomeServices'
    import { useAirQuality } from '~/composables/useAirQuality'
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();


// state

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const toggleSlide = ref<boolean>(false)
    const touchStartPosition = ref<any>(null)
    const touchCurrentPosition = ref<any>(0)
    const hotbar = ref<HTMLDivElement | null>(null)
    const hotbarPosition = ref<string>('middle')
    
    const { homeCurrentData, homeforecastData } = useHomeService()

// computed

    const hotbarHeightStyle = computed(() => {
        if (toggleSlide.value){
            return `${touchCurrentPosition.value}px`
        } else {
            if (hotbarPosition.value == 'top'){
                return `${windowHeight.value - 20}px`
            } else if (hotbarPosition.value == 'middle') {
                return `${windowHeight.value / 2 + 25}px`
            } else {
                return `8rem`
            }
        }
    })

    const airQualityPercent = computed(() => {
        //@ts-ignore
        return useAirQuality(homeCurrentData.value.current.air_quality)
    })

    const uvPercent = computed(() => {
        //@ts-ignore
        return (homeCurrentData.value.current.uv / 10) * 100
    })

    const pressurePercent = computed(() => {
        //@ts-ignore
        return homeCurrentData.value.current.pressure_in
    })
    

// methods

    const toggleMove = (event: any) => {
        toggleSlide.value = !toggleSlide.value
        touchStartPosition.value = event.touches[0].clientY;
    }

    const onTouchMove = (event: any) => {
        
        if (touchStartPosition.value !== null) {
            touchCurrentPosition.value = windowHeight.value - event.touches[0].clientY;
            const touchDelta = touchCurrentPosition.value - touchStartPosition.value;
            if (touchCurrentPosition.value > windowHeight.value / 1.5) {
                hotbarPosition.value = 'top';
            } else if (touchCurrentPosition.value >= windowHeight.value / 1.5 - 150) {
                hotbarPosition.value = 'middle';
            } else {
                hotbarPosition.value = 'bottom';
            }
        }
    }

    const onTouchEnd = (event: any) => {
        toggleSlide.value = false
        touchStartPosition.value = null;
    }
    
// watch

    watch([hotbarHeightStyle, hotbarPosition], ([hotbarHeight, status]) => {
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

        if (status === 'bottom') {
            gsap?.to(locationDegrees, { scale: 1.05, duration: 0.5 });
        } else {
            gsap?.to(locationDegrees, { scale: 1, duration: 0.5 });
        }
    });


// onMounted

    onMounted(() => {
        const timeline = gsap.timeline({defaults: {duration: 1}});
        timeline
            .fromTo('.degree', { opacity: 0, blur: 1, scale:.95 }, { opacity: 1, blur: 0, scale: 1 })
            .fromTo('.hotbar', { y: '100%' }, { y: '0%', ease: 'Bounce.easeOut'})
            .from('.hourly' , { opacity: 0, stagger: 0.1})
    })

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
            <button class="text-white text-md">
                Hourly Forecast
            </button>
            <!-- <button class="text-sm text-white">
                Weekly Forecast
            </button> -->
        </div>

        <div class="flex w-full gap-5 px-5 py-4 overflow-scroll">
            <div v-for="(hour, index) in homeforecastData.forecast.forecastday[0].hour" :key="`day-${index}`" class="w-[4.8rem] shrink-0 min-h-[10rem] rounded-full hotbar-item hourly flex flex-col items-center justify-between px-3 py-5">
                <p class="text-white text-md">{{ (hour.time).split(' ').pop() }}</p>
                <!-- <i class="text-white scale-150 fa-solid fa-cloud-showers-heavy"></i> -->
                <img :src="hour.condition.icon" class="w-full scale-150" :alt="hour.condition.text">
                <p class="text-white text-md">{{ hour.temp_c }}°</p>
            </div>
        </div>

        <div class="grid w-full grid-cols-2 gap-5 px-5 py-2 overflow-scroll h-[28rem] pb-[20%] hotbar-details opacity-0 transition-all">

            <HotbarItem :icon-classes="`fa-solid fa-heart-pulse`" title="AIR QULITY" :item-classes="`col-span-full justify-between`" >
            
                <template #content>
                    <div class="flex flex-col gap-4 range-progress">
                        <p class="text-[--primary-text-color] text-xl font-semibold">{{ airQualityPercent.text  }}</p>
                        <Slider v-model="airQualityPercent.percent" class="pointer-events-none" />
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
                            <p class="text-[--primary-text-color] text-2xl font-semibold"> {{ homeCurrentData.current.uv }} </p>
                            <p class="text-[--primary-text-color] text-xl font-semibold">Moderate</p>
                        </div>
                        <Slider v-model="uvPercent" color="#FB278D" track-color="#FEFEFE" class="pointer-events-none" />
                    </div>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-sun`" title="SUNRISE" :item-classes="`justify-between`">
                <template #content>
                    <div class="flex flex-col gap-4 pt-2">
                        <div class="flex flex-col">
                            <p class="text-[--primary-text-color] text-2xl font-semibold">{{ homeforecastData.forecast.forecastday[0].astro.sunrise }}</p>
                        </div>
                    </div>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">{{ homeforecastData.forecast.forecastday[0].astro.sunset }}</p>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-wind`" title="WIND" :with-footer="false">
                <template #content>
                    <Compass :wind-speed="homeCurrentData.current.wind_kph" :wind-angle="homeCurrentData.current.wind_degree" />
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-cloud`" title="CLOUD" :item-classes="`justify-between`">
                <template #content>
                    <p class="text-[--primary-text-color] text-3xl font-semibold"> {{ homeCurrentData.current.cloud }}%</p>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-md font-semibold">Wind dir: {{ homeCurrentData.current.wind_dir }}</p>
                </template>
            </HotbarItem>
            
            <HotbarItem :icon-classes="`fa-solid fa-temperature-high`" title="FEELS LIKE" :item-classes="`justify-between`">
                <template #content>
                    <p class="text-[--primary-text-color] text-3xl font-semibold">19°</p>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-sm font-semibold">Based on actual temperature</p>
                </template>
            </HotbarItem>
            
            <HotbarItem :icon-classes="`fa-solid fa-temperature-low`" title="HUMIDITY" :item-classes="`justify-between`">
                <template #content>
                    <p class="text-[--primary-text-color] text-3xl font-semibold">{{ homeCurrentData.current.feelslike_c }}%</p>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-sm font-semibold">Based on actual temperature</p>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-eye`" title="VISIBILITY" :item-classes="`justify-between`">
                <template #content>
                    <div class="flex items-end gap-1 pb-5">
                        <p class="text-[--primary-text-color] text-[2rem] font-semibold">{{ homeCurrentData.current.vis_km }}</p>
                        <p class="text-[--primary-text-color] text-xl font-semibold">/kph</p>
                    </div>
                </template>

                <template #footer>
                    <p class="text-[--primary-text-color] text-sm font-semibold">Based on actual temperature</p>
                </template>
            </HotbarItem>

            <HotbarItem :icon-classes="`fa-solid fa-gauge-high`" title="PRESSURE" :item-classes="`justify-between`" :with-footer="false">
                <template #content>
                    <div class="flex justify-center pointer-events-none range-progress">
                        <Slider v-model="pressurePercent" orientation="circular" track-color="purple" width="100px" :tooltip="true" />
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
    background: #aa25c933;
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
}

.edge {
    @apply w-14 h-1 bg-white rounded-full shadow-sm
}

</style>