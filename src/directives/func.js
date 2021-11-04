import Vue from 'vue'
import store from '@/store/index'
import { eqAsString } from '@/utils/utils'

export function hasFunc(val) {
  let { systemAuthFuncS = [] } = store.state.user
  let find = systemAuthFuncS.find(item => eqAsString(item, val))
  return find != null
}

Vue.directive('func', {
  //  指令的定义
  inserted(el, binding) {
    if (!hasFunc(binding.value) && el) {
      let parentNode = el.parentNode
      parentNode && parentNode.removeChild(el)
    }
  },
  componentUpdated(el, binding) {
    if (!hasFunc(binding.value) && el) {
      let parentNode = el.parentNode
      parentNode && parentNode.removeChild(el)
    }
  },
})
