const state = () => ({
  profile: {},
})

export const mutations = {
  SET_PROFILE(state, data) {
    state.profile = data
  },
  SET_WALLET(state, data) {
    state.profile = { ...state.profile, wallet: data }
  },
}

export const actions = {
  async getProfile({ commit }) {
    try {
      const { data } = await this.$repositories.profile.show()
      commit('SET_PROFILE', data.data)
    } catch (error) {
      this.dispatch('authen/checkIsLoggedIn', false)
      // console.log('this.$store :>> ')
      return error
    }
  },

  async setBalance({ commit }, data) {
    await commit('SET_WALLET', data)
  },
}

const getters = {
  getterProfile(state) {
    return JSON.parse(JSON.stringify(state.profile))
  },
  getWallet(state) {
    return state.profile?.wallet
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
