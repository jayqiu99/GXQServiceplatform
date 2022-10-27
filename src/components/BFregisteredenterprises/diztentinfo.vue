<template>
  <div>
    <a-drawer
      title="企业详细信息"
      :width="800"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24">
          <h3>企业名称：{{formData.enterpriseName}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>所属行业：{{formData.trade}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>企业规模：{{formData.scale}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>所在地址：{{formData.address}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>企业简介：{{formData.synopsis}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>负责人：{{formData.companyPrincipal}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>联系电话：{{formData.phone}}</h3>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>企业LOGO：</h3>
        </a-col>
        <a-col :span="24/2" :pull="8">
          <a-upload
            action
            list-type="picture-card"
            :file-list="fileListLogo"
            @preview="handlePreview"
            @change="handleChange"
            disabled
          ></a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="企业LOGO" style="width: 100%" :src="imgsrc+formData.logoAddress" />
          </a-modal>
        </a-col>
      </a-row>
      <a-row style="width: 100%;" :gutter="[0,32]">
        <a-col :span="24/2">
          <h3>营业执照：</h3>
        </a-col>
        <a-col :span="24/2" :pull="8">
          <a-upload
            action
            list-type="picture-card"
            :file-list="fileListBusinessLicenseAddress"
            @preview="handlePreviewBusinessLicenseAddress"
            @change="handleChangeBusinessLicenseAddress"
            disabled
          ></a-upload>
          <a-modal
            :visible="previewVisibleBusinessLicenseAddress"
            :footer="null"
            @cancel="handleCancelBusinessLicenseAddress"
          >
            <img alt="营业执照" style="width: 100%" :src="imgsrc+formData.businessLicenseAddress" />
          </a-modal>
        </a-col>
      </a-row>
      <!-- <a-row style="width: 100%;" :gutter="[0,20]">
        <a-col :span="4/2" style="margin-top:-1.5%;">
          <a-form :form="form">
            <a-form-item label="审核"></a-form-item>
          </a-form>
        </a-col>
        <a-col :span="12/2" style="margin-lift:20%;">
          <a-radio-group v-model="identity">
            <a-radio value="1">通过</a-radio>
            <a-radio value="-1">不通过</a-radio>
          </a-radio-group>
        </a-col>
      </a-row> -->

      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <!-- <a-button style="margin-right: .8rem" @click="onClose">关闭</a-button> -->
        <!-- <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">保存</a-button> -->
        <a-radio-group v-model="edradio" @change="radioChange">
        <a-radio :value="1">岗位信息</a-radio>
        <a-radio :value="2">企业信息</a-radio>
      </a-radio-group>
        <a-button @click="handleEdit()" type="primary">确认信息并下一页</a-button>
        <!-- <a-button :style="{ marginRight: '8px' }" @click="onClose">关闭</a-button> -->
      </div>
    </a-drawer>
    <!-- <add-modal ref="modalForm" @ok="modalFormOk"></add-modal> -->
    <determine ref="determineinfo" @ok="modalFormOk"></determine>
  </div>
</template>
<script>
import { getAction, getUrl } from '@/api/manage'
import { getentryenterpriseex, getaddticket, getcancelticket } from '@/api/api'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import AddModal from './modules/SeePosition'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Determine from './modules/Determine.vue'
import store from '@/store'
export default {
  mixins: [JeecgListMixin],
  components: { AddModal,Determine},
  data() {
    return {
      restobj:'',
      confirmLoading:false,
       previewVisible: false,
      previewVisibleBusinessLicenseAddress: false,
      ticketobj: {},
      restrecord: {},
      identity: '',
      enterpriseidex: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      edradio: 2,
      formData: {
        enterpriseName: '',
        trade: '',
        scale: '',
        address: '',
        synopsis: '',
        companyPrincipal: '',
        phone: '',
        logoAddress: '',
        businessLicenseAddress: '',
      },
        fileListLogo: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: '',
        },
      ],
      fileListBusinessLicenseAddress: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: '',
        },
      ],
      entryenterEX: {},
      imgsrc: '',
      visible: false,
    }
  },
  methods: {
    modalFormOk(rest){
      console.log("父组件",rest)
      this.showDrawer(rest);
    },
    modalFormOktt(rest){
      console.log("父组件",rest)
      this.showDrawer(rest);
    },
    handleEdit(){
      console.log("最后一页",this.restobj);
      this.$refs.determineinfo.edit(this.restobj)
      this.visible = false
    },
    //单选
    radioChange(radiores) {
      var that = this
      // that.visible = true
      if (radiores.target.value == 1) {
        that.visible = false
        this.$emit('ok', this.restobj, radiores.target.value)
      }
      console.log('单选事件', radiores.target.value)
    },
    showDrawer(record) {
      this.visible = true
      this.edradio = 2
      // console.log("企业信息111",record)
      console.log(record)
      this.restobj=record
      this.identity = record.examinestate
      this.restrecord = record
      this.enterpriseidex = record.id
      getAction('/hall/enterprise/list', { id: record.enterpriseid }).then((res) => {
        console.log("企业信息",res.result)
        this.formData = res.result.records[0]
        this.formData.logoAddress=this.formData.logoAddress==""||this.formData.logoAddress==null?'/zqhrimg/publicImg/img.png':this.formData.logoAddress
        this.formData.businessLicenseAddress=this.formData.businessLicenseAddress==""||this.formData.businessLicenseAddress==null?'/zqhrimg/publicImg/img.png':this.formData.businessLicenseAddress
          this.fileListLogo[0].url = getUrl() + this.formData.logoAddress
        this.fileListBusinessLicenseAddress[0].url = getUrl() + this.formData.businessLicenseAddress
        console.log(this.formData)
        this.imgsrc = getUrl()
      })
    },
      handleCancel() {
      this.previewVisible = false
    },
    handleCancelBusinessLicenseAddress() {
      this.previewVisibleBusinessLicenseAddress = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    async handlePreviewBusinessLicenseAddress(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisibleBusinessLicenseAddress = true
    },
    handleChange({ fileList }) {
      this.fileListLogo = fileList
    },
    handleChangeBusinessLicenseAddress({ fileList }) {
      this.fileListBusinessLicenseAddress = fileList
    },
    handleSubmit() {
      const that = this
      // 触发表单验证
      that.entryenterEX.examinestate = this.identity
      that.entryenterEX.id = this.enterpriseidex
      // that.addDepartsToUser(that,formData); // 调用根据当前用户添加部门信息的方法
      let obj
      console.log('审核1', that.entryenterEX)
      obj = getentryenterpriseex(that.entryenterEX)
      getentryenterpriseex(that.entryenterEX).then((res) => {
        if (res.success) {
          if (this.identity == 1) {
            console.log('通过', this.ticketobj)
            this.ticketobj.enterpriseInfoId = this.restrecord.enterpriseid
            this.ticketobj.role = 1
            this.ticketobj.staffManageId = 0
            this.ticketobj.jobFairId = this.restrecord.jobfairid
            this.ticketobj.createBy = store.getters.userInfo.username
            this.ticketobj.createTime = this.getNowFormatDate()
            this.ticketobj.updateBy = store.getters.userInfo.username
            this.ticketobj.updateTime = this.getNowFormatDate()
            getaddticket(this.ticketobj).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                this.visible = false
              } else {
                that.$message.warning(res.message)
                this.visible = false
              }
            })
          } else if (this.identity == -1) {
            console.log('不通过')
            this.ticketobj.enterpriseInfoId = this.restrecord.enterpriseid
            this.ticketobj.role = 1
            this.ticketobj.staffManageId = 0
            this.ticketobj.jobFairId = this.restrecord.jobfairid
            this.ticketobj.createBy = store.getters.userInfo.username
            this.ticketobj.createTime = this.getNowFormatDate()
            this.ticketobj.updateBy = store.getters.userInfo.username
            this.ticketobj.updateTime = this.getNowFormatDate()
            getcancelticket(this.ticketobj).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                this.visible = false
              } else {
                that.$message.warning(res.message)
                this.visible = false
              }
            })
          }
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds()
      return currentdate
    },
    onClose() {
      this.visible = false
    },
  },
}
</script>

