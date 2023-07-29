<script setup lang="ts">

// import
    document.documentElement.style.overflow = 'hidden'
    import { useUserLocation } from '~/utils/useUserLocation'
    import { useHomeService } from '~/composables/useHomeServices'

// state

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const { getUserLocation } = useUserLocation()
    const { homeCurrentData, setHomeCurrentData, homeforecastData, setHomeForecastData, homeSearchData, setHomeSearchData } = useHomeService()
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();
    const searchModalIsShow = ref<boolean>(false)
    const searchQuery = ref<string>('')
    
    onMounted(() => {
        getUserLocation().then(async (cityName) => {

            // const { data : currentData , pending: currentPending } = await useLazyFetch<any>(`http://api.weatherapi.com/v1/current.json?key=2b9d02bcfdf14c5d84a53749230201&q=shiraz&aqi=no`)
            // if(!!currentData.value){
            //     setHomeCurrentData(currentData.value)
            // }
            
        })
    })

// methods

    const openSearchModal = () => {
        searchModalIsShow.value = true
    }


    // const { data : forecastData , pending: forecastPending } = await useLazyFetch<any>('/api/forecast?location=shiraz')
    // if(!!forecastData.value){
    //     setHomeForecastData(forecastData.value)
    // }

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

        <!-- <Skeleton 
            v-for=""

            :width="`13rem`" 
            :height="`4rem`" 
            :style="`border-radius: 1rem`" 
        /> -->

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
        <Hotbar @openModal="openModal" />
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