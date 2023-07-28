<script setup>

    const props = defineProps({
        itemClasses: String,
        iconClasses: String,
        withFooter : {
            type: Boolean,
            default: true
        },
        title: String
    })

    const enter = ref({
        opacity: 0,
        display: 'none',
        
    })

</script>

<template>
    <div class="w-full rounded-[1.5rem] hotbar-item h-44 py-4 px-5 flex flex-col transition-all" :class="itemClasses" v-motion :focus="enter" >
        <div class="flex items-center w-full gap-2">
            <i class="text-[--secondary-text-color] text-md" :class="iconClasses"></i>
            <p class="text-[--secondary-text-color] text-md font-semibold"> {{  title  }}</p>
        </div>

        <slot name="content" />

        <div class="flex items-center justify-between w-full h-10" v-if="withFooter">
            <slot name="footer" />
        </div>
    </div>
</template>