import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 登录账号
    user: null,
    app: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setApp(state, payload) {
      state.app = payload
    },
  },
  actions: {},
})
export default store
