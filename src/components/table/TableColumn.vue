<template>
  <el-table-column v-bind="$attrs" v-on="$listeners" :align="align" show-overflow-tooltip>
    <template v-slot="scope">
      <slot v-bind="scope">{{ scope.row[$attrs.prop] }}</slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'TableColumn',
  props: {
    align: {
      type: String,
      default() {
        return 'center'
      },
    },
  },
  created() {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="less" scoped></style>
