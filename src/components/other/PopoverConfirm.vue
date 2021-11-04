<template>
  <el-popover v-bind="$attrs" placement="top" v-model="visible">
    <div style="text-align: right;">
      <el-button size="mini" type="text" @click="visible = false">
        取消
      </el-button>
      <el-button size="mini" type="text" @click="_ok">确定</el-button>
    </div>
    <template slot="reference">
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'PopoverConfirm',
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    _ok() {
      this.visible = false
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="less" scoped></style>
