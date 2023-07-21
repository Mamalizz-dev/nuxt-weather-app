// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  //@ts-ignore
  piniaPersistedstate: {
    storage: 'sessionStorage'
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/style.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
})
