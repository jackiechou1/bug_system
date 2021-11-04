<!--  -->
<template>
<div class="container">
 <!-- <div class="top_box"> -->
  <el-form class="search-box" >
  <el-form-item label="负责人" class="el-form-item">
  <el-select  size="small" v-model="user_name" clearable placeholder="请选择负责人">
    <el-option
      v-for="item in option_one"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="bug名称" class="">
    <el-input size="small" v-model="formInline.bugName" placeholder=""></el-input>
  </el-form-item>
  <el-form-item label="序号" class="el-form-item2">
  <el-select  size="small" v-model="bug_name" clearable placeholder="请选择">
    <el-option
      size="small"
      v-for="item in option_two"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
     <el-button size="small" @click="searchBug" type="primary">查询</el-button>
     <el-button size="small" @click="resetItem">重置</el-button>
  </el-form-item>
  </el-form>
  <el-row>
  <el-col :span="24">
    <el-table
    class="el-table2"
    :data="tableData"
    border
    style="width:70%">
    <el-table-column
      align="center"
      prop="bugTotal"
      label="bug总数"
      width="200">
    </el-table-column>
    <el-table-column
      prop="bugSolve"
      label="已解决bug"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bugUnsolved"
      label="未解决bug"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bugOverTime"
      label="超时bug"
      width="200"
      align="center">
    </el-table-column>
  </el-table>
  </el-col>
</el-row>
  <el-button size="small" type="primary" class="el-button1" @click="handleEdit()">新建bug</el-button>
  <el-table
    :data="tableData2"
    border
    style="width:100%">
    <el-table-column
      align="center"
      prop="bugId"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="bugName"
      label="bug名称"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="时间安排"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="bugStatus"
      label="完成状态"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="负责人"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column label="操作" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success">完成</el-button>
        </template>
      </el-table-column>
  </el-table>
      <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px"  >
        <el-form-item label="bug名称" prop="bugName">
          <el-input size="small"  auto-complete="off" v-model="editForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="bug描述" prop="user_bug">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="image">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="时间安排" prop="user_time">
          <el-select size="small" v-model="editForm.user_time" placeholder="请选择">
            <el-option label="2021-10-20" value="1"></el-option>
            <el-option label="2021-10-21" value="2"></el-option>
            <el-option label="2021-10-22" value="3"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select v-model="value" multiple  placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm">提交</el-button>
      </div>
    </el-dialog>
  
 <!-- </div> -->
</div>
</template>

<script>
import { bugShow,deleteBug,addBug,bugAccount,bugselectPerson} from '@/apis/login-apis'

export default {
  name:'BugContent',
  data(){
      return{
          params:{
            bugName:null,
            bugStatus: 0,
            pageNo: 1,
            pageSize: 20,
            userId: 0
          },
          formInline:{
              isLock: '',
              bugName:'',
              userTime: '',
          },
          editForm:{
              username:'',
              user_time:'',
          },
          input2:'',
          loading:false,
          editFormVisible:false,
          title: '添加bug',
          textarea: '',
          dialogImageUrl: '',
          dialogVisible: false,
          tableData: [],
          tableData2:[],
          options: [{
            value:'',
            label:''
          }],
          option_one:[],
          option_two:[],
          value: '',
          user_name:'',
          bug_name:''
      }
  },
  methods: {
      deleteUser(row) {
        this.$confirm('是否删除该bug?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let bugId = this.tableData2[row].bugId
          let param = {bugId}
          deleteBug(param).then(res=>{
            console.log(res)
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        this.getbugList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    closeDialog(){
    this.editFormVisible = false;
    },
    resetItem(){
    this.formInline.bugName = ""
   },
    handleEdit(){
      this.editFormVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //bug列表展现
    //这里用户名不能添加一样的 否则会报 key值重复！
    // 0 代表未完成  1 代表已完成 
    //列表未能渲染出数据 和传递的userId有关
    getbugList(){
      let param = this.params
      bugShow(param).then(res=>{
        this.tableData2 = res.results

        this.option_one = []
        this.option_two = []
        res.results.forEach(item=>{
          this.option_one.push({value:item.userId,label: item.userName})
          this.option_two.push({value:item.bugId, label: item.bugStatus})
        })
        for(let i =0;i<res.results.length;i++){
          if(res.results[i].bugStatus ==0){
            this.tableData2[i].bugStatus = '未解决'
          }else{
            this.tableData2[i].bugStatus = '已解决'
          }
        }
        
        
      })
    },
    //搜索bug  功能还未实现 
    //现在只要输入bug名称就能实现功能，我需要的是 选择负责人和序号 还有名称 
    //即配置 userId  和 bugStatus参数
    searchBug(){
      let param = {
        bugName:this.formInline.bugName,
        userId: '',
        bugStatus: '',
        pageNo: 1,
        pageSize: 20
      }
      bugShow(param).then(res=>{
        console.log(res)
        // this.tableData2 = res.results
      })

    },
    //bug 总数  
    bugList(){
      let param = {
        bugOverTime: "",
        bugSolve: "",
        bugTotal: "",
        bugUnsolved: "",
        fisComplete: null
      }
      bugAccount(param).then(res=>{
        console.log(res)
        this.tableData =[]
        this.tableData.push(res)
      })
    },
    //新增bug功能
    submitForm(){
      let param = {
        bugName: this.editForm.username,
        bugDetail: this.textarea,
        bugImages:[
        {
          downloadUrl:null,
          name: "",
          type: 0,
          url: ""
          }
        ],
        //这里创建时间可以动态传入
        //修改el-option 绑定option数据 动态渲染
        createTime: '2021-10-21',
        updateTime:'2021-10-22',
        //这里的userId 参数要设置为动态的 要把下拉菜单中的userId传递进去
        //根据下拉菜单中的名字的userId进行传递
        userId: 130  //怎么才能把这里的userId给替换掉？
      }
      addBug(param).then(res=>{
        console.log(res)
        this.getbugList()
      })
    },
    //负责人下拉菜单
    bug_selectPerson(){
      let param = {
        userAccount: '',
        userId: 0,
        userName: '',
        userpwd: ''
      }
      bugselectPerson(param).then(res=>{
        console.log('hello res')
        console.log(res)
        // console.log(this.value)
        this.options=[]
        res.forEach(item=>{
          this.options.push({value:item.userId,label:item.userName})
        })
      })
    }
  },
  created(){
    this.getbugList()
    this.bugList()
    this.bug_selectPerson()
  },   
}
</script>
<style scoped>
.search-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
} 
.el-form-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
}
.el-form-item2{
    margin-right: 30px;
}
.el-table{
    margin-left: 30px;
    margin-top: 50px;
}
.el-button1{
    margin-left: 1000px;
    margin-top: 25px;
}




</style>