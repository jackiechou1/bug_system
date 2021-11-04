<template>
  <router-view></router-view>
</template>

<script>
// import { getSessionUser } from '@/utils/app-utils'
// import { mapMutations } from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    // 页面入口，获取session中的用户，存入vuex
    // let user = getSessionUser()
    // this.setUser(user)
    // let app = JSON.parse(sessionStorage.getItem('app'))
    // this.setApp(app)
  },
  methods: {
    // ...mapMutations({
    //   setUser: 'setUser',
    //   setApp: 'setApp',
    // }),
  },
}
</script>
