<template>
  <el-form
    ref="formSearch"
    inline
    :model="model"
    v-bind="$attrs"
    v-on="$listeners"
    label-width="100px"
    class="search-form"
  >
    <div class="condition-wrapper">
      <slot></slot>
    </div>
    <div class="buttons-wrapper">
      <slot name="buttons">
        <el-button class="search-button" type="primary" @click="_search">查询</el-button>
        <el-button class="search-button" @click="reset">重置</el-button>
      </slot>
      <slot name="addPerson"></slot>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'SearchContainer',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    reset() {
      this.$refs.formSearch.resetFields()
      this.$emit('reset')
    },
    validate(fn) {
      this.$refs.formSearch.validate(valid => {
        fn(valid)
      })
    },
    _search() {
      this.$refs.formSearch.validate(valid => {
        if (valid) {
          this.$emit('search')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.search-form {
  display: flex;
  background-color: #fff;
  padding: 10px 0 0;

  .condition-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .buttons-wrapper {
    width: 250px;
  }

  .search-button {
    width: 100px;
    margin-bottom: 18px;

    & + .search-button {
      margin-left: 10px;
    }
  }
}
</style>
