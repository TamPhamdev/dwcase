import Cookies from 'js-cookie'
export default function (context) {
  if (!context.store.getters['authen/isLoggedIn']) {
    context.redirect('/')
  }
}
