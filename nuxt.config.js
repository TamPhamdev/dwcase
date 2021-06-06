require('dotenv').config()
export default {
  ssr: true,
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  server: {
    port: 3001,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Clone Case',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  /*
   ** Active link class for the router
   */
  router: {
    linkExactActiveClass: 'exact-active-link',
    middleware: ['i18n'],
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/index.scss', 'element-ui/lib/theme-chalk/index.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/repositories',
    '@/plugins/clickoutside.client.js',
    { src: '@/plugins/persistedState.js' },
    '@/plugins/toast.client.js',
    '@/plugins/parallax.js',
    '@/plugins/i18n.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
  ],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  svgSprite: {},

  axios: {
    proxyHeaders: false,
    credentials: false,
    baseURL: process.env.API_URL,
  },

  build: {
    sass: {},
    extractCSS: true,
    transpile: [/^element-ui/],
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src',
        },
      },
    },

    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },
  serverMiddleware: ['~/serverMiddleware/serverMiddleware'],
}
console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)
