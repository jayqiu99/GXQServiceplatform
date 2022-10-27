<template>
  <div>
    <el-dialog  :visible.sync="centerDialogVisible" width="70%" center>
      <template slot="title">
        <div style="color: #000; font-size: 25px; font-weight: 800">
          {{ enttitle}}
        </div>
        </template>
      <div style="height:700px">
        <el-card class="box-card" style="display: inline-block;float: left;margin-left: 1%;">
          <div slot="header" class="clearfix" style="font-size: 20px;height: 40px;color:#ACACAC">
            <span>未选企业</span>
            <el-form
              :inline="true"
              :model="formInline"
              style="float: right;"
              class="demo-form-inline"
            >
              <el-form-item label="企业名称">
                <el-input
                  placeholder="请输入企业名称"
                  style="width:320px"
                  v-model="formInline.enterpriseName"
                  clearable
                ></el-input>
                <!-- <el-input v-model="formInline.user" placeholder="请输入企业名称"></el-input> -->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="notsonSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <a-table
              ref="table"
              bordered
              rowKey="id"
              size="middle"
              :columns="columns"
              :dataSource="tableData"
              :pagination="tipagination"
              :loading="loading"
              @change="nothandleTableChange"
            >
              <span slot="action" slot-scope="text, record">
                <a @click="addentinfo(record)">
                  <a-icon type="plus" />添加
                </a>
              </span>
            </a-table>
          </div>
        </el-card>
        <el-card class="box-card" style="display: inline-block;margin-left: 4%;">
          <div slot="header" class="clearfix" style="font-size: 20px;height: 40px;color:#48BF5E">
            <span>已选企业</span>
            <el-form
              :inline="true"
              :model="queryParam"
              style="float: right;"
              class="demo-form-inline"
            >
              <el-form-item label="企业名称">
                <el-input
                  placeholder="请输入企业名称"
                  style="width:320px"
                  v-model="queryParam.enterpriseName"
                  clearable
                ></el-input>
                <!-- <el-input v-model="formInline.user" placeholder="请输入企业名称"></el-input> -->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="YonSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <a-table
              ref="table"
              bordered
              rowKey="id"
              size="middle"
              :columns="columns"
              :dataSource="righttableData"
              :pagination="rigipagination"
              :loading="loading"
              @change="sehandleTableChange"
            >
              <span slot="action" slot-scope="text, record">
                <a @click="deleentinfo(record)">
                  <a-icon type="delete" />删除
                </a>
              </span>
            </a-table>
          </div>
        </el-card>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button type="primary" @click="centerDialogVisible = false">关 闭</el-button> -->
          <!-- <el-button type="primary" @click="preservation">确 定</el-button> -->
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pick from 'lodash.pick'
import { notselected, rigselected } from '@/api/api'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import JInput from '@/components/jeecg/JInput'
import Vue from 'vue'
import store from '@/store'

export default {
  name: 'addentModal',
  mixins: [JeecgListMixin],
  components: { JInput },
  data() {
    return {
      enttitle: '查询招聘会名称失败',
      centerDialogVisible: false,
      nextJobFairId: '',
      formInline: {
        JobFairId: '',
        enterpriseName: ''
      },
      queryParam: {
        JobFairId: '',
        enterpriseName: ''
      },
      tipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,//跳转页数分页
        // showSizeChanger: true,
        total: 0
      },
      rigipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,//跳转页数分页
        // showSizeChanger: true,
        total: 0
      },
      columns: [
        {
          title: '报名企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
          width: 300
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 150
        }
      ],
      tableData: [],
      righttableData: []
    }
  },
  created() {},
  methods: {
    deleentinfo(res) {
      console.log('移除信息', res)
      this.axios({
        method: 'GET',
        url: '/hall/entryenterprise/removeentry',
        headers: {},
        params: { EnterpriseInfoId: res.id, JobFairId: this.nextJobFairId, CreateBy: store.getters.userInfo.username }
      })
        .then(response => {
          console.log(response)
          this.rightseloadData(1)
          this.notseloadData(1)
          this.$message.success('移除成功！')
        })
        .catch(function(error) {
          this.$message.success('移除失败:', error)
          console.log(error)
        })
    },
    addentinfo(res) {
      console.log('添加信息', res)
      this.axios({
        method: 'GET',
        url: '/hall/entryenterprise/addentry',
        headers: {},
        params: { EnterpriseInfoId: res.id, JobFairId: this.nextJobFairId, CreateBy: store.getters.userInfo.username }
      })
        .then(response => {
          console.log(response)
          this.rightseloadData(1)
          this.notseloadData(1)
          this.$message.success('添加成功！')
        })
        .catch(function(error) {
          this.$message.success('添加失败:', error)
          console.log(error)
        })
    },
    YonSubmit() {
      this.rightseloadData(1)
    },
    notsonSubmit() {
      this.notseloadData(1)
    },
    //已选择分页
    sehandleTableChange(pagination, filters, sorter) {
      console.log('分页1111', pagination)
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.rigipagination = pagination
      this.rightseloadData()
    },
    //分页未选择
    nothandleTableChange(pagination, filters, sorter) {
      console.log('分页1111', pagination)
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.tipagination = pagination
      this.notseloadData()
    },
    //未选择列表
    notseloadData(arg) {
      if (arg === 1) {
        this.tipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      console.log('查询条件', params)
      notselected(params).then(res => {
        if (res.success) {
          console.log('未选择列表', res)
          this.tableData = res.result.records
          this.tipagination.total = res.result.total
        }
      })
    },
    //已选择列表
    rightseloadData(arg) {
      if (arg === 1) {
        this.rigipagination.current = 1
      }
      let params = this.getrigQueryParams() //查询条件
      console.log('查询条件', params)
      rigselected(params).then(res => {
        if (res.success) {
          console.log('已选择列表', res)
          this.righttableData = res.result.records
          this.rigipagination.total = res.result.total
        }
      })
    },
    //已选择查询事件
    getrigQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      console.log('参数传输', param)
      param.field = this.getQueryField()
      param.pageNo = this.rigipagination.current
      param.pageSize = this.rigipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    //未选择查询事件
    getQueryParams() {
      var param = Object.assign({}, this.formInline, this.isorter)
      console.log('参数传输', param)
      param.field = this.getQueryField()
      param.pageNo = this.tipagination.current
      param.pageSize = this.tipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    edit(getJobFairId) {
      this.nextJobFairId = getJobFairId
      this.formInline.JobFairId = getJobFairId
      this.queryParam.JobFairId = getJobFairId
      this.notseloadData()
      this.rightseloadData()
      this.axios({
        method: 'GET',
        url: '/hall/jobfair/list',
        headers: {},
        params: { isexisting: 0, id: getJobFairId }
      })
        .then(response => {
          this.enttitle = response.result.records[0].name
        })
        .catch(function(error) {
          console.log(error)
        })
      this.centerDialogVisible = true
    },
    refleshCache() {
      getAction(this.url.refleshCache)
        .then(res => {
          if (res.success) {
            //重新加载缓存
            getAction(this.url.queryAllDictItems).then(res => {
              if (res.success) {
                Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
                Vue.ls.set(UI_CACHE_DB_DICT_DATA, res.result, 7 * 24 * 60 * 60 * 1000)
              }
            })
            this.$message.success('刷新缓存完成！')
          }
        })
        .catch(e => {
          this.$message.warn('刷新缓存失败！')
          console.log('刷新失败', e)
        })
    },
    //保存按钮
    preservation() {
      console
    }
  }
}
</script>
<style scoped>
.el-dialog__header .el-dialog__title{
  font-size: 22px !important;
}
.text {
  font-size: 24px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 47%;
}
</style>