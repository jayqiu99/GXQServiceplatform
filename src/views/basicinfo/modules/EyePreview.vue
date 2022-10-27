<template>
  <a-modal
    :width="drawerWidth"
    :title="title"
    :visible="innerVisible"
    @cancel="handleCancel"
    cancelText="关闭"
    :okButtonProps=
    "{style:{display:'none'}}"
  >
  <div class="ql-container ql-snow" style="border:none">
    <div class="ql-editor" id='imgurlid'  v-html="datafileView">
       <!-- <j-editor v-model="aademovalue"/> -->
       <!-- <table id="box-table" style="border-collapse:collapse;">
       <tbody id="table_body" ></tbody>
       </table> -->
    </div>
    </div>
  </a-modal>
</template>

<script>
import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
import { putAction, deleteAction, getFileAccessHttpUrl, getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import PageLayout from '@/components/page/PageLayout'
import store from '@/store'
import { filterObj } from '@/utils/util'
import { invitationjobfair,getenterpriseList } from '@/api/api'
import JEditor from '@/components/jeecg/JEditor'
// 高度封装的请求，请使用 superRequest.call(this,{}) 的方式调用

export default {
  name: 'UserRecycleBinModal',
  mixins: [JeecgListMixin],
  components: {JEditor,PageLayout},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: '预览',
      drawerWidth: '500px',
      innerVisible: false,
      aademovalue: 'aaaa',
      dataview:'',
      url: {
        getAvatar: (path) => getFileAccessHttpUrl(`${path}`),
        // 回收站操作，get = 获取列表；put = 取回；delete = 彻底删除
        recycleBin: '/sys/user/recycleBin',
        putRecycleBin: '/sys/user/putRecycleBin',
        deleteRecycleBin: '/sys/user/deleteRecycleBin',
        list: '/hall/enterprise/list?examinestate=1',
        arealist: '/base/list?type=area',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  watch: {
    
  },
  mounted() {
  },
  methods: {
    edit(recordstr) {
    //   console.log('弹出层', recordstr)
      // this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      let that = this
      
        that.datafileView = recordstr
    //   this.datafileView="";
    //   this.datafileView ="<h1 style='text-align: center;'>邀请函模板</h1> <h2>&nbsp; &nbsp;首行缩进：</h2> <p style='text-align: right;'>&nbsp; &nbsp; &nbsp; 正文内容</p>"
    //   this.datafileView =viewDataString;
    console.log(this.datafileView);
      that.innerVisible = true
       
    },
    // invitationAdd(){
    //     console.log("111");
    //     this.aademovalue = "<h1 style='text-align: center;'>啊啊啊啊啊</h1>"
    // },
    
    
    handleOk() {
      this.$emit('ok')
    },
    handleCancel() {
      this.innerVisible = false
    },
   
    
  },
}
</script>

<style lang="less" scoped>
    
</style>