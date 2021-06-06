export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
}) {
  const defaultLocale = app.i18n.fallbackLocale
  if (isHMR) return
  const locale = store.state.languages.locale || defaultLocale
  if (store.state.languages.locale.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  store.commit('languages/SET_LANG', locale)
  app.i18n.locale = store.state.languages.locale
}
