<template>
  <div>
    <el-upload
      :class="{ limit: isLimit }"
      v-bind="$attrs"
      :action="baseUrl"
      :headers="headers"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :file-list="fileList"
    >
      <em class="el-icon-plus"></em>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="400" :src="dialogImageUrl" alt="图片" />
    </el-dialog>
  </div>
</template>
<script>
import { getSessionToken } from '@/utils/app-utils'
import { proxy } from '@/utils/proxy-utils'
import { concatUrl } from '@/utils/file-utils'
import { imageResizeW } from '@/utils/format-utils'

const allowedTypes = ['image/jpeg', 'image/png']

export default {
  name: 'ImageUploader',
  props: {
    value: {
      type: Array,
      required: true,
      default() {
        return []
      },
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
      dialogImageUrl: '',
    }
  },
  computed: {
    fileList() {
      return this.value || []
    },
    isLimit() {
      return this.fileList.length === this.$attrs.limit
    },
  },
  methods: {
    // 图片上传前
    beforeAvatarUpload(file) {
      const isAllowed = allowedTypes.indexOf(file.type) !== -1
      const isLt = file.size / 1024 / 1024 < 10

      if (!isAllowed) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isAllowed && isLt
    },
    // 预览图片
    handlePictureCardPreview(file) {
      let { url, path } = file
      if (!url) {
        url = path
      }
      url = concatUrl(url)
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    // 文件列表移除文件时
    handleRemove(file, fileList) {
      console.log(fileList)
      this.$emit('change', file, fileList)
      this.$emit('input', fileList)
    },
    // 上传文件成功
    uploadSuccess(res, file, fileList) {
      file = this._transformFile(file)
      let list = fileList.map(v => this._transformFile(v))
      this.$emit('input', list)
      this.$emit('change', file, list)
    },
    _transformFile(file) {
      if (file.response != null) {
        let item = file.response.data[0]
        let url = imageResizeW(item.path, 300)
        return {
          name: item.fileName,
          url,
          fileName: item.fileName,
          path: item.path,
          fileType: item.fileType,
          size: file.size,
        }
      } else {
        return file
      }
    },
  },
}
</script>
<style lang="less">
.limit .el-upload--picture-card {
  display: none;
}
</style>
