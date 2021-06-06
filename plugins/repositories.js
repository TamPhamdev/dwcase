import createRepository from '@/repositories/Repository'

export default ({ store, $cookiz, $axios, redirect, app }, inject) => {
  $axios.onRequest((config) => {
    const token = $cookiz.get('CSSESSIONID')
    const profile = store.getters['profile/getterProfile']
    if (Object.keys(profile).length == 0) {
      store.commit('authen/CHECK_IS_LOGIN', false)
    }
    if (token && Object.keys(profile).length != 0) {
      store.commit('authen/CHECK_IS_LOGIN', true)
    }
  })
  $axios.onError((error) => {
    if (error.response.status == 404) {
      redirect('/404')
    }
    if (error.response.status == 403 || error.response.status == 401) {
      if (process.client) {
        redirect('/403')
      }
    }
  })
  inject('repositories', createRepository($axios))
}
