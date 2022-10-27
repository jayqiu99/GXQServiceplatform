<template>
  <div>
    <a-drawer
      title="详细信息"
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
            <img alt="example" style="width: 100%" :src="imgsrc+formData.logoAddress" />
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
        <a-button :style="{ marginRight: '8px' }" @click="onClose">关闭</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { getAction, getUrl } from '@/api/manage'
export default {
  data() {
    return {
      previewVisible: false,
      previewVisibleBusinessLicenseAddress: false,
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
      imgsrc: '',
      visible: false,
    }
  },
  methods: {
    showDrawer(record) {
      this.visible = true
      getAction('/hall/enterprise/list', { id: record.enterpriseid }).then((res) => {
        this.formData = res.result.records[0]
         this.formData.logoAddress=this.formData.logoAddress==""||this.formData.logoAddress==null?'/zqhrimg/publicImg/img.png':this.formData.logoAddress
        this.formData.businessLicenseAddress=this.formData.businessLicenseAddress==""||this.formData.businessLicenseAddress==null?'/zqhrimg/publicImg/img.png':this.formData.businessLicenseAddress
        this.fileListLogo[0].url = getUrl() + this.formData.logoAddress
        this.fileListBusinessLicenseAddress[0].url = getUrl() + this.formData.businessLicenseAddress
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
    onClose() {
      this.visible = false
    },
  },
}
</script>

