import fs from 'fs'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' },
      { hid: 'description', name: 'description', content: 'TOPBUD store offer to you weeds in Toronto ✔ Best prices ✔ Weed delivery' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#21AA5B' },
      { name: 'msapplication-navbutton-color', content: '#21AA5B' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#21AA5B' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect' },
      { href: 'https://fonts.googleapis.com/css2?family=Courgette&family=Montserrat:wght@500;700&family=Roboto:wght@400;500;900&display=swap', rel: 'stylesheet' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://topbudstore.com:8443/v1/front'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
    defaultAssets: {icons: 'mdi'}
  },

  server: {
    host: '0.0.0.0',
    port: '80',
  },

  gtm: {
    id: 'GTM-NVKV4NH'
  },
}
