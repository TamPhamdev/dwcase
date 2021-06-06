export const state = () => ({
  stats: null,
})
export const getters = {
  getStats(state) {
    return state.stats
  },
}
export const actions = {
  async getAllStats({ commit }) {
    try {
      const { data } = await this.$repositories.stats.show()
      commit('SET_STAT', data.data)
    } catch (error) {
      console.log('error :>> ', error)
    }
  },
}

export const mutations = {
  SET_STAT(state, data) {
    state.stats = data
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
