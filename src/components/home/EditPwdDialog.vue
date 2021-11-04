<template>
  <el-dialog title="修改密码" width="50%" v-bind="$attrs" v-on="$listeners" @close="_close" :append-to-body="true">
    <el-form label-width="230px" ref="form" :model="formData" :rules="rules" class="input_width_">
      <el-form-item label="原密码" prop="originPwd">
        <el-input type="password" v-model="formData.originPwd" auto-complete="false"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="formData.newPwd" auto-complete="false"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPwd2">
        <el-input type="password" v-model="formData.newPwd2" auto-complete="false"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="_close">取 消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { changePassword } from '@/apis/login-apis'
// import { customerChangePwd } from '@/apis/settlement'
import { mapState } from 'vuex'

// 6-16位的数字、字母组成的字符串
const pwdPattern = /^(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

export default {
  name: 'EditPwdDialog',
  props: ['ifCustomerLogin'],
  data: function() {
    const pwd2Validator = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.formData.newPwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    const pwdPatternValidator = (rule, value, callback) => {
      if (!pwdPattern.test(value)) {
        callback(new Error('密码必须由6-20位的数字、大小写字母组成'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        originPwd: '',
        newPwd: '',
        newPwd2: '',
      },
      rules: {
        originPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: pwdPatternValidator, trigger: 'blur' },
        ],
        newPwd2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: pwdPatternValidator, trigger: 'blur' },
          { validator: pwd2Validator, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    // confirm() {
    //   this.$refs.form.validate(async valid => {
    //     if (valid) {
    //       let { originPwd, newPwd } = this.formData
    //       let params = {}
    //       let res
    //       if (this.ifCustomerLogin) {
    //         let customerUser = JSON.parse(sessionStorage.getItem('app_user'))
    //         params = {
    //           oldCustomerPwd: originPwd,
    //           newCustomerPwd: newPwd,
    //           settlementConfirmationId: customerUser.settlementConfirmationId,
    //         }
    //         // res = await customerChangePwd(params)
    //       } else {
    //         params = {
    //           oldPassword: originPwd,
    //           newPassword: newPwd,
    //           systemUserId: this.user.systemUserId,
    //         }
    //         res = await changePassword(params)
    //       }
    //       if (res?.code === 0) {
    //         this.$message.success('修改密码成功')
    //         this._close()
    //       }
    //     }
    //   })
    // },
    _close() {
      this.$emit('update:visible', false)
    },
  },
}
</script>
<style lang="less" scoped>
.input_width_ .el-input {
  width: 220px;
}
</style>
