<script setup lang="ts">

    interface Props {
        data: any
    }

    const props = defineProps<Props>()

    const { data } = toRefs(props)

</script>

<template>
    <div class="relative w-fullsearch-item">
        <div class="search-item-bg">
            <div class="flex flex-col w-1/2 h-full gap-1.5 pt-1">
                <h1 class="text-[2rem] text-white text-clip">{{ data.name }}</h1>
                <div class="flex items-center gap-2 pl-1.5 text-white">
                    <p class="text-[.9rem] text-[#ab25c9]"> -- </p>
                    <h2 class="text-[1rem] line-clamp-1">{{ data.country }}</h2>
                </div>
                <div class="flex items-center gap-2 text-white">
                    <p class="text-[.9rem] text-[#ab25c9] pl-2.5 whitespace-pre"> -- </p>
                    <h2 class="text-[.9rem] line-clamp-1">{{ data.region }}</h2>
                </div>
            </div>
        </div>
        <div class="absolute overflow-visible right-3 top-5">
            <lord-icon
                src="https://cdn.lordicon.com/dfxesbyu.json"
                trigger="hover"
                colors="primary:#4be1ec,secondary:#cb5eee"
                state="hover-2"
                style="width:120px;height:120px">
            </lord-icon>
        </div>
    </div>
</template>


<style>

.search-item-bg{
    clip-path: polygon(0 0%, 100% 40%, 100% 100%, 0% 100%);
    background: linear-gradient(234deg, rgba(137,78,160,1) 0%, rgba(89,41,103,1) 48%, rgba(45,18,56,1) 100%);
    @apply w-full rounded-xl min-h-[8rem] flex p-5 relative overflow-visible items-center
}

</style>