<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <!-- <a-row :gutter="12">
          <a-col :md="14" :sm="8" :push="3">
            <a-form-item
              label="招聘会名称"
              :labelCol="{ span: 6 }"
              style="margin-left: -14px"
              :wrapperCol="{ span: 14, offset: 1 }"
            >
              <a-select v-model="queryParam.jobfairid" style="margin-left: -18px; width: 94%">
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in jobfairdata" :key="d.id" :value="d.id">{{ d.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row :gutter="12">
          <!-- <a-col :md="10" :sm="8" :push="2">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.enterpriseName"></a-input>
            </a-form-item>
          </a-col> -->
          <!-- <a-col :md="10" :sm="8" :push="2">
            <a-form-item label="联系电话　" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.phone"></a-input>
            </a-form-item>
          </a-col>-->
          <!-- <a-col :md="11" :sm="8" :push="3">
            <a-form-item label="大屏展示" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.displaySign">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="1">展示</a-select-option>
                <a-select-option value="0">不展示</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col :md="8" :sm="8" :push="3">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select
                    show-search
                    placeholder="输入企业名称"
                    option-filter-prop="children"
                    :options="listforlebel"
                    :filter-option="filterOptiont"
                    v-model="queryParam.enterpriseinfoid"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                  ></a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="8" :push="3">
            <a-form-item label="联系电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder="请输入联系电话" v-model="queryParam.phone"></a-input>
              <!-- <a-select v-model="queryParam.displaysign">
                <a-select-option value="-1">请选择</a-select-option>
                <a-select-option value="1">展示</a-select-option>
                <a-select-option value="0">不展示</a-select-option>
              </a-select> -->
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="8" :push="3">
            <span style="float: left; overflow: hidden; margin-left: 65px" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <!-- 操作按钮区域 -->
      <div class="table-operator" style="border-top: 5px">
        <a-button @click="toAddpostck" type="primary" icon="plus">添加岗位</a-button>
        <a-button type="primary" @click="exportFile"> 导出查询数据 </a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay" @click="handleMenuClick">
            <!-- <a-menu-item key="1"> <a-icon type="delete" @click="Largescreendisplay" />大屏展示 </a-menu-item>
            <a-menu-item key="3"> <a-icon type="delete" @click="cancelLargescreen" />取消大屏展示 </a-menu-item> -->
            <a-menu-item key="2"> <a-icon type="delete" @click="batchDel" />删除 </a-menu-item>
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
          <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
          >项&nbsp;&nbsp;
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <a-table
          ref="table"
          bordered 
          size="middle"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)"> <a-icon type="file-search" />编辑岗位 </a>
            <!-- <a-divider type="vertical" />
            <a @click="detail(record)"> <a-icon type="setting" />审核 </a> -->
            <a-divider type="vertical" />
            <a @click="Qypreview(record)"> <a-icon type="eye" />企业信息 </a>
            <!-- <a-divider type="vertical" v-if="record.displaySign=='展示'" />
            <a @click="Canceldisplay(record)" v-if="record.displaySign=='展示'"> <a-icon type="file-excel" />取消展示 </a> -->
          </span>
          <span slot="examinestatetext" slot-scope="text, record">
            {{ record.examinestate == 1 ? '通过' : record.examinestate == -1 ? '不通过' : '待审核' }}
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
    <enterprise-info ref="enterpriseinfo"></enterprise-info>
    <toadd-post ref="toaddpostref"></toadd-post>
    <invitation-job ref="stafflist" @ok="modalFormOk" />
    <!-- 企业预览 -->
    <to-qypreview ref="qypreview" @ok="modalFormOk" />
  </a-card>
</template>

<script>
import InvitationJob from './modules/Staffinfo'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import store from '@/store'
import { jobfairList, getpostList,isjudgejobFair } from '@/api/api'
import JInput from '@/components/jeecg/JInput'
import EnterpriseInfo from './EnterpriseInfo'
import AddModal from './modules/SeePosition'
import ToQypreview from './modules/ApprovededigMd.vue'
import ToaddPost from './modules/ApprovedModel'
import Vue from 'vue'
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { EnterpriseInfo, AddModal, JInput, InvitationJob,ToQypreview,ToaddPost },
  data() {
    return {
      listforlebel: [], //企业下拉
      visible: false,
      confirmLoading: false,
      examinevisible: false,
      timer: null,
      statelable: '启用',
      // 查询条件
      queryParam: {
        jobfairid: '',
        enterpriseinfoid:'',
        enterpriseName: '',
        displaysign: '',
        phone: '',
      },
      examinestate: '1',
      jobfairdata: [],
      // entryenterprise: [],
      joblistparams: {},
      // 表头
      columns: [
        // {
        //   title: '招聘会名称',
        //   align: 'center',
        //   dataIndex: 'jobFairName',
        // },
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
          // width: 450,
        },
        {
          title: '岗位数量',
          align: 'center',
          dataIndex: 'sumPost',
          width: 150,
        },
        {
          title: '需求人数',
          align: 'center',
          dataIndex: 'sumRecruitment',
          width: 150,
        },
        {
          title: '联系人',
          align: 'center',
          dataIndex: 'companyPrincipal',
          // width: 150,
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'phone',
          // width: 150,
        },
        // {
        //   title: '大屏展示',
        //   align: 'center',
        //   dataIndex: 'displaySign',
        //   customCell: this.tofontcolor,
        //   width: 150,
        // },
        // {
        //   title: '审核状态',
        //   align: 'center',
        //   dataIndex: 'examinestate',
        //   width: 150,
        //   scopedSlots: { customRender: 'examinestatetext' }
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          width: 300,
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
        entlist:'/hall/enterprise/listforlebel',
        list: '/hall/position/queryexaminejobenterprise?examinestate=1',
        enable: '/hall/curriculumvitae/enable',
        jobfairdata: '/hall/jobfair/list?pageSize=1000', //?isexisting=0
        examine: '/hall/position/examineall',
      },
    }
  },
  computed: {},
  created() {
    this.getJobfairList()
  },
  methods: {
    //企业下拉框
    getareaList() {
      let that = this
      getAction(that.url.entlist).then(res => {
        that.listforlebel = res.result
        that.loadData()
      })
    },
    //企业名称下拉
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOptiont(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    //错误字体颜色修改
    tofontcolor() {
      return {
        style: {
          color: 'blue',
        },
      }
    },
    loadData(queryParam) {
      // if (arg === 1) {
      //   this.ipagination.current = 1
      // }
      let params = this.getQueryParams() //查询条件
      console.log('审核查询条件')
      //console.log(params)
      if (params.displaysign == '请选择') {
        params.displaysign = -1
      }
      
      params.displaysign=-1;
      console.log('修改后条件', params)
      //  var logoAddressUrl='http://120.79.207.87:8091';
      getpostList(params).then((res) => {
        if (res.success) {
          console.log('列表数据', res.result.records)
          for (var i = 0; i < res.result.records.length; ++i) {
            // res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '审核通过' : '审核未通过'
            // res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'
            res.result.records[i].displaySign = res.result.records[i].displaySign == 1 ? '展示' : ''
          }
          this.dataSource = res.result.records
          // console.log('中条山', res.result.total)
          this.ipagination.total = res.result.total
        }
      })
    },
    toAddpostck(){
      this.$refs.toaddpostref.add()
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.Largescreendisplay()
      } else if (e.key == 2) {
        this.batchDel()
      } else if (e.key == 3) {
        this.cancelLargescreen()
      }
    },
    // 复选框选中
    onSelectChange(electedRowKeys, selectedRows) {
      this.delelist = selectedRows
      this.selectedRowKeys = electedRowKeys
      console.log(this.delelist)
      // this.ids = this.selectedRowKeys
    },
    //取消展示
    cancelLargescreen() {
      for (var i = 0; i < this.delelist.length; i++) {
        this.axios({
          method: 'get',
          url: '/hall/position/bigdisplaysettings',
          headers: {},
          params: {
            enterpriseinfoid: this.delelist[i].enterpriseInfoId,
            jobfairid: this.delelist[i].jobFairId,
            displaysign: -1,
          },
        })
          .then((response) => {
            console.log(response)

            this.selectedRowKeys = []
          })
          .catch(function (error) {
            this.$message.success('设置失败:', error)
            console.log(error)
          })
      }
      this.$message.success('取消设置成功！')
      this.loadData()
    },
    //大屏展示
    Largescreendisplay() {
      for (var i = 0; i < this.delelist.length; i++) {
        this.axios({
          method: 'get',
          url: '/hall/position/bigdisplaysettings',
          headers: {},
          params: {
            enterpriseinfoid: this.delelist[i].enterpriseInfoId,
            jobfairid: this.delelist[i].jobFairId,
            displaysign: 1,
          },
        })
          .then((response) => {
            if(response.code==200){
              this.loadData()
            }else if(response.code==400){
              this.$message.success(response.message)
              return;
            }
            console.log(response)
            this.loadData()

            this.selectedRowKeys = []
          })
          .catch(function (error) {
            this.$message.success('设置失败:', error)
            console.log(error)
          })
      }
      this.$message.success('设置成功！')
    },
    //删除
    batchDel() {
      // console.log(this.delelist)
      for (var i = 0; i < this.delelist.length; i++) {
        this.axios({
          method: 'delete',
          url: '/hall/enterprise/EnterpriseTemporarydelete',
          headers: {},
          params: { id: this.delelist[i].id, isimport: this.delelist[i].isimport },
        })
          .then((response) => {
            console.log(response)
            this.loadData()
            this.$message.success('删除成功！')
            this.selectedRowKeys = []
          })
          .catch(function (error) {
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
    Canceldisplay(res){
      console.log("取消大屏展示",res);
      this.axios({
          method: 'get',
          url: '/hall/position/bigdisplaysettings',
          headers: {},
          params: {
            enterpriseinfoid: res.enterpriseInfoId,
            jobfairid: res.jobFairId,
            displaysign: -1,
          },
        })
          .then((response) => {
            // console.log(response.message)
            this.$message.success(response.message)
            this.loadData()
            // this.selectedRowKeys = []
          })
          .catch(function (error) {
            this.$message.success('设置失败:', error)
            console.log(error)
          })
    },
    Qypreview(res){
      // console.log("预览企业信息",res);
      this.axios({
          method: 'get',
          url: '/hall/enterprise/list',
          headers: {},
          params: {
            id: res.enterpriseInfoId
          },
        })
          .then((response) => {
            // console.log("预览企业信息",response.result.records[0])
            this.$refs.qypreview.edit(response.result.records[0])
          })
          .catch(function (error) {
            console.log(error)
          })
      // this.$refs.qypreview.edit(this.exaupdata)
    },
    detail(record) {
      console.log("审核对象",record);
      this.joblistparams.id = record.jobFairId
      isjudgejobFair(this.joblistparams).then((res) => {
        console.log('是否过期', res)
        
          this.timeis = res.holdingtimeOverdue
          console.log('是否过期', res.result)
          if (this.timeis == -1) {
            this.$notification['warning']({
              message: '通知',
              duration: 2,
              description: '招聘会已过期，无法进行审核！',
            })
            this.timeis = ''
          } else {
            console.log("审核对象2222",record);
            this.$refs.enterpriseinfo.showDrawer(record)
          }
        
      })
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
        //that.queryParam.jobfairid = res.result.records[0].id
        // that.getEntryenterpriseList(that.queryParam.jobfairid)
        that.loadData()
      })
    },
    // getEntryenterpriseList(value) {
    //   let that = this
    //   getAction(that.url.list, { jobfairid: value }).then((res) => {
    //     that.entryenterprise = res.result.records
    //     that.loadData()
    //   })
    // },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.getJobfairList()
      that.queryParam.enterpriseName = ''
      that.queryParam.displaysign = ''
      //that.queryParam.phone = ''
      that.loadData(this.ipagination.current)
    },
    exportFile() {
      var that = this
      var jobfairid = that.queryParam.jobfairid
      var enterpriseName = that.queryParam.enterpriseName
      var displaysign = that.queryParam.displaysign
      if (displaysign == '请选择' || displaysign == '') {
        displaysign = -1
      }
      //var scale = that.queryParam.scale
      console.log('jobfairid', jobfairid)
      console.log('enterpriseName', enterpriseName)
      console.log('displaySign', displaysign)
      displaysign=0;
      this.$http({
        url:
          '/hall/position/exportXlsJob?displaysign=' +
          displaysign +
          '&enterpriseName=' +
          enterpriseName +
          '&jobfairid=' +
          jobfairid,
        method: 'get',
        responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
        headers: {
          'Content-Type': 'application/json',
        },
        // data: {
        //   area:area,
        //   name:name,
        //   scale:scale,
        //   trade:trade,
        // },
      })
        .then((res) => {
          //创建一个隐藏的a连接，
          const link = document.createElement('a')
          let blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=UTF-8' })
          link.style.display = 'none'
          //设置连接
          link.href = URL.createObjectURL(blob)
          link.download = '招聘会企业岗位信息表'
          document.body.appendChild(link)
          //模拟点击事件
          link.click()
          console.log('res', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    this.getareaList()
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