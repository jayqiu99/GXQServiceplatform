<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper" style="margin-left:30%;">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="10" :sm="12">
            <a-form-item label="iPad编号">
              <a-input placeholder="请输入iPad编号" v-model="qrcodeparams.text"></a-input>
              <!-- <j-input placeholder="输入招聘会名称" v-model="queryParam.name"></j-input> -->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="generate" icon="search">生成</a-button>
              <a-button
                type="primary"
                @click="seeqrcode()"
                icon="reload"
                style="margin-left: 8px"
              >打印生成二维码</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div style="margin-left:35%;">
      <img :src="previewImage" title="二维码" />
    </div>
    <resume-info ref="qrcodeinfo"></resume-info>
  </a-card>
</template>

<script>
import ResumeInfo from './modules/ReQrcode'
import { filterObj } from '@/utils/util'
import { putAction, getFileAccessHttpUrl } from '@/api/manage'
import { genqrcode } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'

export default {
  name: 'UserList',
  mixins: [JeecgListMixin],
  components: {
    JInput,
    ResumeInfo,
  },
  data() {
    return {
      erurl: '',
      previewImage: '',
      qrcodeparams: {
        systype: 'QRCode',
        text: '',
      },
      url: {
        syncUser: '/process/extActProcess/doSyncUser',
        list: '/sys/user/list',
        delete: '/hall/jobfair/delete',
        deleteBatch: '/sys/user/deleteBatch',
        exportXlsUrl: '/sys/user/exportXls',
        importExcelUrl: 'sys/user/importExcel',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    generate() {
      
      if (this.qrcodeparams.text == '') {
        this.$message.warning('请输入iPad编号')
      } else {
        let params = this.qrcodeparams
        genqrcode(params).then((res) => {
          if (res.success) {
            let weburl = 'https://dwrlzy.jiahangit.com.cn/zqhr'
            this.previewImage = weburl + res.result
            this.erurl = weburl + res.result
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    },
    seeqrcode() {
      this.$refs.qrcodeinfo.showDrawer(this.erurl)
    },
  },
  mounted() {
    this.previewImage = 'https://dwrlzy.jiahangit.com.cn/zqhr/zqhrimg/publicImg/bca341b7aa392d4c45faaec01f3bf46.png'
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>