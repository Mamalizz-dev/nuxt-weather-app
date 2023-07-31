<script setup lang="ts">

// imports

    import { Skeletor as Skeleton } from 'vue-skeletor'

// props

    interface Props {
        height: string | number | undefined
        width: string | number | undefined
        style: string
    }

    const props = defineProps<Props>()

    const { width, height, style } = toRefs(props)

</script>

<template>
    <Skeleton 
        :height="`${height}`" 
        :width="`${width}`" 
        :style="`${style}`" 
    />
</template>