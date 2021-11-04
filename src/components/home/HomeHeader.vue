<template>
  <div class="home-header">
    <div class="header-left">
      <div class="logo-text">
        <img src="../../assets/img/logtitle.png" class="logo" alt="诚联" width="95" height="50" />
      </div>
      <h3 class="left-text">Bug系统</h3>
    </div>
    <div class="header-right">
      当前业务：
      <el-link type="primary" @click="gotoSelectApp">{{ userName }}</el-link>
      <span class="user">你好，{{ userName }}</span>
      <em class="el-icon-switch-button" @click="logout" title="注销"></em>
    </div>
    <!-- <edit-pwd-dialog v-if="editPwdDialogVisible" :visible.sync="editPwdDialogVisible" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { logoutLocal } from '@/utils/app-utils'
// import { ROUTE_LOGIN, ROUTE_SELECT_APP, ROUTE_WORKBENCH } from '@/router/path'
// import EditPwdDialog from '@/components/home/EditPwdDialog'

export default {
  name: 'HomeHeader',
  // components: { EditPwdDialog },
  data() {
    return {
      // editPwdDialogVisible: false,
      userName: null,
    }
  },
  created() {
    this.userName = JSON.parse(window.sessionStorage.getItem('userName'))
  },
  computed: {
    ...mapState({
      user: state => state.user,
      app: state => state.app,
    }),
  },
  methods: {
    /**
     * 注销
     */
    logout() {
      logoutLocal()
      this.$router.push({ path: '/' })
    },

    /**
     * 跳转到工作台
     */
    gotoWorkbench() {
      this.$router.push({ path: '/' })
    },
    gotoSelectApp() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variables';

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: #282828;
  // background-color: #ffc300;
  color: #fff;
  font-size: 14px;
}

.header-left {
  display: flex;
  align-items: center;
  margin-left: 32px;

  .logo {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .logo-text {
    font-size: 20px;
    margin-left: 10px;
  }

  .left-text {
    margin-left: 10px;
    // margin-top: 10px;
  }

  .left-nav {
    margin-left: 21px;
    margin-top: 10px;
    cursor: pointer;

    .icon-workbench {
      margin-right: 10px;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  margin-right: 24px;

  .user {
    margin-right: 24px;
    margin-left: 24px;
  }

  .el-icon-switch-button {
    margin-left: 20px;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
