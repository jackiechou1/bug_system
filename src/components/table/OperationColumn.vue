<template>
  <el-table-column
    v-bind="$attrs"
    v-on="$listeners"
    :align="align"
    :fixed="fixed"
    :label="labelName"
    class-name="operation-column"
  >
    <template v-slot="data">
      <slot v-bind="data"></slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'OperationColumn',
  props: {
    align: {
      type: String,
      default() {
        return 'center'
      },
    },
    fixed: {
      type: String,
      default() {
        return 'right'
      },
    },
    labelName: {
      type: String,
      default() {
        return '操作'
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
