<template>
  <!--课程状态 下拉组件-->
  <el-select :value="value" filterable v-bind="$attrs" v-on="$listeners" placeholder="课程状态">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'CourseStatusSelect',
  props: {
    value: {
      required: true,
    },
    params: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      options: [],
    }
  },
  watch: {
    params: {
      handler() {
        this._loadData()
      },
      immediate: true,
    },
  },
  methods: {
    _loadData() {
      if (this.params == null) {
        this.options = []
      } else {
        this.options = [
          { label: '启用', value: 100 },
          { label: '禁用', value: 0 },
        ]
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
