// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    githubToken: 'default_token',
    githubUsername: 'default_username',
    githubRepo: 'default_repo'
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
