const qs = require('query-string')
const resource = '/server_stat'
export default ($axios) => ({
  show() {
    return $axios.get(`${resource}`)
  },
})
