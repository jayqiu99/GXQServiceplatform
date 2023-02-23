<template>
  <a-modal  :title="title" :width="600" :visible="visible" @cancel="handleCancel" style="overflow: auto;">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
       <div  v-html="noticeContent" class="ql-editor" ></div>
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
          if(res.result.noticeContent.indexOf('<img')!=-1){
          _this.noticeContent= res.result.noticeContent.replace(/<img/g,'<img style="max-width:100%;height:auto;display:block;margin:10px 0;"')
          }else{
           _this.noticeContent=res.result.noticeContent
          }
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
<style  scoped>
/deep/.ant-modal-body {
  max-height: calc(80vh - 150px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
 
  &::-webkit-scrollbar-thumb {

    background: #e3e3e6;
    border-radius: 6px;
  }
 
  &::-webkit-scrollbar-track {
    background: transparent;

    border-radius: 5px;
  }
}
</style>
