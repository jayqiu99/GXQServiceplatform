<template>
  <a-modal
    :width="1000"
    :title="title"
    :visible="innerVisible"
    @cancel="handleCancel"
    cancelText="关闭"
    :okButtonProps="{style:{display:'none'}}"
  >
    <!-- <a-alert type="info" showIcon style="margin-bottom: 16px;">
      <template slot="message">
        <span>已选择</span>
        <a style="font-weight: 600;padding: 0 4px;">{{ selectedRowKeys.length }}</a>
        <span>项</span>
        <a-divider type="vertical" />
        <a-checkbox-group @change="oncheckbox">
          <a-checkbox value="A">小程序通知</a-checkbox>
          <a-checkbox value="B">短信通知</a-checkbox>
        </a-checkbox-group>
        <template v-if="selectedRowKeys.length>0">
          <a-divider type="vertical" />
          <a @click="handleDeleteBatch">
            <a-icon type="export" />批量发送邀请
          </a>
        </template>
      </template>
    </a-alert>-->

    <a-table
      ref="table"
      rowKey="id"
      size="middle"
      bordered
      :columns="columns"
      :loading="loading"
      :scroll="{ y: 240 }"
      :dataSource="dataSource"
      :pagination="false"
    >
      <template slot="avatarslot" slot-scope="text, record, index">
        <div class="anty-img-wrap">
          <a-avatar shape="square" :src="url.getAvatar(record.avatar)" icon="user" />
        </div>
      </template>

      <span slot="action" slot-scope="text, record">
        <a-button v-if="record.role=='管理员'" icon="setting" type="primary" disabled>审核</a-button>

        <a-popconfirm
          title="确定要审核通过吗?"
          ok-text="通过"
          cancel-text="不通过"
          @cancel="() => unexconfirm(record)"
          @confirm="() => toexamine(record)"
        >
          <a-button v-if="record.role=='员工'" icon="setting" type="primary">审核</a-button>
        </a-popconfirm>
        <!-- <a v-if="record.role=='员工'" @click="handleRevert([record.id])">
          <a-icon type="setting" />审核2
        </a>-->
        <!-- <a-divider type="vertical" />
        <a @click="handleDelete([record.id])">
          <a-icon type="delete" />彻底删除
        </a>-->
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import { putAction, deleteAction, getFileAccessHttpUrl, getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { filterObj } from '@/utils/util'
import { invitationjobfair, getenterpriseList, staffList, poststaff, getaddticket, getcancelticket } from '@/api/api'
// 高度封装的请求，请使用 superRequest.call(this,{}) 的方式调用

export default {
  name: 'UserRecycleBinModal',
  mixins: [JeecgListMixin],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: '员工审核',
      loading: false,
      chevalue: [],
      ticketobj: {},
      restrecord: {},
      enterpriseid: '',
      invitationdata: [],
      areaoption: [], //区域
      innerVisible: false,
      selectedRowKeys: [],
      invitationjobfairId: '',
      dataSource: [],
      columns: [
        { title: '员工名称', align: 'center', dataIndex: 'name' },
        { title: '员工性别', align: 'center', dataIndex: 'gender' },
        { title: '审核状态', align: 'center', dataIndex: 'examinestate' },
        { title: '角色', align: 'center', dataIndex: 'role' },
        { title: '操作', align: 'center', dataIndex: 'action', width: 200, scopedSlots: { customRender: 'action' } },
      ],
      url: {
        getAvatar: (path) => getFileAccessHttpUrl(`${path}`),
        // 回收站操作，get = 获取列表；put = 取回；delete = 彻底删除
        recycleBin: '/sys/user/recycleBin',
        putRecycleBin: '/sys/user/putRecycleBin',
        deleteRecycleBin: '/sys/user/deleteRecycleBin',
        list: '/hall/enterprise/list?examinestate=1',
        arealist: '/base/list?type=area',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.loadData()
        }
        this.innerVisible = val
      },
    },
    innerVisible(val) {
      this.$emit('update:visible', val)
    },
  },
  mounted() {
    this.getareaList()
  },
  methods: {
    //审核
    toexamine(exobj) {
      let vm = this
      console.log('审核的员工', exobj)
      // vm.$message.success('审核通过！')
      exobj.examinestate = 1
      exobj.updateBy = store.getters.userInfo.username
      exobj.updateTime = this.getNowFormatDate()
      poststaff(exobj).then((res) => {
        if (res.success) {
          console.log('this.restrecord', this.restrecord)
          this.ticketobj.enterpriseInfoId = this.restrecord.enterpriseid
          this.ticketobj.role = 2
          this.ticketobj.staffManageId = exobj.id
          this.ticketobj.jobFairId = this.restrecord.jobfairid
          this.ticketobj.createBy = store.getters.userInfo.username
          this.ticketobj.createTime = this.getNowFormatDate()
          this.ticketobj.updateBy = store.getters.userInfo.username
          this.ticketobj.updateTime = this.getNowFormatDate()
          getaddticket(this.ticketobj).then((res) => {
            if (res.success) {
              // vm.$message.success(res.message)
            } else {
              that.$message.warning(res.message)
            }
          })
          vm.$message.success(res.message)
          vm.loadData();
        } else {
          vm.$message.warning(res.message)
          vm.loadData();
        }
      })
    },
    unexconfirm(exobj) {
      let vm = this
      console.log('审核的员工', exobj)
      // vm.$message.success('审核不通过！')
      exobj.examinestate = -1
      exobj.updateBy = store.getters.userInfo.username
      exobj.updateTime = this.getNowFormatDate()
      poststaff(exobj).then((res) => {
        if (res.success) {
          this.ticketobj.enterpriseInfoId = this.restrecord.enterpriseid
          this.ticketobj.role = 2
          this.ticketobj.staffManageId = exobj.id
          this.ticketobj.jobFairId = this.restrecord.jobfairid
          this.ticketobj.createBy = store.getters.userInfo.username
          this.ticketobj.createTime = this.getNowFormatDate()
          this.ticketobj.updateBy = store.getters.userInfo.username
          this.ticketobj.updateTime = this.getNowFormatDate()
          getcancelticket(this.ticketobj).then((res) => {
            if (res.success) {
              // vm.$message.success(res.message)
            } else {
              that.$message.warning(res.message)
            }
          })
          vm.$message.success(res.message)
          vm.loadData();
        } else {
          vm.$message.warning(res.message)
          vm.loadData();
        }
      })
    },
    edit(record) {
      console.log('弹出层', record)
      this.restrecord = record
      this.enterpriseid = record.enterpriseid
      this.invitationjobfairId = record.id
      // this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      let that = this
      that.loadData()
      that.innerVisible = true
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
    //短信和小程序通知
    oncheckbox(checkedValues) {
      console.log('checked = ', checkedValues)
    },
    //区域下拉框
    getareaList() {
      let that = this
      getAction(that.url.arealist).then((res) => {
        that.areaoption = res.result.records
      })
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      console.log('查询条件')
      params.jobFairId = this.invitationjobfairId
      console.log(params)
      params.role=''
      var logoAddressUrl = 'http://120.79.207.87:8091'
      staffList(params).then((res) => {
        if (res.success) {
          for (var i = 0; i < res.result.records.length; ++i) {
            res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '通过' : '不通过'
            res.result.records[i].role = res.result.records[i].role == 1 ? '管理员' : '员工'
          }
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      console.log("企业id",this.enterpriseid);
      param.enterpriseInfoId = this.enterpriseid
      param.pageNo = this.ipagination.current
      param.pageSize = 50
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    handleOk() {
      this.loadData()
      this.$emit('ok')
    },
    handleCancel() {
      this.innerVisible = false
    },
    // 还原用户
    handleRevert(enterId) {
      let that = this
      this.$confirm({
        title: '发送邀请',
        content: `您确定要邀请这 ${enterId.length} 个企业吗？`,
        centered: true,
        onOk: () => {
          console.log('邀请id', enterId[0])

          that.invitationdata[0] = {
            jobFairId: this.invitationjobfairId,
            enterpriseInfoId: enterId[0],
            createBy: store.getters.userInfo.username,
          }

          var invitationobj = {
            commonData: '',
            records: that.invitationdata,
          }
          console.log('邀请企业', invitationobj)
          invitationjobfair(invitationobj).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
            } else {
              that.$message.warning(res.message)
            }
          })
        },
      })
    },
    // 彻底删除用户
    // handleDelete(userIds) {
    //   this.$confirm({
    //     title: '批量发送邀请',
    //     content: (
    //       <div>
    //         <p>您确定要邀请这 {userIds.length} 个用户吗？</p>
    //         <p style="color:green;">注意：发送邀请后无法撤回，请谨慎操作！</p>
    //       </div>
    //     ),
    //     centered: true,
    //     onOk: () => {
    //       var that = this
    //       deleteAction(that.url.deleteRecycleBin, { userIds: userIds.join(',') }).then((res) => {
    //         if (res.success) {
    //           this.loadData()
    //           this.handleClearSelection()
    //           this.$message.success(`彻底删除 ${userIds.length} 个用户成功！`)
    //         } else {
    //           that.$message.warning(res.message)
    //         }
    //       })
    //     },
    //   })
    // },
    handleRevertBatch() {
      this.handleRevert(this.selectedRowKeys)
    },
    handleDeleteBatch() {
      let that = this

      for (var i = 0; i < this.selectedRowKeys.length; ++i) {
        // console.log("批量邀请招聘会id：",this.invitationjobfairId);
        // console.log("循环邀请id：",that.selectedRowKeys[i]);
        that.invitationdata[i] = {
          jobFairId: this.invitationjobfairId,
          enterpriseInfoId: that.selectedRowKeys[i],
          createBy: store.getters.userInfo.username,
        }
      }
      var invitationobj = {
        commonData: '',
        records: that.invitationdata,
      }
      // let jsonObj= JSON.stringify(invitationobj)
      // console.log('数组邀请序列化：', jsonObj)
      //  jsonObj=JSON.parse(jsonObj);
      that.$confirm({
        title: '确认邀请',
        content: '是否邀请选中' + this.selectedRowKeys.length + '个企业?',
        onOk: function () {
          invitationjobfair(invitationobj).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
            } else {
              that.$message.warning(res.message)
            }
          })
        },
      })
    },
    handleClearSelection() {
      this.handleTableSelectChange([], [])
    },
    handleTableSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
  },
}
</script>

<style lang="less" scoped></style>