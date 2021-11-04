<template>
  <el-form-item v-bind="$attrs" :prop="prop" class="search-condition">
    <slot></slot>
  </el-form-item>
</template>

<script>
export default {
  name: 'SearchCondition',
  props: {
    prop: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.el-form-item.search-condition {
  margin-right: 15px;

  .el-form-item__label {
    padding-right: 5px;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 210px;
  }
}
</style>
