<template>
  <a-modal
    :width="1000"
    :title="title"
    :visible="innerVisible"
    @cancel="handleCancel"
    cancelText="关闭"
    :okButtonProps="{style:{display:'none'}}"
  >
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="8" :sm="12">
            <a-form-item label="企业名称">
              <a-input placeholder="请输入企业名称" v-model="queryParam.enterpriseName"></a-input>
              <!-- <j-input placeholder="输入招聘会名称" v-model="queryParam.name"></j-input> -->
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="8">
            <a-form-item label="区域名称">
              <a-select v-model="queryParam.area">
                <a-select-option
                  v-for="d in areaoption"
                  :key="d.id"
                  :value="d.dataName"
                >{{d.dataName}}</a-select-option>
              </a-select>
              <!-- <a-select v-model="queryParam.holdingtimeStart" placeholder="请选择企业名称">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="1">企业1</a-select-option>
                <a-select-option value="2">企业2</a-select-option>
              </a-select>-->
            </a-form-item>
          </a-col>

          <!-- 
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="企业负责人">
                <a-input placeholder="请输入企业负责人" v-model="queryParam.realname"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              
              <a-form-item label="招聘会时间">
                <a-select v-model="queryParam.status" placeholder="请选择招聘会时间范围">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">1-2</a-select-option>
                  <a-select-option value="2">2-3</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="8">
              <a-form-item label="联系电话">
                <a-input placeholder="请输入联系电话" v-model="queryParam.phone"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="8">
              
              <a-form-item label="是否到场">
                <a-select v-model="queryParam.status" placeholder="请选择招聘会时间范围">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>-->

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-alert type="info" showIcon style="margin-bottom: 16px;">
      <template slot="message">
        <span>已选择</span>
        <a style="font-weight: 600;padding: 0 4px;">{{ selectedRowKeys.length }}</a>
        <span>项</span>
        <a-divider type="vertical" />
        <a-checkbox-group @change="oncheckbox">
          <a-checkbox value="A" :disabled="tdisabled">小程序通知</a-checkbox>
          <a-checkbox value="B">短信通知</a-checkbox>
        </a-checkbox-group>
        <template v-if="selectedRowKeys.length>0">
          <a-divider type="vertical" />
          <a @click="handleDeleteBatch">
            <a-icon type="export" />批量发送邀请
          </a>
        </template>
      </template>
    </a-alert>
    <div style="height:350px">
    <a-table
      ref="table"
      rowKey="id"
      size="middle"
      bordered
      :columns="columns"
      :loading="loading"
      :dataSource="dataSource"
      :pagination="ipagination"
      :scroll="{}"
      :rowSelection="{selectedRowKeys, onChange: handleTableSelectChange,getCheckboxProps: getCheckboxProps}"
    >
      <!-- 显示头像 -->
      <template slot="avatarslot" slot-scope="text, record, index">
        <div class="anty-img-wrap">
          <a-avatar shape="square" :src="url.getAvatar(record.avatar)" icon="user" />
        </div>
      </template>

      <span slot="action" slot-scope="text, record">
        <a @click="handleRevert([record.id])" v-if="record.invitationState=='未邀约'">
          <a-icon type="export" />发送邀请
        </a>
        <a @click="handleRevert([record.id])" disabled v-if="record.invitationState=='已邀约'">
          <a-icon type="export" />发送邀请
        </a>
        <!-- <a-divider type="vertical" />
        <a @click="handleDelete([record.id])">
          <a-icon type="delete" />彻底删除
        </a>-->
      </span>
    </a-table>
    </div>
  </a-modal>
</template>

<script>
import { putAction, deleteAction, getFileAccessHttpUrl, getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { filterObj } from '@/utils/util'
import { invitationjobfair,getenterpriseList } from '@/api/api'
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
      title: '企业邀请',
      tdisabled:false,
      ipagination: {
          current: 1,
          pageSize: 5,
          pageSizeOptions: ['5', '10', '20'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
      loading: false,
      chevalue: [],
      invitationdata: [],
      areaoption: [], //区域
      innerVisible: false,
      selectedRowKeys: [],
      invitationjobfairId: '',
      dataSource: [],
      columns: [
        { title: '#', align: 'center', key: 'rowIndex', width: 80, customRender: (t, r, i) => i + 1 },
        { title: '企业名称', align: 'center', dataIndex: 'enterpriseName' },
        { title: '区域', align: 'center', dataIndex: 'area' },
        { title: '是否已邀请', align: 'center', dataIndex: 'invitationState' },
        { title: '操作', align: 'center', dataIndex: 'action', width: 200, scopedSlots: { customRender: 'action' } },
      ],
      url: {
        getAvatar: (path) => getFileAccessHttpUrl(`${path}`),
        // 回收站操作，get = 获取列表；put = 取回；delete = 彻底删除
        recycleBin: '/sys/user/recycleBin',
        putRecycleBin: '/sys/user/putRecycleBin',
        deleteRecycleBin: '/sys/user/deleteRecycleBin',
        list: '/hall/enterprise/invitationlist?examinestate=1',
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

    getCheckboxProps(record) {
      console.log("行属性",record);
        return ({
        props: {
              disabled: record.invitationState === '已邀约',
            }
      })
     
    },
    edit(record) {
      console.log('弹出层', record)
      this.invitationjobfairId = record.id
      // this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      let that = this
      that.loadData()
      that.innerVisible = true
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
      params.jobFairId=this.invitationjobfairId;
      console.log(params)
      var logoAddressUrl = 'http://120.79.207.87:8091'
      getenterpriseList(params).then((res) => {
        if (res.success) {
          for (var i = 0; i < res.result.records.length; ++i) {
            res.result.records[i].invitationState = res.result.records[i].invitationState == 1 ? '已邀约' : '未邀约'
          }
          this.dataSource = res.result.records
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