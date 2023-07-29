<script setup lang="ts">

// import
import { useUserLocation } from '~/utils/useUserLocation'
import { useHomeService } from '~/composables/useHomeServices'
import { useCallApi } from '~/api/useCallApi'

// state

    document.documentElement.style.overflow = 'hidden'
    
    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();

    //@ts-ignore
    const { getCurrentDataFromApi, getForecastDataFromApi, currentLoading, forecastLoading, getSearchDataFromApi , searchLoading } = useCallApi()
    const { getUserLocation } = useUserLocation()
    const { homeCurrentData, homeforecastData, homeSearchData } = useHomeService()
    
    const searchModalIsShow = ref<boolean>(false)
    const searchQuery = ref<string>('')
    const debouncedearchQuery = refDebounced(searchQuery, 700)
    
    onMounted(() => {
        const timeline = gsap.timeline({defaults: {duration: 1}});

        // getUserLocation().then((cityName) => {
        //     getCurrentDataFromApi(cityName).then(() => {
        //         timeline.fromTo('.degree', { opacity: 0, blur: 1, scale:.95 }, { opacity: 1, blur: 0, scale: 1, duration: 1 })
        //     }).then(() => {
        //         getForecastDataFromApi(cityName).then(() => {
        //             timeline.fromTo('.hotbar', { y: '100%' }, { y: '0%', ease: 'Bounce.easeOut', duration: 1})
        //             timeline.from('.hourly' , { opacity: 0, stagger: 0.2,  duration: 1})
        //         })
        //     })
        // })
    })

// methods

    const openSearchModal = () => {
        searchModalIsShow.value = true
    }

// watch

    watch(debouncedearchQuery, (newValue) => {
        getSearchDataFromApi(newValue)
    })

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

    <div v-if="currentLoading" class="flex flex-col items-center absolute inset-0 top-[15%]">
        <Skeleton 
            
            v-for="(i, index) in 4"
            :key="index"
            :width="index == 0 ? `13rem` : index == 1 ? '5rem' : index == 2 ? '6.5rem' : index == 3 ? '10rem' : '10rem'" 
            :height="index == 0 ? `3rem` : index == 1 ? '5rem' : index == 2 ? '2rem' : index == 3 ? '2rem' : '2rem'" 
            :style="`border-radius: .5rem; margin: 10px 0px;`" 
        />
    </div>

    <div v-else class="flex flex-col items-center absolute w-full top-[15%] degree">

        <h1 class="text-[2.5rem] text-white items-center flex gap-2">
            <i class="text-[2rem] fa-solid fa-location-dot"></i>
            {{ homeCurrentData.location.name ?? 'Undefined' }}
            <p class="pt-4 text-sm">/ {{ homeCurrentData.location.region }}</p>
        </h1>
        <div class="w-1/2 h-[7rem] flex items-center justify-center">
            <img :src="(homeCurrentData.current.condition.icon).replace('64x64', '128x128')" class="w-[10rem] scale-125 h-[10rem] bg-cover" :alt="homeCurrentData.current.condition.text">
        </div>
        <p class="text-white text-[2.2rem] -mt-2">
            {{ homeCurrentData.current.condition.text }}
        </p>
        <div class="flex gap-x-5">  
            <p class="text-lg text-white">
                C: {{ homeCurrentData.current.temp_c ?? 0 }}°
            </p>
            <p class="text-lg text-white">
                F: {{ homeCurrentData.current.temp_c ?? 0 }}°F
            </p>
        </div>
    </div>
    
    <p class="absolute inset-0 flex justify-center text-sm text-white top-10 text-opacity-30"> 
        Last Update : {{ homeCurrentData.current.last_updated ?? `--:--:--` }}
    </p>


    <client-only>
        <div v-if="currentLoading || forecastLoading" class="w-full">
            <Skeleton 
                
                :width="`100%`" 
                :height="`8rem`" 
                :style="`border-radius: 1rem;border-top-left-radius: 2.5rem; border-top-right-radius: 2.5rem; position: fixed; bottom: 0px`" 
            />
        </div>
        <Hotbar v-else @openModal="openModal" />
    </client-only>

    <div class="fixed bottom-0 flex justify-between w-full h-20 px-10 bg-black hotbar-buttons rounded-t-xl">
        <div class="flex items-center justify-start w-1/3">
            <lord-icon
                src="https://cdn.lordicon.com/elzslyvl.json"
                trigger="hover"
                colors="primary:#4be1ec,secondary:#cb5eee"
                style="width:45px;height:45px;">
            </lord-icon>
        </div>

        <div class="flex justify-center w-1/3 pt-2.5">
            <div class="flex items-center justify-center transition-all rounded-t-full shadow-md pb-11 w-28 h-28 addbtn hover:scale-105">
                <i class="text-black scale-150 fa-solid fa-plus"></i>
            </div>
        </div>

        <div class="flex items-center justify-end w-1/3 h-full">
            <button @click="openSearchModal">    
                <lord-icon
                    src="https://cdn.lordicon.com/dfxesbyu.json"
                    trigger="hover"
                    colors="primary:#4be1ec,secondary:#cb5eee"
                    state="hover-2"
                    style="width:40px;height:40px">
                </lord-icon>
            </button>
        </div>
    </div>  

    <Modal v-if="searchModalIsShow" v-model="searchModalIsShow" >

        <div class="search-input">
            <div class="w-11/12">
                <input type="text" v-model="searchQuery" placeholder="Search Locations...">
            </div>
            <div class="w-1/12">
                <i class="fa-solid fa-magnifying-glass text-[#ab25c9]"></i>
            </div>
        </div>

        <div class="flex flex-col h-full gap-10 mt-3 overflow-scroll">
            <SearchResultItem v-for="(data, index) in homeSearchData" :key="`data-${index}`" :data="data" />
        </div>

    </Modal>
</template>


<style>
.degree {
  transition: opacity 0.3s ease-out; /* Adjust the duration and easing as needed */
  opacity: 1; /* Initially set the opacity to 1 */
}

.addbtn{
    background: linear-gradient(234deg, rgba(137,78,160,1) 0%, rgba(89,41,103,1) 68%, rgba(45,18,56,1) 100%);
    box-shadow: 1px -1px 20px 0px rgba(137,78,160,1)
}

.search-input {
    @apply flex gap-5 items-center border-2 border-[rgba(137,78,160,1)] focus:ring-2 focus:ring-offset-2 transition-all focus:ring-offset-[trasnparent] ring-[rgba(137,78,160,1)] bg-transparent w-full px-3 py-4 rounded-xl outline-none text-white text-[1rem] tracking-[1px]
}

.search-input input {
    @apply bg-transparent h-full w-full outline-none border-none
}
</style>