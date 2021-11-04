<template>
  <!--业务公司 下拉组件-->
  <el-select
    :value="value"
    filterable
    clearable
    v-bind="$attrs"
    v-on="$listeners"
    placeholder="业务公司"
    @change="onChange"
  >
    <el-option
      v-for="(item, $index) in options"
      :key="$index"
      :label="item.companyName"
      :value="item.companyId"
    ></el-option>
  </el-select>
</template>

<script>
import { companyList } from '@/apis/course-management'

export default {
  name: 'CourseCompanySelect',
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
        this.options = await companyList(this.params)
        if (this.value != null) {
          this.onChange(this.value)
        }
      }
    },
    onChange(value) {
      this.$emit(
        'select',
        this.options.find(item => item.companyId === value)
      )
    },
  },
}
</script>

<style lang="less" scoped></style>
