<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :headers="headers"
        accept=".jpg,.jpeg,.png,"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :action="action"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { proxy } from '@/utils/proxy-utils'
import { getSessionToken } from '@/utils/app-utils'
import { concatUrl } from '@/utils/file-utils'

const allowedTypes = ['image/jpeg', 'image/png']

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff',
    },
  },
  data() {
    return {
      dialogVisible: false,
      listObj: [],
      fileList: [],
      action: proxy('/api/PublicFileController/uploadFileServerCoudWebWithType'),
      headers: {
        Authorization: getSessionToken(),
        token: getSessionToken(),
      },
    }
  },
  methods: {
    checkAllSuccess() {
      return this.listObj.every(item => item.hasSuccess)
    },
    handleSubmit() {
      if (!this.checkAllSuccess()) {
        this.$message('确保所有图片均已上传完毕后再试！')
        return
      }
      this.$emit('successCBK', this.listObj)
      this.listObj = []
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      let item = this.listObj.find(it => it.uid === file.uid)
      item.url = concatUrl(response.data[0].path)
      item.hasSuccess = true
    },
    handleRemove(file) {
      let index = this.listObj.findIndex(it => it.uid === file.uid)
      this.listObj.splice(index, 1)
    },
    beforeUpload(file) {
      if (allowedTypes.indexOf(file.type) === -1) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传图片大小不能超过 10MB!')
        return false
      }

      let _self = this
      const _URL = window.URL || window.webkitURL
      return new Promise(resolve => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj.push({ hasSuccess: false, uid: file.uid, width: this.width, height: this.height })
        }
        resolve(true)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
