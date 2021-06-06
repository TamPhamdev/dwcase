export const state = () => ({
  isVisibleStickyMenu: 0,
})

const getters = {
  getVisibleStickyMenu(state) {
    return state.isVisibleStickyMenu
  },
}
const actions = {
  setVisibleStickyMenu({ commit }, data) {
    commit('SET_VISIBLE_STICKY_MENU', data)
  },
}

const mutations = {
  SET_VISIBLE_STICKY_MENU(state, data) {
    state.isVisibleStickyMenu = data
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
