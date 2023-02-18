<template>
  <a-modal :title="title" :width="600" :visible="visible" @cancel="handleCancel" style="overflow: auto;">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
       <div v-html="noticeContent" class="ql-editor" ></div>
      </a-form>
    </a-spin>

    <template slot="footer">
      <a-button type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getAction } from '../../api/manage'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'IpadRegisterAddModal',
  data() {
    return {
      value: 1,
      title: '通知公告',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      noticeContent:null
    }
  },
  created() {
    this.getNotice()
  },
  methods: {
    edit(record) {
      this.visible = true
    },
    // 关闭
    handleCancel() {
      this.close()
    },
    getNotice(){
      var _this=this;
      getAction('/app/publicnotice/getpublicnotice').then(res=>{
        if(res.success){
          if(res.result!=null){
          _this.visible=true
          _this.noticeContent=res.result.noticeContent
          }}
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
  },
}
</script>
