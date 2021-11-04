<template>
  <el-table :data="list" fit show-summary>
    <el-table-column label="姓名" align="center" prop="userName"></el-table-column>
    <el-table-column label="完成率" align="center" prop="fisComplete"></el-table-column>
    <el-table-column label="bug总数" align="center" prop="bugTotal"></el-table-column>
    <el-table-column label="已解决bug" align="center" prop="bugSolve"></el-table-column>
    <el-table-column label="未解决bug" align="center" prop="bugUnsolved"></el-table-column>
    <el-table-column label="已超时bug" align="center" prop="bugOvertime"></el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'StatisticalBug',
  props: {
    list: Array,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
// /deep/ .el-table {
//   display: flex;
//   flex-direction: column;
// }
// /deep/ .el-table__body-wrapper {
//   order: 1;
// }
// /deep/ .el-table__fixed-body-wrapper {
//   top: 96px !important;
// }
// /deep/ .el-table__fixed-footer-wrapper {
//   z-index: 0;
// }
</style>
