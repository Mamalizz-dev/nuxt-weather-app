<script setup lang="ts">

import { useHomeService } from '~/composables/useHomeServices';

// props
    interface Props {
        data: any
        isSaved: Boolean
    }

    const props = defineProps<Props>()

    const { data } = toRefs(props)

// state

    const icon = ref<any>(null)
    const { addSavedLocations, homeSavedLoctions } = useHomeService()

// computed

    const isSaved = computed(() => {
        console.log(homeSavedLoctions.value.includes(data.value));
        
        return !homeSavedLoctions.value.includes(data.value)
    })

// methods 

    const savedLocation = () => {
        addSavedLocations(data.value)
    }

</script>

<template>
    <div class="relative w-fullsearch-item">
        <div class="search-item-bg">
            <div class="flex flex-col w-1/2 h-full gap-1.5 pt-1">
                <h1 class="text-[2rem] text-white text-clip line-clamp-1">{{ data.name }}</h1>
                <div class="flex items-center gap-2 pl-1.5 text-white">
                    <i class="fa-solid fa-minus text-[#ab25c9] pl-1"></i>
                    <h2 class="text-[1rem] line-clamp-1">{{ data.country }}</h2>
                </div>
                <div class="flex items-center gap-2 text-white">
                    <i class="fa-solid fa-minus text-[#ab25c9] pl-5"></i>
                    <h2 class="text-[.9rem] line-clamp-1">{{ data.region }}</h2>
                </div>
            </div>
        </div>
        <button @click="savedLocation" class="absolute flex flex-col items-center overflow-visible gap-y-2 right-3 -top-2">
            <lord-icon
                ref="icon"
                src="https://cdn.lordicon.com/ibnprjhs.json"
                trigger="morph"
                colors="primary:#4be1ec,secondary:#cb5eee"
                style="width:100px;height:100px">
            </lord-icon>
            <button class="text-white py-1 px-5 rounded-[.6rem] bg-gradient-to-tr from-[#3659b1] to-[#e64497]">{{ isSaved ? 'Saved' : 'Save' }}</button>
        </button>
    </div>
</template>


<style>

.search-item-bg{
    clip-path: polygon(0 0%, 100% 40%, 100% 100%, 0% 100%);
    background: linear-gradient(234deg, rgba(137,78,160,1) 0%, rgba(89,41,103,1) 48%, rgba(45,18,56,1) 100%);
    @apply w-full rounded-xl min-h-[8rem] flex p-5 relative overflow-visible items-center
}

</style>