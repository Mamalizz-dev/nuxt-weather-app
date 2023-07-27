// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      link: [{ rel:"stylesheet", type:"text/css", href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }]
    }
  },
  alias : {
    "@assets": "<rootDir>/assets"
  },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@vueuse/motion/nuxt'],
  build: {
    transpile: ['gsap'],
  },
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

  runtimeConfig: {
    BASE_URL: process.env.NUXT_API_BASE_URL,
    API_KEY : process.env.NUXT_API_KEY
  }
  
})
