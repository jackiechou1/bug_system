<template>
  <div class="data-table clear">
    <!--表格-->
    <el-table v-bind="$attrs" v-on="$listeners" ref="table" :maxHeight="tableHeight" :data="displayTableData">
      <!--选择列-->
      <el-table-column v-if="selectionColumn" type="selection" width="55" align="center" />
      <!--序号列-->
      <el-table-column
        v-if="indexColumn"
        fixed="left"
        label="序号"
        type="index"
        :index="_generateIndex"
        width="50"
        align="center"
      />
      <!--数据列-->
      <slot></slot>
      <!--分页-->
    </el-table>
    <el-pagination
      v-if="isShowPagination"
      @size-change="_handleSizeChange"
      @current-change="_handleCurrentChange"
      v-bind="$attrs"
      v-on="$listeners"
      :layout="'total, sizes, prev, pager, next, jumper'"
      :current-page="pagination.pageNo"
      :page-size="pagination.pageSize"
    />
  </div>
</template>

<script>
const DEFAULT_PAGE_SIZE = 10
const DEFAULT_CURRENT_PAGE = 1

export default {
  name: 'DataTable',
  props: {
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    fitHeight: {
      type: Boolean,
    },
    data: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    indexColumn: {
      type: Boolean,
      default() {
        return false
      },
    },
    selectionColumn: {
      type: Boolean,
      default() {
        return false
      },
    },
    pagination: {
      type: Object,
      default() {
        return {
          pageNo: DEFAULT_CURRENT_PAGE,
          pageSize: DEFAULT_PAGE_SIZE,
        }
      },
    },
  },
  data() {
    return {
      tableHeight: undefined,
    }
  },
  computed: {
    displayTableData() {
      if (this.isShowPagination) {
        return this.data.slice(0, this.pagination.pageSize || DEFAULT_PAGE_SIZE)
      } else {
        return this.data
      }
    },
  },
  created() {
    this._onWindowResize = () => {
      this._calculateFit()
    }
  },
  mounted() {
    if (this.fitHeight) {
      this._calculateFit()
      window.addEventListener('resize', this._onWindowResize)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this._onWindowResize)
  },
  methods: {
    _handleSizeChange(size) {
      let pagination = { pageNo: this.pagination.pageNo, pageSize: size }
      this.$emit('update:pagination', pagination)
      this.$emit('page-change', pagination)
    },
    _handleCurrentChange(currentPage) {
      let pagination = {
        pageNo: currentPage,
        pageSize: this.pagination.pageSize,
      }
      this.$emit('update:pagination', pagination)
      this.$emit('page-change', pagination)
    },
    _generateIndex(index) {
      let { pageSize, pageNo } = this.pagination
      return (pageNo - 1) * pageSize + index + 1
    },
    _calculateFit() {
      this.$el.classList.add('fit')
      this.$nextTick(() => {
        let wrapperHeight = getComputedStyle(this.$el).height
        let paginationComputedStyle = getComputedStyle(this.$refs.pagination.$el)
        let paginationHeight = paginationComputedStyle.height
        let paginationMarginTop = paginationComputedStyle.marginTop
        let paginationMarginBottom = paginationComputedStyle.marginBottom

        this.tableHeight =
          parseInt(wrapperHeight) -
          parseInt(paginationHeight) -
          parseInt(paginationMarginTop) -
          parseInt(paginationMarginBottom)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.data-table {
  margin-top: 10px;

  &.fit {
    flex: 1;
    overflow-y: hidden;
  }

  .el-pagination {
    float: right;
    margin: 5px 0;
  }
}
</style>
