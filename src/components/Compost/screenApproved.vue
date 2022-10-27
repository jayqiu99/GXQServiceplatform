<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="11" :sm="8" :push="2">
            <a-form-item
              label="招聘会名称"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 14, offset: 1 }"
            >
              <a-select v-model="queryParam.jobfairid" style="margin-left: -3%">
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in jobfairdata" :key="d.id" :value="d.id">{{ d.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="8" :push="3">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.enterpriseName"></a-input>
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
        <!-- <a-row :gutter="12">
          <a-col :md="10" :sm="8" :push="2">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.enterpriseName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="8" :push="2">
            <a-form-item label="联系电话　" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.phone"></a-input>
            </a-form-item>
        </a-col>-->
        <!-- <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="审核状态" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.examinestate">
                <a-select-option value>请选择</a-select-option>
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
        </a-row>-->
      </a-form>
      <!-- 操作按钮区域 -->
      <div class="table-operator" style="border-top: 5px; line-height: 40px">
        <!-- <a-button @click="handleAdd" type="primary" icon="plus">添加岗位</a-button> -->
        <a-button @click="handleToCancel" type="primary" icon="delete">取消大屏展示</a-button>
        <a-button @click="open" type="primary" icon="eye">大屏预览</a-button>
        <a-button @click="opdialogFormVisible" type="primary" icon="highlight">更改大屏字体</a-button>
        <FunctionOutlined />
        <div style="display: inline-block; width: 1000px; margin-left: 50px">
          大屏展示标题：
          <a-select style="width: 150px" @change="getValue" v-model="jobName">
            <a-select-option value="-1">当前招聘会标题</a-select-option>
            <a-select-option value="1">自定义标题</a-select-option>
          </a-select>
          <div style="display: inline-block" v-if="show">
            <a-input style="width: 500px; margin-left: 8px" placeholder v-model="customtitle"></a-input>
            <a-button
              type="primary"
              @click="AddReset"
              icon="reload"
              style="margin-left: 10px; display: inline-block"
            >保存标题</a-button>
          </div>
        </div>
        <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="delete" @click="batchDel" />大屏展示
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="delete" @click="batchDel" />删除
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="delete" @click="batchDel" />改变招聘会
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>-->
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
              <a-icon type="file-search" />查看岗位
            </a>
            <!-- <a-divider type="vertical" />
          <a @click="detail(record)">
            <a-icon type="setting" />审核
            </a>-->
          </span>
          <!-- <span slot="examinestatetext" slot-scope="text, record">
            {{ record.examinestate == 1 ? '通过' : record.examinestate == -1 ? '不通过' : '待审核' }}
          </span>-->
        </a-table>
      </div>
      <!-- <a-modal
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
      </a-modal>-->
    </div>
    <add-modal ref="modalForm" @ok="modalFormOk"></add-modal>
    <enterprise-info ref="enterpriseinfo"></enterprise-info>
    <invitation-job ref="stafflist" @ok="modalFormOk" />
    <el-dialog
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      title="室外大屏预览"
      :visible.sync="dialogVisible"
      top="50px"
      ref="element"
      fullscreen
      center
      width="100%"
    >
      <!-- fullscreen="true"
      center="true"-->
      <iframe style="width: 100%;height: 900px;" :src="bigswurl"></iframe>
    </el-dialog>

    <!-- 修改字体 -->
    <el-dialog title="修改大屏字体" width="500px" center :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-divider>头部标题默认字体为30px</el-divider>
        <el-form-item label="头部标题字体：" label-width="120px">
          <el-input
            width="60%"
            type="number"
            min="1"
            @mousewheel.native.prevent
            v-model="form.Btfontsize"
            @keyup.native="prevent($event)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-divider>企业信息默认字体为19px</el-divider>
        <el-form-item label="企业信息字体：" label-width="120px">
          <el-input
            width="60%"
            type="number"
            min="1"
            @mousewheel.native.prevent
            v-model="form.entfontsize"
            @keyup.native="prevent($event)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-divider>企业简介默认字体为18px</el-divider>
        <el-form-item label="企业简介字体：" label-width="120px">
          <el-input
            width="60%"
            type="number"
            min="1"
            @mousewheel.native.prevent
            v-model="form.entjjfontsize"
            @keyup.native="prevent($event)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-divider>岗位列表默认字体为18px</el-divider>
        <el-form-item label="岗位列表字体：" label-width="120px">
          <el-input
            width="60%"
            type="number"
            min="1"
            @mousewheel.native.prevent
            v-model="form.postfontsize"
            @keyup.native="prevent($event)"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fontsizeclick">确 定</el-button>
      </div>
    </el-dialog>
  </a-card>
</template>

<script>
import InvitationJob from './modules/Staffinfo'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import store from '@/store'
import { jobfairList, getpostList, getpostList2 } from '@/api/api'
import JInput from '@/components/jeecg/JInput'
import EnterpriseInfo from './EnterpriseInfo'
import AddModal from './modules/screenSeePosition'
import Vue from 'vue'
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { EnterpriseInfo, AddModal, JInput, InvitationJob },
  data() {
    return {
      customtitle: '',
      show: false,
      dialogFormVisible: false,
      form: {
        Btfontsize: '',
        entfontsize: '',
        entjjfontsize: '',
        postfontsize: ''
      },
      visible: false,
      confirmLoading: false,
      examinevisible: false,
      timer: null,
      statelable: '启用',
      // 查询条件
      queryParam: {
        jobfairid: '',
        enterpriseName: ''
        //examinestate: '',
        //phone: '',
      },
      jobName: '',
      //examinestate: '1',
      jobfairdata: [],
      // entryenterprise: [],
      joblistparams: {},
      // 表头
      columns: [
        {
          title: '招聘会名称',
          align: 'center',
          dataIndex: 'jobFairName'
        },
        {
          title: '报名企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
          width: 250
        },
        {
          title: '岗位数量',
          align: 'center',
          dataIndex: 'sumPost',
          width: 150
        },
        {
          title: '需求人数',
          align: 'center',
          dataIndex: 'sumRecruitment',
          width: 150
        },
        // {
        //   title: '大屏展示',
        //   align: 'center',
        //   dataIndex: 'displaySign',
        //   customCell:this.tofontcolor,
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
          width: 150
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
      messagecode: 'success',
      mestype: '',
      mestext: '',
      dialogVisible: false,
      bigswurl: '',
      loading: true,
      url: {
        list: '/hall/position/querybigjobenterprise',
        enable: '/hall/curriculumvitae/enable',
        jobfairdata: '/hall/jobfair/list?pageSize=1000', //?isexisting=0
        examine: '/hall/position/examineall',
        getTitle: 'hall/position/bigsettitle',
        deleteEnterprise: 'hall/position/bigdisplaysettings',
        getJobFairName: '/hall/position/querybigjobfairname'
      }
    }
  },
  computed: {},
  created() {
    this.getJobfairList()
  },
  methods: {
    fontsizeList() {
      this.axios({
        method: 'get',
        url: '/hall/position/getbigsetfont',
        headers: {},
        params: {}
      })
        .then(response => {
          console.log('大屏字体', response.result)
          this.form.Btfontsize = response.result.titleFont
          this.form.entfontsize = response.result.infoFont
          this.form.entjjfontsize = response.result.synopsisFont
          this.form.postfontsize = response.result.jobFont
        })
        .catch(function(error) {
          // this.$message.success('删除失败:', error)
          console.log(error)
        })
    },
    fontsizeSet_up() {},
    fontsizeclick() {
      // console.log('修改字体对象', this.form)
      this.axios({
        method: 'get',
        url: '/hall/position/bigsetfont',
        headers: {},
        params: {
          infoFont: this.form.entfontsize,
          jobFont: this.form.postfontsize,
          synopsisFont: this.form.entjjfontsize,
          titleFont: this.form.Btfontsize
        }
      })
        .then(response => {
          // console.log('大屏字体', response)
          this.$message.success(response.message)
          this.dialogFormVisible = false;
        })
        .catch(function(error) {
          // this.$message.success('删除失败:', error)
          console.log(error)
        })
    },
    opdialogFormVisible() {
      this.fontsizeList()
      this.dialogFormVisible = true
    },
    //控制字体输入为正整数
    prevent(e) {
      var keynum = window.event ? e.keyCode : e.which //获取键盘码
      if (keynum == 189 || keynum == 190 || keynum == 109 || keynum == 110) {
        this.$message.warning('禁止输入小数以及负数')
        e.target.value = ''
      }
    },
    open() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 6000)
      this.bigswurl = 'http://10.188.188.101:9000/Trying.html'
      this.dialogVisible = true
    },
    // loadData(queryParam) {
    //   // if (arg === 1) {
    //   //   this.ipagination.current = 1
    //   // }
    //   let params = this.getQueryParams() //查询条件
    //   console.log('审核查询条件111')
    //   console.log(params)
    //   //  var logoAddressUrl='http://120.79.207.87:8091';
    //   getpostList2(params).then((res) => {
    //     console.log('列表数据', res)
    //     if (res.success) {
    //       console.log('列表数据', res.result.records)
    //       //for (var i = 0; i < res.result.records.length; ++i) {
    //         // res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '审核通过' : '审核未通过'
    //         // res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'
    //         //res.result.records[i].displaySign = res.result.records[i].displaySign == 1 ? '展示' : ''
    //       //}
    //       this.dataSource = res.result.records
    //       this.ipagination.total = res.result.total
    //     }
    //   })
    // },
    handleToCancel: function(e) {
      var that = this
      var list = this.selectedRowKeys
      var i = list.length
      console.log('iIIIII', i)
      var enterpriseinfo = ''
      var jobfair = ''
      //console.log("真正的list",list);
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          enterpriseinfo = ''
          jobfair = ''
          var list2 = list[j].split(';')
          console.log(j, list2)
          enterpriseinfo = list2[1]
          jobfair = list2[0]
          getAction(that.url.deleteEnterprise, {
            displaysign: 0,
            enterpriseinfoid: enterpriseinfo,
            jobfairid: jobfair
          }).then(res => {
            console.log('jjjjjjjjj', res)
            this.messagecode = res.success

            if (!this.messagecode) {
              that.mestype = 'error'
              that.mestext = res.message
              return
            } else {
              that.mestext = res.message
            }
          })
        }
        if (that.mestype == 'error') {
          that.$notification['error']({
            message: '通知',
            description: that.mestext
          })
          this.searchQuery()
        } else {
          that.$notification['success']({
            message: '通知',
            description: '成功'
          })
          this.searchQuery()
        }
      }
    },
    getValue: function(e) {
      var i = 1
      if (e == -1) {
        this.show = false
        i = 1
        this.getTitleName(i)
      } else {
        this.show = true
        i = 2
      }
    },
    AddReset(i) {
      var i = 2
      this.getTitleName(i)
    },
    getTitleName(i) {
      var that = this
      var title = ''
      if (i == 1) {
        title = ''
      } else {
        title = this.customtitle
      }
      getAction(that.url.getTitle, {
        iscustomtitle: i,
        customtitle: title
      }).then(res => {
        //console.log('标题', res)
        if (res.code == 200) {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '修改成功'
          })
        } else {
          that.$notification['success']({
            message: '通知',
            duration: 2,
            description: '修改失败'
          })
        }
      })
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        //console.log('大屏展示')
      } else if (e.key == 2) {
        this.batchDel()
      } else if (e.key == 3) {
        //console.log('改变招聘会')
      }
    },
    // 复选框选中
    onSelectChange(electedRowKeys, selectedRows) {
      this.delelist = selectedRows
      this.selectedRowKeys = electedRowKeys
      // console.log("多选框",this.delelist)
      // console.log("多选框2",this.selectedRowKeys)
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
            //console.log(response)
            this.loadData()
            this.$message.success('删除成功！')
            this.selectedRowKeys = []
          })
          .catch(function(error) {
            this.$message.success('删除失败:', error)
            //console.log(error)
          })
      }
    },
    // unexconfirm(reId) {
    //   let that = this
    //   console.log('审核id', reId)
    //   getAction(that.url.examine, {
    //     examinestate: -1,
    //     UpdateBy: store.getters.userInfo.username,
    //     enterpriseInfoId: reId.enterpriseid,
    //     jobFairId: reId.jobfairid,
    //   }).then((res) => {
    //     if (res.code == 200) {
    //       that.$notification['success']({
    //         message: '通知',
    //         duration: 2,
    //         description: '审核成功',
    //       })
    //       this.examinevisible = false
    //       that.loadData()
    //     } else {
    //       that.$notification['error']({
    //         message: '通知',
    //         duration: 2,
    //         description: res.message,
    //       })
    //       this.examinevisible = false
    //     }
    //   })
    // },
    // exconfirm(reId) {
    //   let that = this
    //   console.log('审核id', reId)

    //   getAction(that.url.examine, {
    //     examinestate: 1,
    //     UpdateBy: store.getters.userInfo.username,
    //     enterpriseInfoId: reId.enterpriseid,
    //     jobFairId: reId.jobfairid,
    //   }).then((res) => {
    //     if (res.code == 200) {
    //       that.$notification['success']({
    //         message: '通知',
    //         duration: 2,
    //         description: '审核成功',
    //       })
    //       this.examinevisible = false
    //       that.loadData()
    //     } else {
    //       that.$notification['error']({
    //         message: '通知',
    //         duration: 2,
    //         description: res.message,
    //       })
    //       this.examinevisible = false
    //     }
    //   })
    // },
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
      this.joblistparams.id = record.jobfairid
      jobfairList(this.joblistparams).then(res => {
        if (res.success) {
          this.timeis = res.result.records[0].holdingtimeOverdue
          //log('panduan1', this.timeis)
          if (this.timeis == -1) {
            this.$notification['warning']({
              message: '通知',
              duration: 2,
              description: '招聘会已过期，无法进行审核！'
            })
            this.timeis = ''
          } else {
            this.$refs.enterpriseinfo.showDrawer(record)
          }
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
    getJobFairName() {
      var that = this
      getAction(that.url.getJobFairName).then(res => {
        console.log('标题', res)
        var value = res.result.iscustomtitle
        var name = res.result.jobFairName
        if (value == 2) {
          that.show = true
          that.customtitle = name
          that.jobName = '自定义标题'
        } else {
          that.show = false
          that.customtitle = ''
          that.jobName = '当场招聘会标题'
        }
      })
    },
    //审核
    examine(record) {
      this.signid = record.id
      this.enterpriseInfoId = record.enterpriseid
      this.examinevisible = true
    },
    // handleOk() {
    //   let that = this
    //   getAction(that.url.examine, { examinestate: that.examinestate, id: that.signid }).then((res) => {
    //     if (res.code == 200) {
    //       that.$notification['success']({
    //         message: '通知',
    //         duration: 2,
    //         description: '审核成功',
    //       })
    //       this.examinevisible = false
    //       that.loadData()
    //     } else {
    //       that.$notification['error']({
    //         message: '通知',
    //         duration: 2,
    //         description: res.message,
    //       })
    //       this.examinevisible = false
    //     }
    //   })
    // },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then(res => {
        //console.log("123333",res)
        //that.queryParam.jobfairid = res.result.records[0].id
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
      //that.queryParam.examinestate = ''
      //that.queryParam.phone = ''
      that.loadData(this.ipagination.current)
    }
  },
  mounted() {
    this.dataRefreh()
    this.getJobFairName()
  },
  destroyed() {
    this.clearTimer()
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
.el-divider__text {
  position: absolute;
  background-color: #fff;
  padding: 0 20px;
  color: red;
}
</style>
<style>
</style>