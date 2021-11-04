<template>
  <div class="login">
    <div class="main-info">
      <img class="login-logo" src="../assets/img/loginLogo.png" width="152" height="59" alt="诚联" />
      <div class="left-container"></div>
      <div class="right-container">
        <div class="title">诚联培训管理系统</div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {}
  },
  computed: {
    isRelogin() {
      return this.$route.query.rl
    },
  },
  methods: {},
}
</script>

<style lang="less">
@import '~@/assets/less/variables';

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: #ffe77b;

  .main-info {
    position: relative;
    display: flex;
    width: 1153px;
    height: 528px;
    background: url('../assets/img/left-login.png') center center;
    border-radius: 30px;
  }

  .left-container {
    width: 60%;
    height: 100%;
  }

  .login-logo {
    position: absolute;
    left: 31px;
    top: 27px;
  }

  .right-container {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 30px;
      color: @clr-primary;
      font-weight: bold;
      margin-bottom: 50px;
    }
  }
}
</style>
