import Vue from 'vue'
import { Notification } from 'element-ui'
export default ({ app }, inject) => {
  const toast = (type, message) => {
    return Notification[type]({
      title: type.toUpperCase(),
      message,
      offset: 70,
    })
  }
  inject('toast', toast)
}
