<script setup lang="ts">

    import { useHomeService } from '~/composables/useHomeServices';

// props
    interface Props {
        data: any
    }

    const props = defineProps<Props>()

    const { data } = toRefs(props)

// state

    const { addSavedLocations, homeSavedLoctions, homeCurrentData } = useHomeService()

// computed

    const isSaved = computed(() => {
        if (data.value && data.value.id) {
            return homeSavedLoctions.value.some((location: any) => location.id === data.value.id);
        }
        return false; 
    })

// methods 

    const saveLocation = () => {
        addSavedLocations(data.value)
    }

</script>

<template>
    <div class="relative w-full search-items">
        <div class="search-item-bg">
            <div class="flex flex-col w-1/2 h-full gap-1.5 pt-1">
                <h1 class="text-[2rem] text-white text-clip line-clamp-1">{{ data.name }}</h1>
                <div class="flex items-center gap-2 pl-1.5 text-white">
                    <i class="fa-solid fa-minus text-[#ab25c9] pl-1"></i>
                    <h2 class="text-[1rem] line-clamp-1">{{ data.country }}</h2>
                </div>
                <div class="flex items-center gap-2 text-white">
                    <i class="fa-solid fa-minus text-[#ab25c9] pl-5" v-if="data.region"></i>
                    <h2 class="text-[.9rem] line-clamp-1">{{ data.region }}</h2>
                </div>
            </div>
        </div>
        <button @click.stop="isSaved ? $emit('remove', data.id) : saveLocation()" class="absolute flex flex-col items-center overflow-visible gap-y-2 right-3 -top-2">
            <p v-if="homeCurrentData.location.name == data.name" class="text-2xl text-white h-[100px] flex items-center rotate-[11.5deg] pb-6">
                (Current)
            </p>
            <lord-icon
                v-else
                src="https://cdn.lordicon.com/dfxesbyu.json"
                trigger="hover"
                colors="primary:#4be1ec,secondary:#cb5eee"
                state="hover-2"
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