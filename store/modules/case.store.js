export const state = () => ({
  cases: [],
})
export const getters = {
  getCases(state) {
    return state.cases
  },
}
export const actions = {
  async getAllCases({ commit }) {
    try {
      const { data } = await this.$repositories.cases.all()
      commit('SET_CASE', data.data.content)
    } catch (error) {
      console.log('error :>> ', error)
    }
  },
  async getAllCasesByCategory({ commit }) {
    try {
      const { data } = await this.$repositories.cases.category({
        include_box: true,
      })
      commit('SET_CASE', data.data)
    } catch (error) {
      console.log('error :>> ', error)
    }
  },
}

export const mutations = {
  SET_CASE(state, data) {
    state.cases = data
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
