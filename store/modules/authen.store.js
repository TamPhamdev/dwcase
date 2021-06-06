import Cookies from 'js-cookie'
export const state = () => ({
  token: null,
  isLoggedIn: false,
})

const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
}
const actions = {
  async checkIsLoggedIn({ commit }, data) {
    commit('CHECK_IS_LOGIN', data)
    try {
    } catch (error) {
      console.log('error :>> ', error)
    }
  },
}

const mutations = {
  CHECK_IS_LOGIN(state, data) {
    state.isLoggedIn = data
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
