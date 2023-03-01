<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <!-- <a-row :gutter="12">
          <a-col :md="18" :sm="8" :push="2">
            <a-form-item
              label="招聘会名称2"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 14, offset: 1 }"
            >
              <a-select v-model="queryParam.jobfairId" style="margin-left: -3%;">
                <a-select-option v-for="d in jobfairdata" :key="d.id" :value="d.id">{{ d.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> 
        </a-row> -->
        <a-row :gutter="12">
          <a-col :md="10" :sm="8" :push="2">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.enterpriseName"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="10" :sm="8" :push="2">
            <a-form-item label="联系电话　" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.phone"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="联系电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder="请输入联系电话" v-model="queryParam.phone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
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
      <!-- 操作按钮区域 -->
      <div class="table-operator" style="border-top: 5px">
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="delete" @click="batchDel" />大屏展示
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="delete" @click="batchDel" />删除
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="delete" @click="batchDel" />取消大屏展示
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
          <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
          <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
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
        @change="handleTableChange"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">
            <a-icon type="file-search" />编辑岗位
          </a>
          <a-divider type="vertical" />
          <a @click="detail(record)">
            <a-icon type="setting" />审核
          </a>
          
        </span>
        <span slot="examinestatetext" slot-scope="text, record">
          {{
          record.examinestate == 1 ? '通过' : record.examinestate == -1 ? '不通过' : '待审核'
          }}
        </span>
      </a-table>
      </div>
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
    <!-- <enterprise-info ref="enterpriseinfo"></enterprise-info> -->
    <examine-item-list ref="examineForm" @ok="modalFormOk"></examine-item-list>
    <invitation-job ref="stafflist" @ok="modalFormOk" />
  </a-card>
</template>

<script>
import InvitationJob from './modules/Staffinfo'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import store from '@/store'
import { jobfairList,audpostList } from '@/api/api'
import JInput from '@/components/jeecg/JInput'
import ExamineItemList from './modules/Examineform'
// import EnterpriseInfo from './EnterpriseInfo'
import AddModal from './modules/ApprovedModel'
import Vue from 'vue'
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  props: {
    enterprisetype: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  components: { ExamineItemList, AddModal, JInput, InvitationJob },
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
        enterprisetype: this.enterprisetype
      },
      examinestate: '1',
      jobfairdata: [],
      // entryenterprise: [],
      joblistparams: {},
      // 表头
      columns: [
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
          width: 250
        },
        {
          title: '岗位',
          align: 'center',
          dataIndex: 'postName',
          width: 200
        },
        {
          title: '需求人数',
          align: 'center',
          dataIndex: 'recruitment',
          width: 100
        },

        {
          title: '薪资待遇',
          align: 'center',
          dataIndex: 'salary',
          width: 130
        },
        {
          title: '学历要求',
          align: 'center',
          dataIndex: 'educationRequirements',
          width: 100
        },
        {
          title: '年龄要求',
          align: 'center',
          dataIndex: 'ageRequirement',
          width: 80
        },
        {
          title: '性别要求',
          align: 'center',
          dataIndex: 'genderRequirement',
          width: 80
        },
        {
            title: '原因描述',
            align: 'center',
            dataIndex: 'errorReason',
            // width: 80
          },
        // {
        //   title: '错误信息',
        //   align: 'center',
        //   dataIndex: 'errorReason',
        //   scopedSlots: { customRender: 'examinestatetext' },
        //   customCell: this.tofontcolor
        // },
        // {
        //   title: '批次号',
        //   align: 'center',
        //   dataIndex: 'batch',
        //   width: 150
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          width: 250
        }
      ],
      timeis: '',
      dict: '',
      signid: '',
      enterpriseInfoId: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 }
      },
      url: {
        list: '/hall/position/queryexaminejobenterprise?examinestate=-1',
        enable: '/hall/curriculumvitae/enable',
        jobfairdata: '/hall/jobfair/list?isexisting=0',
        examine: '/hall/position/examineall'
      }
    }
  },
  computed: {},
  created() {
    this.getJobfairList()
  },
  methods: {
    //错误字体颜色修改
    tofontcolor(){
        return {
        style: {
          'color': 'blue',
        },
      }
    },
    loadData(queryParam) {
      // if (arg === 1) {
      //   this.ipagination.current = 1
      // }
      let params = this.getQueryParams() //查询条件
      console.log('审核查询条件')
      console.log(params)
       params.displaysign = -1
      //  var logoAddressUrl='http://120.79.207.87:8091';
      audpostList(params).then(res => {
        if (res.success) {
          console.log('列表数据', res.result.records)
          for (var i = 0; i < res.result.records.length; ++i) {
            res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '审核通过' : '审核未通过'
            // res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'
            res.result.records[i].displaySign = res.result.records[i].displaySign == 1 ? '展示' : ''
          }
          this.dataSource = res.result.records
          // this.ipagination.total = res.result.total
        }
      })
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        console.log("大屏展示");
      }else if(e.key == 2){
        this.batchDel()
      }else if(e.key == 3){
        console.log("取消大屏展示");
      }
    },
    // 复选框选中
    onSelectChange(electedRowKeys, selectedRows) {
      this.delelist = selectedRows
      this.selectedRowKeys = electedRowKeys
      console.log(this.delelist)
      // this.ids = this.selectedRowKeys
    },
    //删除
    batchDel() {
      // console.log(this.delelist)
      for (var i = 0; i < this.delelist.length; i++) {
        this.axios({
          method: 'delete',
          url: '/hall/enterprise/EnterpriseTemporarydelete',
          headers: {},
          params: { id: this.delelist[i].id, isimport: this.delelist[i].isimport }
        })
          .then(response => {
            console.log(response)
            this.loadData()
            this.$message.success('删除成功！')
            this.selectedRowKeys = []
          })
          .catch(function(error) {
            this.$message.success('删除失败:', error)
            console.log(error)
          })
      }
    },
    unexconfirm(reId) {
      let that = this
      console.log('审核id', reId)
      getAction(that.url.examine, {
        examinestate: -1,
        UpdateBy: store.getters.userInfo.username,
        enterpriseInfoId: reId.enterpriseid,
        jobFairId: reId.jobfairid
      }).then(res => {
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '审核成功'
          })
          this.examinevisible = false
          that.loadData()
        } else {
          that.$notification['error']({
            message: '通知',
            duration: 2,
            description: res.message
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
        jobFairId: reId.jobfairid
      }).then(res => {
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '审核成功'
          })
          this.examinevisible = false
          that.loadData()
        } else {
          that.$notification['error']({
            message: '通知',
            duration: 2,
            description: res.message
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
    detail(resobj) {
      this.$refs.examineForm.edit(resobj)
      // if (resobj.iserror == 0 || resobj.errorReason =="该企业岗位已存在") {
      //   this.$refs.examineForm.edit(resobj)
      // } else if (resobj.iserror == 1 && resobj.errorReason !="该企业岗位已存在") {
      //   this.$notification['warning']({
      //     message: '不能审核',
      //     description: resobj.errorReason
      //   })
      //   // this.$message.warning(resobj.errorReason);
      // }
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
      }, 10000)
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
      getAction(that.url.examine, { examinestate: that.examinestate, id: that.signid }).then(res => {
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '审核成功'
          })
          this.examinevisible = false
          that.loadData()
        } else {
          that.$notification['error']({
            message: '通知',
            duration: 2,
            description: res.message
          })
          this.examinevisible = false
        }
      })
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then(res => {
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
      that.queryParam.enterprisetype = that.enterprisetype
      that.queryParam.phone = ''
      that.loadData(this.ipagination.current)
    }
  },
  mounted() {
    this.dataRefreh()
  },
  destroyed() {
    this.clearTimer()
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>