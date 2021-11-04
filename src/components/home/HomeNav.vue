<template>
  <el-menu
    class="home-nav"
    background-color="rgba(54, 54, 54, 0.1)"
    :defaultActive="active"
    text-color="#fff"
    active-text-color="#ffc300"
    router
    unique-opened
  >
    <div style="position: relative; z-index: 1" v-for="route in navListWithDot" :key="route.title">
      <!--包含多级菜单-->
      <el-submenu v-if="route.children && route.children.length > 0" :index="route.title" :key="route.title">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <el-badge :is-dot="route.hasTodo" class="nav-badge">
            <span class="nav-title">{{ route.title }}</span>
          </el-badge>
        </template>
        <el-menu-item
          v-for="subRoute in route.children"
          :key="subRoute.path"
          :index="subRoute.path"
          class="home-nav-sub"
        >
          <el-badge :is-dot="subRoute.hasTodo" class="nav-badge">
            <span class="nav-sub-title">{{ subRoute.title }}</span>
          </el-badge>
        </el-menu-item>
      </el-submenu>
      <!--只有一级菜单-->
      <el-menu-item v-else :index="route.path" :key="route.path">
        <i class="iconfont" :class="`icon-${route.icon}`"></i>
        <el-badge :is-dot="route.hasTodo" class="nav-badge">
          <span class="nav-title_">{{ route.title }}</span>
        </el-badge>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import workbenchFirst from '../../assets/img/workbench-first.png'
import { ROUTE_CREW_HOME, ROUTE_BUG_HOME, ROUTE_STATISTICS_HOME } from '@/router/path'

export default {
  name: 'HomeNav',
  data() {
    return {
      workbenchFirst: workbenchFirst,
      active: '',
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      todo: state => state.todo,
    }),
    navigationList() {
      let list = [
        {
          path: ROUTE_CREW_HOME,
          title: '人员管理',
          icon: 'customer',
        },
        {
          path: ROUTE_BUG_HOME,
          title: 'bug管理',
          icon: 'bug',
        },
        {
          path: ROUTE_STATISTICS_HOME,
          title: '统计',
          icon: 'tongji',
        },
      ]
      // 检测登录人是否有权限
      // this._checkAuth(list)
      return list
    },
    navListWithDot() {
      return this._checkTodo(this.navigationList)
    },
  },
  async created() {
    this.changeActiveNav()
  },
  destroyed() {},
  watch: {
    $route: function() {
      this.changeActiveNav()
    },
  },
  methods: {
    /**
     * 跳转到工作台
     */
    gotoWorkbench() {
      // this.$router.push({ path: ROUTE_WORKBENCH })
    },
    changeActiveNav() {
      // this.active = this.$route.path
      // if (
      //   Object.prototype.hasOwnProperty.call(this.$route.meta, 'upMenu') &&
      //   !Object.prototype.hasOwnProperty.call(this.$route.meta, 'isMenu')
      // ) {
      //   let upMenu = this.$route.meta.upMenu
      //   for (let i = 0; i < upMenu.length; i++) {
      //     if (upMenu[i].path) {
      //       this.active = upMenu[i].path
      //       break
      //     }
      //   }
      // }
    },
    _checkAuth(list) {
      let { systemAuthPageS = [] } = this.user
      let index = 0
      while (index < list.length) {
        let item = list[index]
        let children = item.children
        if (children && children.length > 0) {
          this._checkAuth(children)
          if (children.length < 1) {
            list.splice(index, 1)
            continue
          }
        }
        let { path } = item
        if (path && !systemAuthPageS.includes(path)) {
          // 没有该页面权限
          list.splice(index, 1)
          continue
        } else {
          index++
        }
      }
    },
    _checkTodo(list) {
      console.log(list)
      let todo = this.todo
      if (todo) {
        return list.map(item => {
          // 递归处理子节点
          let children = item.children
          if (children && children.length > 0) {
            item.children = this._checkTodo(children)
          }
          let selfFlag = false
          // 处理自身节点
          let path = item.path
          if (path) {
            // 如果菜单项包含path，即子菜单，查看该path对应的todo数量，大于0，标红点，否则，取消红点
            selfFlag = Boolean(todo[path])
          }
          let childrenFlag
          // 扫描子节点，只要有1个子菜单标红，父级菜单也标红点，否则，取消红点
          childrenFlag = Boolean(item.children?.find(child => child?.hasTodo))
          // 自身标红或子节点有标红的，标红自身
          item.hasTodo = selfFlag || childrenFlag
          return item
        })
      } else {
        return list
      }
    },
    _generateNavs(routes) {
      let res = []
      routes.forEach(item => {
        if (item?.meta?.isMenu) {
          let { path, name } = item
          res.push({ path, title: name })
        }
      })
      return res
    },
  },
}
</script>

<style lang="less">
@import '~@/assets/less/variables.less';

@base-left: 1.5em;

.home-nav.el-menu {
  width: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid @clr-border;
  background: url('../../assets/img/aside-bg.png') no-repeat;
  background-size: 100% 100%;

  .workbench-first {
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    height: 45px;
    color: #fff;
    background: #4bcfba;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-right: 16px;
      width: 22px;
    }
  }

  .el-submenu__title:hover {
    background-color: #282828 !important;
  }

  .el-menu-item.is-active {
    background-color: #282828 !important;
  }

  .el-menu-item:hover {
    background: #282828 !important;
  }

  .nav-title_ {
    margin-left: @base-left + 0.6em;
  }

  .nav-sub-title {
    margin-left: @base-left - 0.8em;
  }

  .nav-badge {
    display: inline;
  }

  .iconfont {
    position: absolute;
    left: @base-left;
    color: #fff;
  }
}
</style>
