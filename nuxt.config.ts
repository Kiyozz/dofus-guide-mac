// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  prisma: {
    // Cette option fait en sorte que Prisma fonctionne uniquement côté serveur
    disableClientFetch: true
  },
  routeRules: {
    '/': { redirect: '/accueil' }
  },
  typescript: {
    shim: false
  },
  ssr: false
})
