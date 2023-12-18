<script setup lang="ts">

  import MouseFollower from "mouse-follower";
  const { $gsap: gsap } = useNuxtApp()

  
  onMounted(() => {
    
    const tl = gsap.timeline({repeat:-1, repeatDelay:0, yoyo: true})
    tl.fromTo('body', {background: 'linear-gradient(80deg, #330040 0%, #5d0076'}, {background: 'linear-gradient(360deg, #330040 0%, #5d0076', duration: 10})

  })

</script>

<template>
  <div id="app">
    <NuxtLayout>
      <ClientOnly>
        <NuxtPage></NuxtPage>
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>

<style>
#app {
  overscroll-behavior: none !important;
}

body{
  background: rgb(2,12,87);
  background: linear-gradient(80deg, rgba(2,12,87,1) 0%, rgba(37,4,52,1) 100%);
}
</style>
