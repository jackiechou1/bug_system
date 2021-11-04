<!--  -->
<template>
 <div id="app">
  <el-form :inline="true" :model="formInline" class="form_">
    <el-form-item label="bug统计">
    <el-select v-model="value" placeholder="请选择成员">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
     </el-option>
    </el-select>
    </el-form-item>
    <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  <el-row class="el-row">
    <el-button @click="bugStatic" type="primary">统计</el-button>
    <el-button @click="resetValue">重置</el-button>
  </el-row>
  </div>
  </el-form>
   <div ref="echarts" class="echarts"></div>
   <el-table
    :data="tableData2"
    border
    style="width: 80%"
    class="el-table">
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="profession"
      label="职位"
      width="150">
    </el-table-column>
    <el-table-column
      prop="done"
      label="完成率"
      width="150">
    </el-table-column>
    <el-table-column
      prop="bug_total"
      label="bug总数"
      width="150">
    </el-table-column>
    <el-table-column
      prop="bug_fixed"
      label="已解决bug"
      width="160">
    </el-table-column>
    <el-table-column
      prop="bug_nofixed"
      label="未解决bug"
      width="160">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="超时bug"
      width="170">
    </el-table-column>
   </el-table>
 </div>
 
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:'StaContent',
  data() {
    return {
        options: [{
          value: '小张',
          label: '小张'
        }, {
          value: '小李',
          label: '小李'
        }, {
          value: '小王',
          label: '小王'
        }, {
          value: '小明',
          label: '小明'
        }, {
          value: '老王',
          label: '老王'
        }],
        legend: { data: ['小张', '小王', '小李', '小明', '老王'] },
        series: [
          {
            name: '小张',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '小王',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '小李',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '小明',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '老王',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
        tableData2: [{
            profession: 'java工程师',
            name: '张三',
            done: '33%',
            bug_total: '292',
            bug_fixed: '6',
            bug_nofixed: '10',
            bug_timeout: '12',
          }, {
            profession: 'java工程师',
            name: '李四',
            done: '33%',
            bug_total: '292',
            bug_fixed: '6',
            bug_nofixed: '10',
            bug_timeout: '12',
          }, {
            profession: 'java工程师',
            name: '小张',
            bug_total: '292',
            bug_fixed: '6',
            bug_nofixed: '10',
          }, {
            name: '老王',
            address: '上海市普陀区金沙江路 1516 弄'
          }],

        value: '',
        formInline:{
          username: '',
          isLock: '',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        
    }
  },
  mounted() {
    this.statistics()
  },
  methods: {
    resetValue(){
      this.value = ""
    },
    bugStatic(){
    // console.log(this.options)
      // console.log(this.legend.data)
      console.log(this.value)
      // for(let i=0; i<this.legend.data.length;i++){
      //   if(this.value == this.legend.data[i]){
      //     this.legend.data.splice(0,this.legend.data.length)
      //     this.legend.data.push(this.value)
      //     // this.series.splice(0,this.series.length)
      //   }else{
      //     this.legend.data.splice(0,this.legend.data.length)
      //     this.legend.data.push(this.value)
      //   }
      // }
      // this.statistics()
      // console.log(this.legend.data)
    },
    statistics() {
      var chartDom = this.$refs.echarts
      var myChart = echarts.init(chartDom)
      var option = {
        title: {
          text: 'Stacked Line',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: this.legend,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        series:this.series
        // series: [
        //   {
        //     name: '小张',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [120, 132, 101, 134, 90, 230, 210],
        //   },
        //   {
        //     name: '小王',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [220, 182, 191, 234, 290, 330, 310],
        //   },
        //   {
        //     name: '小李',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [150, 232, 201, 154, 190, 330, 410],
        //   },
        //   {
        //     name: '小明',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [320, 332, 301, 334, 390, 330, 320],
        //   },
        //   {
        //     name: '老王',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [820, 932, 901, 934, 1290, 1330, 1320],
        //   },
        // ],
      }
      option && myChart.setOption(option, true)
    },
  },
}
</script>
<style scoped>
.echarts {
  margin-top:50px;
  width: 1000px;
  height: 500px;
  margin-left: 50px;
}
.form_{
  margin-left: 50px;
  margin-top: 30px;
}
.block{
  display: inline-block;
  margin-left: 40px;
}
.el-row{
  display: inline-block;
  margin-left: 200px;
  
}
.el-table{
  margin-left: 50px;
}
</style>