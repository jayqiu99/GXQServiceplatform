<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="招聘会名称" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-select v-model="queryParam.jobFairId" @change="getEntryenterpriseList">
                <a-select-option v-for="d in jobfairdata" :key="d.id" :value="d.id">{{d.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="企业名称" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-input placeholder v-model="queryParam.enterpriseInfoName"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="　是否签到" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-select v-model="queryParam.signStatus">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="0">未签到</a-select-option>
                <a-select-option value="1">已签到</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="签到日期" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-date-picker
                style="width:100%"
                v-model="queryParam.signTime"
                @change="onChangeDate"
              />
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        ref="table"
        bordered
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="boothNumberText" slot-scope="text, record">{{record.signStatus==1?"已签到":"未签到"}}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="detail(record)">查看详情</a>
        </span>
      </a-table>
    </div>
    <enterprise-sign-in-detail ref="enterprisesignindetail"></enterprise-sign-in-detail>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import EnterpriseSignInDetail from './EnterpriseSignInDetail'
import Vue from 'vue'
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { EnterpriseSignInDetail },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      statelable: '启用',
      // 查询条件
      queryParam: {
        jobFairId: '',
        enterpriseInfoName: '',
        signStatus: '',
        signTime: '',
      },
      jobfairdata: [],
      entryenterprise: [],
      // 表头
      columns: [
        {
          title: '招聘会名称',
          align: 'center',
          dataIndex: 'jobFairName',
          width: 250,
        },
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'enterpriseInfoName',
          width: 250,
        },
        {
          title: '展位号',
          align: 'center',
          dataIndex: 'boothNumber',
          width: 150,
        },
        {
          title: '签到',
          align: 'center',
          dataIndex: 'signStatus',
          width: 150,
          scopedSlots: { customRender: 'boothNumberText' },
        },
        {
          title: '签到时间',
          align: 'center',
          dataIndex: 'signTime',
          width: 150,
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 250,
        },
      ],
      dict: '',
      signid: '',
      timer: null,
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      url: {
        list: '/hall/sign/list',
        jobfairdata: '/hall/jobfair/list',
        entryenterprise: '/hall/entryenterprise/list',
      },
    }
  },
  computed: {},
  created() {
    this.getJobfairList()
  },
  methods: {
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
      this.$refs.enterprisesignindetail.showDrawer(record)
    },
    handleCancel(e) {
      this.visible = false
    },
    dataRefreh() {
      let that = this
      if (this.timer != null) {
        return
      }
      this.timer = setInterval(() => {
        that.loadData()
      }, 10000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then((res) => {
        that.jobfairdata = res.result.records
        that.queryParam.jobFairId = res.result.records[0].id
        // that.getEntryenterpriseList(that.queryParam.jobFairId)
        that.loadData()
      })
    },
    onChangeDate(date, dateString) {
      this.queryParam.signTime = dateString
    },
    getEntryenterpriseList(value) {
      let that = this
      getAction(that.url.entryenterprise, { jobfairId: value }).then((res) => {
        that.entryenterprise = res.result.records
        that.loadData()
        //  that.queryParam.enterpriseid=res.result.records[0].enterpriseid
      })
    },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.getJobfairList()
      that.queryParam.enterpriseInfoName = ''
      that.queryParam.signStatus = ''
      that.queryParam.signTime = ''
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