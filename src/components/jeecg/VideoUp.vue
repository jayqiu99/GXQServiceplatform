<template>
  <div>
    <a-upload
      name="file"
      :multiple="isMultiple"
      action="http://123.57.236.82:8080/zqhr/base/upload"
      :data="{systype:biaz}"
      :fileList="fileList"
      style="margin-left:5%"
      :beforeUpload="beforeUpload"
      :disabled="disabled"
      :isMultiple="isMultiple"
      :showUploadList="isMultiple"
      @change="handleChange"
      @preview="handlePreview"
    >
      <a-button>
          <a-icon type="upload" @click="openFullScreen1"/>视频上传
        </a-button>
        <!-- <el-progress class="proclass" type="circle" :width="90" :height="90" :percentage="25"></el-progress> -->
    <el-progress class="proclass" :width="90" :height="90" v-if="isprogress==1" style="width:100px" type="circle" :percentage="progressnum"></el-progress>
    </a-upload>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getFileAccessHttpUrl } from '@/api/manage'
import ImgPreview from '../../views/jeecg/ImagPreview.vue'

const uidGenerator = () => {
  return '-' + parseInt(Math.random() * 10000 + 1, 10)
}
const getFileName = path => {
  if (path.lastIndexOf('\\') >= 0) {
    let reg = new RegExp('\\\\', 'g')
    path = path.replace(reg, '/')
  }
  return path.substring(path.lastIndexOf('/') + 1)
}
export default {
  name: 'JImageUpload',
  components: {
    
  },
  data() {
    return {
      isprogress:0,
      progressnum:0,
      uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
      uploadLoading: false,
      picUrl: false,
      headers: {},
      fileList: [],
      previewImage: '',
      previewVisible: false,
      biaz: ''
    }
  },
  props: {
    text: {
      type: String,
      required: false,
      default: '上传'
    },
    /*这个属性用于控制文件上传的业务路径*/
    bizPath: {
      type: String,
      required: false,
      default: 'temp'
    },
    value: {
      type: [String, Array],
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    isMultiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    value(val) {
      if (val instanceof Array) {
        this.initFileList(val.join(','))
      } else {
        this.initFileList(val)
      }
      if (!val || val.length == 0) {
        this.picUrl = false
      }
    }
  },
  created() {
    const token = Vue.ls.get(ACCESS_TOKEN)
    this.headers = { 'X-Access-Token': token }
  },
  methods: {
    openFullScreen1(){
      console.log("文件上传");
    },
    initFileList(paths) {
      console.log('步骤1')
      if (!paths || paths.length == 0) {
        this.fileList = []
        return
      }
      this.picUrl = true
      let fileList = []
      let arr = paths.split(',')
      for (var a = 0; a < arr.length; a++) {
        let url = getFileAccessHttpUrl(arr[a])
        fileList.push({
          uid: uidGenerator(),
          name: getFileName(arr[a]),
          status: 'done',
          url: url,
          response: {
            status: 'history',
            message: arr[a]
          }
        })
      }
      this.fileList = fileList
    },
    beforeUpload: function(file) {
      console.log('步骤2', file)
      this.isprogress=1;
      this.progressnum=10;
      this.biaz = 'sysEnterprise'
      var fileType = file.type
      const isLt2M = file.size / 1024 / 1024 < 50
      if(!isLt2M) {
          this.$message.warning('上传文件大小不能超过 50MB!请重新选择文件')
          return false
				}
      if (fileType.indexOf('mp4') < 0) {
        this.$message.warning('请上传正确视频格式')
        return false
      }
      
    },
    handleChange(info) {
      console.log('步骤3')
      this.picUrl = false
      this.progressnum=this.progressnum+1;
      // this.biaz=info.file.name
      let fileList = info.fileList
      if (info.file.status === 'done') {
        if (info.file.response.success) {
          this.picUrl = true
          fileList = fileList.map(file => {
            if (file.response) {
              if (file.response.result != undefined) {
                this.progressnum=90;
                this.$emit('eChange', file.response.result)
                console.log('参数3', file.response.result)
                this.isprogress=0;
              }

              file.url = file.response.message
            }
            return file
          })
        }
        //this.$message.success(`${info.file.name} 上传成功!`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败.`)
      } else if (info.file.status === 'removed') {
        this.handleDelete(info.file)
      }
      this.fileList = fileList
      if (info.file.status === 'done' || info.file.status === 'removed') {
        this.handlePathChange()
      }
    },
    // 预览
    handlePreview(file) {
      console.log('步骤1')
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    getAvatarView() {
      if (this.fileList.length > 0) {
        let url = this.fileList[0].url
        return getFileAccessHttpUrl(url)
      }
    },
    handlePathChange() {
      let uploadFiles = this.fileList
      let path = ''
      if (!uploadFiles || uploadFiles.length == 0) {
        path = ''
      }
      let arr = []
      if (!this.isMultiple) {
        arr.push(uploadFiles[uploadFiles.length - 1].response.message)
      } else {
        for (var a = 0; a < uploadFiles.length; a++) {
          arr.push(uploadFiles[a].response.message)
        }
      }
      if (arr.length > 0) {
        path = arr.join(',')
      }
      this.$emit('change', path)
    },
    handleDelete(file) {
      //如有需要新增 删除逻辑
      console.log(file)
    },
    handleCancel() {
      this.close()
      this.previewVisible = false
    },
    close() {}
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>
<style scoped>
  .proclass{
    margin-left: 200%;
    margin-top: 30%;
  }
</style>