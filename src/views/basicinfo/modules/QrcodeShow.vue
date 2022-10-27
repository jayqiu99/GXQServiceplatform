<template>
  <a-modal
    title="二维码信息"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    cancelText="关闭"
    @cancel="handleCancel"
    @ok="qrprint"
    okText="打印"
    :footer="null"
  >
  <a-button style="float:right" type="primary" v-print="'#qrcode'">打印</a-button>
   <img id="qrcode" alt="二维码" style="width: 100%" :src="imgsrc+qrCodeAddress" />
    
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { httpAction, getAction,getUrl } from '@/api/manage'
import store from '@/store'
export default {
  name: 'QrcodeShow',
  data() {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      imgsrc:'',
      qrCodeAddress:'',
    }
  },
  created() {},
  methods: {
     showmodal(recode){
         this.visible=true
         this.imgsrc=getUrl()
         this.qrCodeAddress=recode.qrCodeAddress
     },
   qrprint(){
       console.log(this)
   },
    handleCancel() {
      this.visible=false
    },
  },
}
</script>
<style media="print">
/*打印去掉页眉页脚*/
@page{
	size: auto;
	margin: 0mm;
}
</style>