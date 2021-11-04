<template>
  <el-table :data="list" element-loading-text="Loading" fit highlight-current-row border>
    <el-table-column type="index" fixed="left" label="序号" align="center" />
    <el-table-column label="bug名称" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.bugName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.createTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时间安排" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.updateTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="完成状态" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.bugStatus }}</span>
      </template>
    </el-table-column>
    <el-table-column label="负责人" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.userName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="150px">
      <template slot-scope="scope">
        <el-button v-if="scope.row.bugStatus !== '已解决'" size="mini" type="primary" @click="handleSee(scope.row)">
          查看
        </el-button>
        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        <el-button v-if="scope.row.bugStatus !== '已解决'" size="mini" type="primary" @click="handleFinish(scope.row)">
          完成
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'BugTable',
  props: {
    list: Array,
  },
  data() {
    return {}
  },
  methods: {
    //查看
    handleSee(row) {
      this.$emit('handleSee', row)
    },
    //编辑
    handleEdit(row) {
      this.$emit('handleEdit', row)
    },
    //删除
    handleDelete(row) {
      this.$emit('handleDelete', row)
    },
    //完成
    handleFinish(row) {
      this.$emit('handleFinish', row)
    },
  },
}
</script>
<style lang="less" scoped></style>
