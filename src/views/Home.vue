<template>
  <div class="home">
    <home-header />
    <div class="home-main">
      <home-nav />
      <transition name="el-fade-in-linear" mode="out-in">
        <keep-alive :include="keepAliveViews">
          <router-view class="home-main-content"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader'
import HomeNav from '@/components/home/HomeNav'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeNav,
  },
  data() {
    return {
      keepAliveViews: [],
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variables';

.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 1200px;
  background-color: @clr-bg;

  .home-main {
    display: flex;
    flex: 1;
    overflow-y: auto;

    .home-main-content {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
