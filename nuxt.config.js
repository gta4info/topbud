export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TOPBUD store',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Лендинг для цветочного салона или онлайн-магазина цветов' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css', rel: 'stylesheet' }
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
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://31.186.250.216:56789/v1/front'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
    defaultAssets: {icons: 'mdi'}
  },

  server: {
    host: '0.0.0.0',
    port: '8800'
  },

  gtm: {
    id: 'GTM-NVKV4NH'
  },

  robots: [
    {
      UserAgent: 'DISCo Pump',
      Disallow: '/'
    },
    {
      UserAgent: 'Wget',
      Disallow: '/'
    },
    {
      UserAgent: 'WebZIP',
      Disallow: '/'
    },
    {
      UserAgent: 'Teleport Pro',
      Disallow: '/'
    },
    {
      UserAgent: 'WebSnake',
      Disallow: '/'
    },
    {
      UserAgent: 'Offline Explorer',
      Disallow: '/'
    },
    {
      UserAgent: 'Web-By-Mail',
      Disallow: '/'
    },
    {
      UserAgent: 'psbot',
      Disallow: '/'
    },
    {
      UserAgent: 'gigabot',
      Disallow: '/'
    },
    {
      UserAgent: 'Twiceler',
      Disallow: '/'
    },
    {
      UserAgent: 'NetinfoBot',
      Disallow: '/'
    },
    {
      UserAgent: 'ia_archiver',
      Disallow: '/'
    },
    {
      UserAgent: '*',
      Disallow: ['/search', '/admin']
    },
    {
      Allow: ['/.png', '/.jpg', '/.jpeg', '/.js', '/*.css'],
    }
  ]
}
