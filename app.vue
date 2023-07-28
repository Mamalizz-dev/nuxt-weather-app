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
