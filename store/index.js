import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// import the auto exporter
import modules from './modules'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export const state = () => ({
  APP_IMAGE: process.env.APP_IMAGE_URL,
  REDIRECT_URL: process.env.REDIRECT_URL,
  APP_VERSION: process.env.VERSION,
  API_WEB: process.env.API_WEB,
})

export const actions = {
  async nuxtServerInit ({ store, dispatch, commit, getters }, { req, $cookiz }) {
    const token = $cookiz.get('CSSESSIONID')
    const isLogin = getters['authen/isLoggedIn']

    if (token) {
      // await dispatch('authen/checkIsLoggedIn', true)
      // await dispatch('profile/getProfile')
    }

    // await dispatch('case/getAllCasesByCategory')
    // await dispatch('stat/getAllStats')
  },
}
const store = () => {
  return new Vuex.Store({
    state,
    actions,
    modules: {
      ...modules,
    },
    strict: debug,
    // plugins: [persistedstate],
  })
}
export default store
