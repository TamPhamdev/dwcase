import Vue from 'vue'
import { Notification } from 'element-ui'
export default (inject) => {
  const toast = (type, message) => {
    return Notification[type](message, {
      message,
      offset: 100,
    })
  }
  inject('toast', toast)
}
