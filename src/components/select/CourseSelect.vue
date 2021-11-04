<template>
  <!--课程 下拉组件-->
  <el-select
    :value="value"
    filterable
    clearable
    v-bind="$attrs"
    v-on="$listeners"
    placeholder="课程ID"
    @change="onChange"
  >
    <el-option
      v-for="(item, $index) in options"
      :key="$index"
      :label="item.courseId"
      :value="item.courseId"
    ></el-option>
  </el-select>
</template>

<script>
import { courseList } from '@/apis/course-management'

export default {
  name: 'CourseSelect',
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
    async _loadData() {
      if (this.params == null) {
        this.options = []
      } else {
        this.options = await courseList(this.params)
        if (this.value != null) {
          this.onChange(this.value)
        }
      }
    },
    onChange(value) {
      this.$emit(
        'select',
        this.options.find(item => item.courseId === value)
      )
    },
  },
}
</script>

<style lang="less" scoped></style>
