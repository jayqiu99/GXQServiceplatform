<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="17" :sm="8" :push="2">
            <a-form-item label="招聘会名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select style="margin-left: -3.7%" v-model="queryParam.jobfairId">
                <a-select-option v-for="d in jobfairdata" :key="d.id" :value="d.id">{{ d.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
               <a-input placeholder v-model="queryParam.enterpriseName"></a-input>
            </a-form-item>
          </a-col> -->
        </a-row>
        <a-row :gutter="12">
          <a-col :md="9" :sm="8" :push="2">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.enterpriseName"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="联系电话　" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.phone"></a-input>
            </a-form-item>
          </a-col> -->
          <a-col :md="6" :sm="8" :push="3">
            <a-form-item label="审核状态" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.examinestate">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="0">待审核</a-select-option>
                <a-select-option value="1">审核通过</a-select-option>
                <a-select-option value="-1">审核不通过</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-operator" style="border-top: 5px">
        <a-button @click="exportData" type="primary" icon="download">导出查询结果</a-button>
      </div>
      <a-table
        ref="table"
        bordered
        rowKey="id"
        size="middle"
        :columns="columns"
        :scroll="{ x: 1500, y: 900 }"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="chyrList(record)"><a-icon type="search" />参会人员</a>
          <a-divider type="vertical" />
          <a @click="detail(record)"><a-icon type="setting" />审核</a>
        </span>
        <span slot="examinestatetext" slot-scope="text, record">{{
          record.examinestate2 == 1 ? '通过' : record.examinestate2 == -1 ? '不通过' : '待审核'
        }}</span>
      </a-table>
      <a-modal
        title="审核"
        :visible="examinevisible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        cancelText="关闭"
      >
        <a-form>
          <a-form-item label="审核" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group v-model="examinestate">
              <a-radio value="1">通过</a-radio>
              <a-radio value="-1">不通过</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <add-modal ref="modalForm" @ok="modalFormOk"></add-modal>
    <enterprise-info ref="enterpriseinfo"></enterprise-info>
    <invitation-job ref="stafflist" @ok="modalFormOk" />
    <!-- 查看参会人员 -->
    <see-modal ref="chyrmodalForm" @ok="modalFormOk"></see-modal>
  </a-card>
</template>

<script>
import InvitationJob from './modules/Staffinfo'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import store from '@/store'
import { jobfairList } from '@/api/api'
import JInput from '@/components/jeecg/JInput'
import EnterpriseInfo from './EnterpriseInfo'
import AddModal from './modules/SeePosition'
import SeeModal from './modules/seechrymodel'
import Vue from 'vue'
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { EnterpriseInfo, AddModal, JInput, InvitationJob, SeeModal },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      examinevisible: false,
      timer: null,
      statelable: '启用',
      // 查询条件
      queryParam: {
        jobfairId: '',
        enterpriseName: '',
        examinestate: '',
        phone: '',
      },
      examinestate: '1',
      jobfairdata: [],
      // entryenterprise: [],
      joblistparams: {},
      // 表头
      columns: [
        {
          title: '招聘会名称',
          align: 'center',
          dataIndex: 'jobfairname',
          width: 350,
        },
        {
          title: '报名企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
          width: 300,
        },
        {
          title: '负责人',
          align: 'center',
          dataIndex: 'companyPrincipal',
          width: 150,
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'phone',
          width: 130,
        },
        {
          title: '报名时间',
          align: 'center',
          dataIndex: 'entryTime',
          width: 150,
        },
        {
          title: '展位号',
          align: 'center',
          dataIndex: 'boothNumber',
          width: 100,
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'examinestate2',
          scopedSlots: { customRender: 'examinestatetext' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
          width: 250,
        },
      ],
      timeis: '',
      dict: '',
      signid: '',
      enterpriseInfoId: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      url: {
        list: '/hall/entryenterprise/list?examinestate2=0',
        enable: '/hall/curriculumvitae/enable',
        jobfairdata: '/hall/jobfair/list?isexisting=0&enable=1',
        examine: '/hall/position/examineall',
      },
    }
  },
  computed: {},
  created() {
    this.getJobfairList()
  },
  methods: {
    exportData() {
      // console.log("招聘会ID",this.queryParam.jobfairId);
      var that = this,
        queryParam = that.queryParam
      console.log('查询条件', queryParam)
      // return
      this.$http({
        url:
          '/hall/entryenterprise/export?jobfairId=' +
          queryParam.jobfairId +
          '&enterpriseName=' +
          queryParam.enterpriseName +
          '&examinestate2=0&phone=' +
          queryParam.phone +
          '&examinestate=' +
          queryParam.examinestate,
        method: 'get',
        responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
        headers: {
          'Content-Type': 'application/json',
        },
        // data: {
        //   jobfairid:rec.id
        // },
      })
        .then((res) => {
          //创建一个隐藏的a连接，
          const link = document.createElement('a')
          let blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=UTF-8' })
          link.style.display = 'none'
          //设置连接
          link.href = URL.createObjectURL(blob)
          link.download = '企业报名审核汇总'
          document.body.appendChild(link)
          //模拟点击事件
          link.click()
          //console.log("res",res);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    chyrList(record) {
      this.$refs.chyrmodalForm.edit(record)
    },
    unexconfirm(reId) {
      let that = this
      console.log('审核id', reId)
      getAction(that.url.examine, {
        examinestate: -1,
        UpdateBy: store.getters.userInfo.username,
        enterpriseInfoId: reId.enterpriseid,
        jobFairId: reId.jobfairid,
      }).then((res) => {
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '审核成功',
          })
          this.examinevisible = false
          that.loadData()
        } else {
          that.$notification['error']({
            message: '通知',
            duration: 2,
            description: res.message,
          })
          this.examinevisible = false
        }
      })
    },
    exconfirm(reId) {
      let that = this
      console.log('审核id', reId)

      getAction(that.url.examine, {
        examinestate: 1,
        UpdateBy: store.getters.userInfo.username,
        enterpriseInfoId: reId.enterpriseid,
        jobFairId: reId.jobfairid,
      }).then((res) => {
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '审核成功',
          })
          this.examinevisible = false
          that.loadData()
        } else {
          that.$notification['error']({
            message: '通知',
            duration: 2,
            description: res.message,
          })
          this.examinevisible = false
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    detail(record) {
      record.module = 0
      this.joblistparams.id = record.jobfairid
      this.$refs.enterpriseinfo.showDrawer(record, 0)
      // jobfairList(this.joblistparams).then((res) => {
      //   if (res.success) {
      //     this.timeis = res.result.records[0].holdingtimeOverdue
      //     console.log('panduan1', this.timeis)
      //     if (this.timeis == -1) {
      //       this.$notification['warning']({
      //         message: '通知',
      //         duration: 2,
      //         description: '招聘会已过期，无法进行审核！',
      //       })
      //       this.timeis = ''
      //     } else {
      //       this.$refs.enterpriseinfo.showDrawer(record)
      //     }
      //   }
      // })
    },
    //员工审核
    invitationitem(record) {
      this.$refs.stafflist.edit(record)
    },
    handleCancel(e) {
      this.examinevisible = false
    },
    dataRefreh() {
      let that = this
      if (this.timer != null) {
        return
      }
      this.timer = setInterval(() => {
        that.loadData()
      }, 20000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    //审核
    examine(record) {
      this.signid = record.id
      this.enterpriseInfoId = record.enterpriseid
      this.examinevisible = true
    },
    handleOk() {
      let that = this
      getAction(that.url.examine, { examinestate: that.examinestate, id: that.signid }).then((res) => {
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '审核成功',
          })
          this.examinevisible = false
          that.loadData()
        } else {
          that.$notification['error']({
            message: '通知',
            duration: 2,
            description: res.message,
          })
          this.examinevisible = false
        }
      })
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then((res) => {
        that.jobfairdata = res.result.records
        that.queryParam.jobfairId = res.result.records[0].id
        // that.getEntryenterpriseList(that.queryParam.jobfairId)
        that.loadData()
      })
    },
    // getEntryenterpriseList(value) {
    //   let that = this
    //   getAction(that.url.list, { jobfairId: value }).then((res) => {
    //     that.entryenterprise = res.result.records
    //     that.loadData()
    //   })
    // },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.getJobfairList()
      that.queryParam.enterpriseName = ''
      that.queryParam.examinestate = ''
      that.queryParam.phone = ''
      that.loadData(this.ipagination.current)
    },
  },
  mounted() {
    this.dataRefreh()
  },
  destroyed() {
    this.clearTimer()
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>