const qs = require('query-string')
const resource = '/profile'
export default ($axios) => ({
  show() {
    return $axios.get(`${resource}`)
  },

  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },
  saveURL(payload) {
    return $axios.get(`${resource}/trade_url?url=${payload}`)
  },
  getHistories(payload) {
    const stringify = qs.stringify(payload)
    return $axios.get(`${resource}/purchase_history?${stringify}`)
  },
})
