export default function (req, res, next) {
  // console.log('test middleware :>> ')
  // Config path to SPA here
  // const paths = ['/profile']
  // const regex = /^\/([^?\/]+)/
  // const matched = req.originalUrl.match(regex)
  // if (paths.includes(matched && matched[0])) {
  //   // Will trigger the "traditional SPA mode"
  //   res.spa = true
  //   console.log('vo SPA na :>> ')
  // }
  // Don't forget to call next in all cases!
  next()
}
