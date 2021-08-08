export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TOPBUD',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Лендинг для цветочного салона или онлайн-магазина цветов' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
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
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://31.186.250.216:56789/v1/front'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
    defaultAssets: {icons: 'mdi'}
  },

  target: 'static',
  ssr: false,

  server: {
    host: '0.0.0.0',
    port: '8800'
  },

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
