import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  routeRules: {
    "/swr_no_ttl": { swr: true },
  },
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@pinia/nuxt"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
      ripple: true,
    },
    autoImport: true,
  },
  build: {
    transpile: ["sass-embedded", "gsap"],
  },
  nitro: {
    debug: true, // API 요청에 상세하게 나옴
    plugins: ["~/server/plugins/nitroPlugin.ts"],
    routeRules: {
      "/api/**": { cors: true, cache: { maxAge: 60 } },
    },
  },
  imports: {
    dirs: ["~/stores"],
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
});
