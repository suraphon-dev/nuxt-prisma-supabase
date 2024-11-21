// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/supabase'],

  supabase: {
    redirect: false,
    cookieOptions: {
      secure: false
    }
  },

  runtimeConfig: {
    githubToken: 'default_token',
    githubUsername: 'default_username',
    githubRepo: 'default_repo'
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
