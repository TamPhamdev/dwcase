export const state = () => ({
  locales: ['en', 'vi'],
  locale: 'en',
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
}

export const actions = {
  setLanguage({ commit }, data) {
    commit('SET_LANG', data)
  },
}

const getters = {
  getLanguage(state) {
    return state.locale
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
