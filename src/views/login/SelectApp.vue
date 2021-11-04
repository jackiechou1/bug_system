<template>
  <div class="select-app">
    <el-card v-for="(item, index) of list" :key="index" shadow="hover" class="app" @click.native="selectApp(item)">
      {{ item.appName }}
    </el-card>
  </div>
</template>

<script>
import { list } from '@/apis/app-apis'
import { mapMutations } from 'vuex'
import { ROUTE_HOME } from '@/router/path'

export default {
  name: 'SelectApp',
  created() {
    this.getData()
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ...mapMutations({
      setApp: 'setApp',
    }),
    async getData() {
      this.list = await list({})
    },
    selectApp(payload) {
      this.setApp(payload)
      sessionStorage.setItem('app', JSON.stringify(payload))
      this.$router.push({ path: ROUTE_HOME })
    },
  },
}
</script>

<style lang="less" scoped>
.select-app {
  height: 400px;
  width: 420px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid #ffc300;
  }
}
</style>
