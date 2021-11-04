<template>
  <div>
    <el-upload
      :class="{ limit: fileList.length === $attrs.limit, hide: hideUpload }"
      v-bind="$attrs"
      :action="baseUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :file-list="fileList"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!--预览圖片-->
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { getSessionToken } from '@/utils/app-utils'
import { proxy } from '@/utils/proxy-utils'
import { concatUrl, previewOrDownload } from '@/utils/file-utils'

export default {
  name: 'FileUploader',
  props: {
    value: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    hideUpload: {
      type: Boolean,
    },
  },
  data() {
    return {
      baseUrl: proxy('/api/PublicFileController/uploadFileServerCoudWebWithType'),
      headers: {
        Authorization: getSessionToken(),
        token: getSessionToken(),
      },
      dialogVisible: false,
      dialogImageUrl: null,
    }
  },
  computed: {
    fileList() {
      return this.value || []
    },
    acceptExtensions() {
      return this.$attrs.accept?.split(',')
    },
    acceptTypes() {
      return this.acceptExtensions?.map(it => it.substring(1))
    },
  },
  methods: {
    // 上传前
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 100) {
        this.$message.error('上传文件大小不能超过 100MB!')
        return false
      }
      if (this.acceptExtensions != null) {
        let fileName = file.name
        let extension = fileName.substring(fileName.lastIndexOf('.'))
        if (!this.acceptExtensions.some(it => it.indexOf(extension) !== -1)) {
          this.$message.error(`只支持上传${this.acceptTypes}类型的文件`)
          return false
        }
      }
      return true
    },
    // 预览
    handlePreview(file) {
      let { url, name, path } = file
      if (!url) {
        url = path
      }
      url = concatUrl(url)
      console.log(url, '11')
      if (file.fileType !== 1) {
        previewOrDownload(url, name)
      } else {
        this.dialogImageUrl = url
        this.dialogVisible = true
      }
    },
    // 移除文件时
    handleRemove(file, fileList) {
      this.$emit('change', file, fileList)
      this.$emit('input', fileList)
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      console.log(file, 'aa')
      file = this._transformFile(file)
      let list = fileList.map(v => this._transformFile(v))
      this.$emit('input', list)
      this.$emit('change', file, list)
    },
    _transformFile(file) {
      // debugger
      if (file.response != null) {
        let item = file.response.data[0]
        // let url = concatUrl(item.url)
        return {
          // name: item.name,
          // url,
          // fileName: item.name,
          // path: item.url,
          // fileType: item.type,
          // size: file.size,
          downloadUrl: item.downloadUrl,
          name: item.name,
          type: item.type,
          url: item.url,
        }
      } else {
        return file
      }
    },
  },
}
</script>
<style lang="less">
.limit .el-upload {
  display: none;
}
</style>
<style>
.hide .el-upload--picture-card {
  display: none;
}
</style>
