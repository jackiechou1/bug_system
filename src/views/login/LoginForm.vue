<template>
  <el-form class="login-body" :model="ruleForm" @keydown.native.enter="submitForm" ref="ruleForm">
    <p class="input_label">账号</p>
    <el-form-item prop="userAccount">
      <el-input type="text" class="login-input" v-model="ruleForm.userAccount" placeholder="请输入账号"></el-input>
    </el-form-item>
    <p class="input_label">密码</p>
    <el-form-item prop="userPwd">
      <el-input type="password" class="login-input" v-model="ruleForm.userPwd" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-button type="primary" class="login-btn" size="large" @click="submitForm" :loading="logining">登录</el-button>
  </el-form>
</template>

<script>
import { login } from '@/apis/login-apis'
import { setSessionUser } from '@/utils/app-utils'
import { ROUTE_CREW_HOME } from '@/router/path'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      logining: false,
      ruleForm: {
        userAccount: '',
        userPwd: '',
      },
      rules: {
        userAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser',
    }),
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          return false
        } else {
          try {
            this.logining = true
            let res = await login(this.ruleForm)
            let user = res
            this.setUser(user)
            setSessionUser(user)
            this.$router.push({ path: ROUTE_CREW_HOME })
            window.sessionStorage.setItem('userName', JSON.stringify(user.userName))
          } finally {
            this.logining = false
          }
        }
      })
    },
  },
}
</script>

<style lang="less">
@import '~@/assets/less/variables.less';

@label-width: 50px;
@input-width: 240px;

.login-body {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .input_label {
    font-size: 16px;
    color: #333;
    margin-bottom: 12px;
  }

  .login-btn {
    width: @input-width;
    height: 50px;
    border-radius: 24px;
    margin-top: 50px;
    font-size: 20px;
  }

  .login-input.el-input {
    width: @input-width;
    border: none;
    background: #fff;
    border-bottom: 1px solid #dfdfdd;

    .el-input__inner {
      padding-left: 0;
      border: none;
      width: @input-width;
      input {
        color: #999;
      }
      &::placeholder {
        color: #999;
      }
    }
  }

  .login-input-pwd {
    margin-top: 10px;
  }
}
</style>
