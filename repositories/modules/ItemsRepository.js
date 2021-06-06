import qs from 'query-string'
const resource = '/items'
export default ($axios) => ({
  getAllItems(params) {
    const stringify = qs.stringify(params)
    return $axios.get(`${resource}?${stringify}`)
  },

  getDetail(id) {
    return $axios.get(`${resource}/detail?id=${id}`)
  },

  accept(params) {
    const stringify = qs.stringify(params)
    return $axios.get(`${resource}/accept?${stringify}`)
  },

  sell(id) {
    return $axios.get(`${resource}/sell?id=${id}`)
  },

  sellMultiple(params) {
    const stringify = qs.stringify(params)
    return $axios.get(`${resource}/sell_mul?${stringify}`)
  },
  itemInCase(id) {
    return $axios.get(`${resource}/case_drop?itemId=${id}`)
  },
})
