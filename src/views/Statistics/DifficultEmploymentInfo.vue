<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="姓名" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.test"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="身份证号码" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.test"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="性别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.test" placeholder="请选择性别">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="1">男性</a-select-option>
                <a-select-option value="2">女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
            <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="失 业 天 数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.test"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
          <!-- <a-col :md="6" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col> -->
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1"> <a-icon type="delete" @click="batchDel" />删除 </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template slot="enable" slot-scope="text, record">
          <div class="anty-img-wrap">
            <span>
              <a-tag v-if="record.enable == '未启用'" color="red">未启用</a-tag>
              <a-tag v-if="record.enable == '已启用'" color="blue">已启用</a-tag>
            </span>
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑修改</a>
          <a-divider type="vertical" v-if="record.holdingtimeOverdue != -1" />
          <a-popconfirm title="确定删除吗?" v-if="record.holdingtimeOverdue != -1" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <add-modal ref="modalForm" @ok="modalFormOk"></add-modal>
    <user-recycle-bin-modal ref="modalFormlist" @ok="modalFormOk" />
    <invitation-job ref="invitationlist" @ok="modalFormOk" />
  </a-card>
</template>

<script>
import AddModal from './modules/AddPoverty'
import { filterObj } from '@/utils/util'
import { putAction, getFileAccessHttpUrl } from '@/api/manage'
// import { frozenBatch, jobfairList, jobenablecount, jobenable } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'
// import UserRecycleBinModal from './modules/BoothInfoModal'
// import InvitationJob from './modules/InvitationJob'

export default {
  name: 'UserList',
  mixins: [JeecgListMixin],
  components: {
    AddModal,
    JInput,
    // UserRecycleBinModal,
    // InvitationJob,
  },
  data() {
    return {
      isfalse: false,
      description: '',
      queryParam: {
        name: '',
        holdingtimeStart: '',
        holdingtimeEnd: '',
      },
      recycleBinVisible: false,
      enableParam: {
        id: '',
        enable: '',
      },
      dataSource: [],
      columns: [
        {
          title: '姓名',
          align: 'center',
          dataIndex: '',
          width: 30,
        },
        {
          title: '身份证号码',
          align: 'center',
          dataIndex: '',
          width: 120,
        },
        {
          title: '性别',
          align: 'center',
          width: 20,
          dataIndex: '',
        },
        {
          title: '最高学历',
          align: 'center',
          width: 60,
          dataIndex: '',
        },
        {
          title: '所属区县',
          align: 'center',
          width: 60,
          dataIndex: '',
        },
        {
          title: '失业天数',
          align: 'center',
          width: 40,
          dataIndex: '',
        },
        {
          title: '家庭情况',
          align: 'center',
          width: 60,
          dataIndex: '',
        },
        // {
        //   title: '参加工作年时间',
        //   align: 'center',
        //   width: 80,
        //   dataIndex: '',
        // },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   scopedSlots: { customRender: 'action' },
        //   align: 'center',
        //   width: 120,
        // },
      ],
      url: {
        // syncUser: '/process/extActProcess/doSyncUser',
        // list: '/sys/user/list',
        // delete: '/hall/jobfair/delete',
        // deleteBatch: '',
        // exportXlsUrl: '/sys/user/exportXls',
        // importExcelUrl: 'sys/user/importExcel',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    inEnterprise(record) {
      this.$refs.modalForminvitation.edit(record)
    },
    // handleEdit(record) {
    //   if (record.holdingtimeEnd < this.getNowFormatDate()) {
    //     this.$notification['warning']({
    //       message: '通知',
    //       duration: 2,
    //       description: '招聘会已过期，无法编辑！',
    //     })
    //   } else {
    //     this.$refs.modalForm.edit(record)
    //   }
    // },
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
    editDictItem(record) {
      if (record.enable == '未启用') {
        this.$message.warn('招聘会未启用，不能编辑展位')
      } else if (record.enable == '已启用') {
        this.$refs.modalFormlist.reset()
        this.$refs.modalFormlist.edit(record)
      }
    },
    invitationitem(record) {
      this.$refs.invitationlist.edit(record)
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件

      console.log('查询条件')
      console.log(params)
      jobfairList(params).then((res) => {
        if (res.success) {
          for (var i = 0; i < res.result.records.length; ++i) {
            res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'

            if (res.result.records[i].entrytimeStart != null) {
                let jentrytimeStart = res.result.records[i].entrytimeStart.substr(0, 16)
                let jentrytimeEnd = res.result.records[i].entrytimeEnd.substr(0, 16)

                res.result.records[i].entrytimeStart = jentrytimeStart + ' 至 ' + jentrytimeEnd
              }

              if (res.result.records[i].holdingtimeStart != null) {
                let jholdingtimeStart = res.result.records[i].holdingtimeStart.substr(0, 16)
                let jholdingtimeEnd = res.result.records[i].holdingtimeEnd.substr(0, 16)
                res.result.records[i].holdingtimeStart = jholdingtimeStart + ' 至 ' + jholdingtimeEnd
              }
            // let jentrytimeStart = res.result.records[i].entrytimeStart.substr(0, 16)
            // let jentrytimeEnd = res.result.records[i].entrytimeEnd.substr(0, 16)
            // res.result.records[i].entrytimeStart = jentrytimeStart + ' 至 ' + jentrytimeEnd
            // let jholdingtimeStart = res.result.records[i].holdingtimeStart.substr(0, 16)
            // let jholdingtimeEnd = res.result.records[i].holdingtimeEnd.substr(0, 16)
            // res.result.records[i].holdingtimeStart = jholdingtimeStart + ' 至 ' + jholdingtimeEnd
          }
          this.dataSource = res.result.records
          console.log('数据列表', this.dataSource)
          this.ipagination.total = res.result.total
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
    getAvatarView: function (avatar) {
      return getFileAccessHttpUrl(avatar)
    },
    //是否启用
    handleEnable(recdata) {
      if (recdata.holdingtimeEnd < this.getNowFormatDate()) {
        this.$notification['warning']({
          message: '通知',
          duration: 2,
          description: '招聘会已过期，无法启用！',
        })
      } else {
        const that = this
        console.log('启用' + recdata)
        that.enableParam.id = recdata.id
        that.enableParam.enable = 1

        let params = this.getQueryParams() //查询条件

        jobenablecount().then((res) => {
          if (res.result.records.length >= 1) {
            // console.log('res')
            // console.log(res.result.records.length)
            return that.$message.warning('已有招聘会启用，一次只能启用一个！')
          } else {
            jobenable(that.enableParam).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                this.loadData()
              } else {
                that.$message.warning(res.message)
                this.loadData()
              }
            })
          }
        })
      }
    },
    handleDisable(DisableId) {
      const that = this
      that.enableParam.id = DisableId
      that.enableParam.enable = -1
      jobenable(that.enableParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData()
        } else {
          that.$message.warning(res.message)
          this.loadData()
        }
      })
    },
    batchFrozen: function (status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return false
      } else {
        let ids = ''
        let that = this
        let isAdmin = false
        that.selectionRows.forEach(function (row) {
          if (row.username == 'admin') {
            isAdmin = true
          }
        })
        if (isAdmin) {
          that.$message.warning('管理员账号不允许此操作,请重新选择！')
          return
        }
        that.selectedRowKeys.forEach(function (val) {
          ids += val + ','
        })
        that.$confirm({
          title: '确认操作',
          content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
          onOk: function () {
            frozenBatch({ ids: ids, status: status }).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          },
        })
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      } else if (e.key == 2) {
        this.batchFrozen(2)
      } else if (e.key == 3) {
        this.batchFrozen(1)
      }
    },
    handleFrozen: function (id, status, username) {
      let that = this
      //TODO 后台校验管理员角色
      if ('admin' == username) {
        that.$message.warning('管理员账号不允许此操作！')
        return
      }
      frozenBatch({ ids: id, status: status }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username)
    },
    handleAgentSettings(username) {
      this.$refs.sysUserAgentModal.agentSettings(username)
      this.$refs.sysUserAgentModal.title = '用户代理人设置'
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>