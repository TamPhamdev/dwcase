import qs from 'query-string'
const resource = '/cases'
export default ($axios) => ({
  all() {
    return $axios.get(`${resource}`)
  },

  show(id) {

    return $axios.get(``)
  },

  create(payload) {
    return $axios.post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.delete(`${resource}/${id}`)
  },
  open(params) {
    const stringify = qs.stringify(params)
    return $axios.get(`${resource}/open?${stringify}`)
  },

  category(params) {
    const stringify = qs.stringify(params)
    return $axios.get(`${resource}/category?${stringify}`)
  },
})
