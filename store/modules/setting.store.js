export const state = () => ({
  isOpenedSidebar: false,
  isEnabledSound: true,
  currentPath: '',
})
export const getters = {
  isOpened(state) {
    return state.isOpenedSidebar
  },
  getCurrentPath(state) {
    return state.currentPath
  },
  isEnabledSound(state) {
    return state.isEnabledSound
  },
}
export const actions = {
  async toggleSidebar({ commit }, data) {
    commit('SET_TOGGLE_SIDEBAR')
  },
  async setCurrentPath({ commit }, data) {
    commit('SET_CURRENT_PATH', data)
  },
  async toggleSound({ commit }, data) {
    commit('TOGGLE_SOUND', data)
  },
}

export const mutations = {
  async SET_TOGGLE_SIDEBAR(state, data) {
    state.isOpenedSidebar = !state.isOpenedSidebar
  },
  SET_CURRENT_PATH(state, data) {
    state.currentPath = data
  },
  TOGGLE_SOUND(state, data) {
    state.isEnabledSound = !state.isEnabledSound
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
