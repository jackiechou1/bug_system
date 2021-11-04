<template>
  <div class="main-content">
    <el-form :inline="true" :model="formInline" ref="nameForm" class="user-search search-form">
      <el-form-item  label="姓名">
        <el-input size="small" v-model="formInline.username"  placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input size="small" v-model="formInline.account" placeholder="输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button" size="small" @click="searchInfo('nameForm')" type="primary" icon="el-icon-search">搜索</el-button>
       <el-button class= "button" size="small" @click="resetNameForm">重置</el-button>
      </el-form-item>
      <el-form-item>
      <el-button size="small" class="button_" type="primary" @click="handelEdit" >新增人员</el-button>
    </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    border
    style="width: 80%"
    class="el-table">
    <el-table-column
      align="center"
      prop="userId"
      label="序号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="姓名"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="userAccount"
      label="账号"
      width="300"
      align="center">
    </el-table-column>
    <el-table-column
      prop="userPwd"
      label="密码"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column class="table_column" label="操作" align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="delete_(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog :title="title1" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" >
        <el-form-item label="姓名" prop="deptName">
          <el-input size="small" v-model="editForm.Name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="deptAccount">
          <el-input size="small" v-model="editForm.Account" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="deptPassword">
          <el-input size="small" v-model="editForm.Password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="序号" prop="deptId"> -->
          <!-- <el-input size="small" v-model="editForm.Num" auto-complete="off" placeholder="请输入序号"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" @click="saveItem" type="primary" :loading="loading" class="title" >保存</el-button>
      </div>
    </el-dialog>
    <el-pagination
     
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
import {searchUser, deleteUser,addUser }  from '@/apis/login-apis'

export default {
  name:'MainContent',
  data() {
      return {
        tableData: [],
        currentPage: 4,
        editFormVisible:false,
        title:'新增人员',
        title1:'',
        loading: false,
        editForm:{
          Name: '',
          Password: '',
          Account: '',
          Num: '',
          deptNum: '',
        },
        formInline:{
          username: '',
          account:'',
        },
        params:{
         "pageNo": 1,
         "pageSize": 5,
         "userAccount": "",
         "userName": ""
        }
      }
    },
  methods: {
      handleClick(row) {
        // console.log(row);
        this.editFormVisible = true;
        if (row != undefined && row != 'undefined') {
        this.title1 = '修改用户'
        this.editForm.deptName = row.name
        this.editForm.deptPassword= row.password
        this.editForm.deptAccount = row.account
        this.editForm.deptNum = row.date
      } else {
        this.title = '添加用户'
        this.editForm.deptName = ''
        this.editForm.deptPassword= ''
        this.editForm.deptAccount = ''
        this.editForm.deptNum= ''
        }

      },
      handleCurrentChange(newValue){
        this.params.pageNo = newValue 
        this.getList()
      },
      closeDialog(){
        this.editFormVisible = false;
      },
      handelEdit(){
        this.editFormVisible = true;
        this.title1="新增用户"
      },
      resetNameForm(){
        // this.$refs.nameForm.resetFields()
        // console.log(this)
        this.formInline.username = "",
        this.formInline.account = ""
      },
      //uncaught in promise?
      //无法添加用户
      saveItem(){
       let param = {
         userAccount: this.editForm.Account, //this.editForm.Account
         userName: this.editForm.Name, //this.editForm.Name
         userpwd: this.editForm.Password //this.editForm.Password
       }
       addUser(param).then(res=>{
         this.tableData = res.results
        console.log(res)
        this.getList()
        
       })
      },
      searchInfo(){
        let param = {
          "userAccount": this.formInline.account,
          "userName": this.formInline.username,
          "pageNo": 1,
          "pageSize": 20
        }
        searchUser(param).then(res=>{
          this.tableData = res.results;
          console.log(res)
        })
        // console.log(this.formInline.account)
        // console.log(this.formInline.username)
        
      },
      delete_(row){
         this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    let para = { userId:row.userId }
                    console.log(para) 
                    deleteUser(para).then(res => {
                      console.log(res)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        //重新调用渲染
                        this.getList()
                    })
                })
                .catch(() => {})
      },
      getList(){
        let param =  this.params
        searchUser(param).then(res=>{
          // console.log(res.results);
          // console.log(res)
          this.tableData = res.results
        })
      }
    },
    created(){
      this.getList()
    },
  }
</script>

<style lang="less" scoped>
.user-search{
  margin: 10px 10px 15px 15px;
}
.button{
  margin-left: 400px;
}
.button_{
  margin-left: 960px;
}
.el-table{
  margin-left: 50px;
}
.el-pagination{
  margin-left: 30px;
  margin-top: 30px;
}
</style>
