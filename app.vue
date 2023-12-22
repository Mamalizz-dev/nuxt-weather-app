<script setup lang="ts">

  import MouseFollower from "mouse-follower";
  const { $gsap: gsap } = useNuxtApp()

  
  onMounted(() => {
    
    const tl = gsap.timeline({repeat:-1, repeatDelay:0, yoyo: true})
    tl.fromTo('body', {background: 'linear-gradient(0deg, #330040 0%, #5d0076'}, {background: 'linear-gradient(360deg, #301934 0%, #330040', duration: 10, ease:'power3.outIn'})

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
</style>
