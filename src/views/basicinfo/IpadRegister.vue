<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="平板编号" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-input placeholder v-model="queryParam.ipadCode"></a-input>
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
       <div class="table-operator" style="border-top: 5px;margin-left:5%">
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </div>
      <div>
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
         <span
            slot="borrowstatetext"
            slot-scope="text, record"
          >{{record.borrow_state==0?"未借用":"借用"}}</span>
          <span
            slot="isdamagetetext"
            slot-scope="text, record"
          >{{record.isdamage==1?"正常":"损坏"}}</span>
          <span slot="action" slot-scope="text, record">
                 <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
              <a>删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
         <a @click="qrcodeshow(record)">二维码查看</a>
         <a-divider type="vertical" />
         <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="record.isdamage=='-1'">
                <a-popconfirm title="确定要标记正常吗?" @confirm="() => handleEnable(record.id)">
                  <a>正常</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.isdamage=='1'">
                <a-popconfirm title="确定要标记损坏吗?" @confirm="() => handleDisable(record.id)">
                  <a>损坏</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          </span>
        </a-table>
      </div>
    </div>
     <ipad-register-add-modal ref="modalForm" @ok="modalFormOk"></ipad-register-add-modal>
     <qrcode-show ref="qrcodeshow"></qrcode-show>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import IpadRegisterAddModal from '../basicinfo/modules/IpadRegisterAddModal'
import QrcodeShow from '../basicinfo/modules/QrcodeShow'
import {ipadisdamage} from '@/api/api'
import Vue from 'vue'

export default {
  name: 'IpadRegister',
  mixins: [JeecgListMixin],
  components: { IpadRegisterAddModal,QrcodeShow },
  data() {
    return {
      // 查询条件
      queryParam: {
        ipadCode: '',
      },
      isipad:{},
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'rowIndex',
          width: 120,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '平板编号',
          align: 'center',
          dataIndex: 'ipadCode',
          width: 250,
        },
        {
          title: '借用状态',
          align: 'center',
          dataIndex: 'borrow_state',
          width: 250,
         scopedSlots: { customRender: 'borrowstatetext' },
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'isdamage',
          width: 250,
          scopedSlots: { customRender: 'isdamagetetext' },
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
      url: {
        list: '/base/ipadregister/list',
        delete: '/base/ipadregister/delete',
      },
    }
  },
  methods: {
    handleEnable(rest){
      console.log("ipad",rest);
      this.isipad.id=rest
      this.isipad.isdamage=1
      ipadisdamage(this.isipad).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              this.loadData()
            } else {
              this.$message.warning(res.message)
              this.loadData()
            }
          })
    },
    handleDisable(rest){
      console.log("ipad",rest);
      this.isipad.id=rest
      this.isipad.isdamage=-1
      ipadisdamage(this.isipad).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              this.loadData()
            } else {
              this.$message.warning(res.message)
              this.loadData()
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
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      params.name=params.ipadCode
      getAction(this.url.list,params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    qrcodeshow(record){
      console.log("ccccc",record);
        this.$refs.qrcodeshow.showmodal(record)
    },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.ipadCode = ''
      that.loadData(this.ipagination.current)
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>