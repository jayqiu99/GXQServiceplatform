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
              <!-- <a-select v-model="queryParam.enterpriseInfoId">
                <a-select-option
                  v-for="d in entryenterprise"
                  :key="d.enterpriseid"
                  :value="d.enterpriseid"
                >{{d.enterpriseName}}</a-select-option>
              </a-select> -->
               <a-input placeholder v-model="queryParam.enterpriseInfoName"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="　Ipad编号" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-input placeholder v-model="queryParam.ipadCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="借用状态" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-select v-model="queryParam.borrowState" style="width:100%">
                <a-select-option value>请选择</a-select-option>
                 <!-- <a-select-option value="0">无</a-select-option> -->
                <a-select-option value="-1">归还</a-select-option>
                <a-select-option value="1">借用</a-select-option>
              </a-select>
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
              <a-button type="primary" @click="handleAdd" icon="plus" style="margin-left: 8px">新增</a-button>
              <a-button type="primary" @click="batchDel" icon="delete" style="margin-left: 8px">删除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
          <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <a-table
          ref="table"
          bordered
          rowKey="id"
          size="middle"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange"
        >
          <span
            slot="borrowstatetext"
            slot-scope="text, record"
          >{{record.borrowState==1?"借用":record.borrowState==0?"无":"归还"}}</span>
          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)">编辑修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </div>
    <ipad-borrow-modal ref="modalForm" @ok="modalFormOk"></ipad-borrow-modal>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import IpadBorrowModal from './modules/IpadBorrowModal'
import Vue from 'vue'

export default {
  name: 'IpadBorrowList',
  mixins: [JeecgListMixin],
  components: { IpadBorrowModal },
  data() {
    return {
      statelable: '启用',
      // 查询条件
      queryParam: {
        jobFairId: '',
        enterpriseInfoName: '',
        ipadCode: '',
        borrowState: '',
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
          title: 'Ipad编号',
          align: 'center',
          dataIndex: 'ipadCode',
          width: 150,
        },
        {
          title: '借用状态',
          align: 'center',
          dataIndex: 'borrowState',
          width: 80,
          scopedSlots: { customRender: 'borrowstatetext' },
        },
        {
          title: '借用时间',
          align: 'center',
          dataIndex: 'borrowingTime',
          width: 150,
        },
        {
          title: '归还时间',
          align: 'center',
          dataIndex: 'returnTime',
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
      timer: null,
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      selectedRowKeys: [],
      url: {
        list: '/hall/tabletpc/list',
        enable: '/hall/curriculumvitae/enable',
        delete: '/hall/tabletpc/delete',
        deleteBatch: '1',
        jobfairdata: '/hall/jobfair/list',
        entryenterprise: '/hall/entryenterprise/list',
      },
    }
  },
  computed: {},
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
      this.$refs.ipadborrowdetail.showDrawer(record)
    },
    onClearSelected() {
      this.selectedRowKeys = []
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then((res) => {
        that.jobfairdata = res.result.records
        //that.queryParam.jobFairId = res.result.records[0].id
         that.jobfairdata.unshift({ id: '', name: '请选择' })
        that.getEntryenterpriseList(that.queryParam.jobFairId)
        that.loadData()
      })
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
    getEntryenterpriseList(value) {
      let that = this
      getAction(that.url.entryenterprise, { jobfairId: value }).then((res) => {
        that.entryenterprise = res.result.records
        //that.queryParam.enterpriseid=res.result.records[0].enterpriseid
        that.loadData()
      })
    },
    //状态确认框
    confirm(record) {
      let that = this
      console.log(record)
      let enable = 1
      let content = ''
      if (record.enable == 1) {
        enable = -1
        content = '确认要把状态改为禁用吗？'
      } else {
        enable = 1
        content = '确认要把状态改为启用吗？'
      }
      this.$confirm({
        title: 'Info',
        content: content,
        okText: '确认',
        cancelText: '取消',
        onOk() {
          getAction(that.url.enable, { id: record.id, enable: enable }).then((res) => {
            that.loadData()
            that.$notification['success']({
              message: '通知',
              duration: 2,
              description: '修改成功',
            })
          })
        },
        onCancel() {
          that.$notification['info']({
            message: '通知',
            duration: 2,
            description: '已取消',
          })
        },
      })
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.jobFairId=''
     // that.getJobfairList()
      that.queryParam.enterpriseInfoName = ''
      that.queryParam.ipadCode = ''
      that.queryParam.borrowState = ''
      that.loadData(this.ipagination.current)
    },
  },
  created() {
    this.getJobfairList()
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