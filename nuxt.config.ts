// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@davestewart/nuxt-scrollbar'],
  css: ['~/assets/css/main.css'],
  srcDir: 'src/',
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
