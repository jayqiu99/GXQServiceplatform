<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="政策标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入政策标题"
            v-decorator.trim="['noticeTitle', validatorRules.noticeTitle]"
          />
        </a-form-item>
        <a-form-item label="政策图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <el-row :gutter="20">
            <el-col :span="6">  <u-image-upload
            class="avatar-uploader"
            text="上传"
            @eChange="handleChange"
            v-model="imgsrc"
          ></u-image-upload></el-col>
            <el-col :span="12"  ><div style="margin-top:30px"><a-button type="primary" shape="circle" icon="search" @click="handlePreview(imgsrc)" /></div></el-col>
          </el-row>
         
          
        </a-form-item>
        <a-form-item label="政策内容" :labelCol="labelCol" :wrapperCol="wrapperCol"> <quill-editor
            v-decorator.trim="['noticeContent', validatorRules.noticeContent]"
            style="width: 1000px; height: 400px;margin-bottom:100px"
            ref="myQuillEditor"
          ></quill-editor></a-form-item>
      </a-form>
      <a-modal :visible="previewVisible" :footer="null" @cancel="imghandleCancel">
        <img alt="example" style="width: 100%" :src="imgsrc" />
      </a-modal>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { quillEditor } from 'vue-quill-editor'
import store from '@/store'
import UImageUpload from '../../../components/jeecg/upimagestwo'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { getAction, deleteAction, postAction, getUrl } from '@/api/manage'
export default {
  name: 'publicModal',
  props: {
    noticetype: {
      type: String,
      default: () => {
        return ''
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
  },
  components: { quillEditor, ElImageViewer, UImageUpload },
  data() {
    return {
      value: 1,
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 0 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 0 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        noticeTitle: { rules: [{ required: true, message: '请输入标题!' }] }
      },
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: ''
        }
      ],
      previewVisible: false,
      imgsrc: '',
      priviewVisible: false,
      imgsrcList: [],
      isFresh: false
    }
  },
  created() {},
  computed: {},
  methods: {
    add() {
      this.imgsrc = ''
      this.address = ''
      this.edit({})
    },
    edit(record) {
      if (record.id) {
        if (record.address != '') {
          setTimeout(() => {
            this.imgsrc = getUrl() + record.address
            this.address = record.address
          }, 5)
        }
        this.visiblekey = true
      } else {
        this.visiblekey = false
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'noticeContent', 'noticeTitle', 'address', 'noticeType'))
      })
    },
    async handlePreview(file) {
      this.imgsrc = file
      this.previewVisible = true
    },
    // 确定
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          values.noticeType = this.noticetype
          values.address = this.address
          values.noticeContent = (values.noticeContent.html || '').trim()
          values.noticeTitle = (values.noticeTitle || '').trim()
          values.createBy = (store.getters.userInfo.id || '').trim()
          values.updateBy = (store.getters.userInfo.id || '').trim()
          let formData = Object.assign(this.model, values)
          let url
          console.log(formData)
          if (!this.model.id) {
            url = '/app/publicnotice/add'
          } else {
            url = '/app/publicnotice/editById'
          }
          postAction(url, formData)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    closeViewer() {
      console.log('关闭图片')
      this.priviewVisible = false
    },
    viewBigPicture() {
      this.priviewVisible = true
    },
    handleSuccess(res, file) {
      this.address = res.result
      this.$message.success('上传图片成功')
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    handleChange(imgurl) {
      setTimeout(() => {
        this.imgsrc = ""
        var httpurla = 'https://dwrlzy.jiahangit.com.cn/zqhr'
        this.imgsrc = httpurla + imgurl
        this.address = imgurl
        console.log('图2', this.imgsrc)
      }, 5)
    },
    imghandleCancel() {
      this.previewVisible = false
    },
    // 关闭
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.visible = false
    }
  }
}
</script>

