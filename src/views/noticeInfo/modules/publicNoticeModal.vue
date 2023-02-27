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
        <a-row :gutter="2">
          <a-col :span="11">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="通知公告标题">
              <a-input
                placeholder="请输入通知公告标题"
                v-decorator.trim="['noticeTitle', validatorRules.noticeTitle]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="请输入或选择地址"
                v-decorator.trim="['address', validatorRules.address]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <el-button
                type="primary"
                size="mini"
                @click="gdmapclick"
                icon="el-icon-location-information"
                circle
              ></el-button>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="通知公告内容"></a-form-item>
        <a-form-item label>
          <quill-editor
            v-decorator.trim="['noticeContent', validatorRules.noticeContent]"
            style="width: 1150px; height: 500px"
            ref="myQuillEditor"
          ></quill-editor>
        </a-form-item>
      </a-form>
    </a-spin>
    <gd-map ref="mapForm" @updateLocation="updateLocation"></gd-map>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { quillEditor } from 'vue-quill-editor'
import GdMap from './Gdmap.vue'
import store from '@/store'
import { getAction, deleteAction, postAction } from '@/api/manage'
export default {
  name: 'DictModal',
  components: { quillEditor, GdMap },
  data() {
    return {
      value: 1,
      title: '修改编辑通知公告',
      visible: false,
      model: {},
      formData:[],
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        noticeTitle: { rules: [{ required: true, message: '请输入通知公告标题!' }] }
      },
      addressInfo: null
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      console.log(record)
      if (record.id) {
        this.visiblekey = true
      } else {
        this.visiblekey = false
      }
      this.form.resetFields()
      this.formData=record
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'noticeContent', 'noticeTitle', 'address', 'longitude', 'latitude'))
      })
    },
    gdmapclick() {
      this.$refs.mapForm.show(this.formData)
    },
    updateLocation(Addr) {
      console.log('位置信息：', Addr)
      this.formData.address=Addr.orgAddr
      this.addressInfo = Addr
      this.model = Object.assign({}, this.formData)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'noticeContent', 'noticeTitle', 'address', 'longitude', 'latitude'))
      })
    },
    // 确定
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          if (that.addressInfo != null) {
            values.address = that.addressInfo.orgAddr
            values.longitude = that.addressInfo.lon
            values.latitude = that.addressInfo.lat
          }
          values.noticeContent = (values.noticeContent.html || '').trim()
          values.noticeTitle = (values.noticeTitle || '').trim()
          values.noticeType = 'notice'
          values.createBy = (store.getters.userInfo.id || '').trim()
          values.updateBy = (store.getters.userInfo.id || '').trim()
          let formData = Object.assign(this.model, values)
          let url
          console.log(formData)
          console.log(this.model.id)
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