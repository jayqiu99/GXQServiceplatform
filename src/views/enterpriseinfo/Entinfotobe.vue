<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-table
        ref="table"
        rowKey="id"
        size="middle"
        :columns="columns"
        :scroll="{ x: 1500, y: 600 }"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        bordered
        @change="handleTableChange"
      >
        <template slot="logoAddress" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="record.logoAddress" icon="user" />
          </div>
        </template>

        <!-- <a-table-column key="enable" title="启用" data-index="enable">
          <template slot-scope="enable">
            <span>
              <a-tag v-for="tag in enable" :key="tag" color="blue">{{ tag }}</a-tag>
            </span>
          </template>
        </a-table-column>-->
        <span slot="action" slot-scope="text, record">
          <!-- <a-popconfirm title="确定重置密码吗?" @confirm="() =>handleResetad(record.id)">
            <a>重置密码</a>
          </a-popconfirm>-->
          <!-- <a @click="handleResetad(record.id)">
            <a-icon type="edit"/>
            重置密码
          </a>-->
          <!-- <a-divider type="vertical"/> -->
          <a @click="handleEdit(record)"> <a-icon type="file-search" />编辑修改</a>
          <!-- <a-divider type="vertical"/> -->

          <!-- <a-divider type="vertical"/> -->
          <!-- <a @click="editDictItem(record)"><a-icon type="setting"/> 审核</a> -->
          <!-- <a-divider type="vertical" /> -->
          <!-- <a-popconfirm
            title="确定要审核通过吗?"
            ok-text="通过"
            cancel-text="不通过"
            @cancel="() => unexconfirm(record.id)"
            @confirm="() => exconfirm(record.id)"
          >-->
          <!-- <a @click="examineFormclick(record)"> <a-icon type="setting" />审核 </a> -->
          <!-- </a-popconfirm> -->

          <!-- <a-divider type="vertical" /> -->
          <!-- <a-popconfirm title="确定重置密码吗?" @confirm="() => handleResetad(record.id)">
            <a> <a-icon type="unlock" />重置密码 </a>
          </a-popconfirm> -->
          <!-- <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定重置密码吗?" @confirm="() =>handleResetad(record.id)">
                  <a>重置密码</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item>
                <a @click="editDictItem(record)">审核</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <examine-modal ref="examineForm" @ok="modalFormOk"></examine-modal>
    <!-- 字典类型 -->
    <examine-item-list ref="examineForm" @ok="modalFormOk"></examine-item-list>
    <addent ref="toaddent" @ok="modalFormOk"></addent>
  </a-card>
</template>

<script>
import { editresetenterprise, editenable, approvedList, entapprovedList, editexamine } from '@/api/api'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import UserModal from '../../components/Enterpriseinfosh/modules/entApprovededigMd.vue'
import ExamineItemList from '../../components/Enterpriseinfosh/modules/Examineform'
import Addent from '../../components/Enterpriseinfosh/modules/toapproved.vue'
// import ExamineItemList from './modules/ExamineModel'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import JInput from '@/components/jeecg/JInput'
import store from '@/store'
import Vue from 'vue'

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { UserModal, ExamineItemList, JInput, Addent },
  data() {
    return {
      description: '这是数据字典页面',
      visible: false,
      options: '',
      // 查询条件行业
      cascaderit: '',
      // 查询条件
      queryParam: {
        trade: '',
        scale: '',
        area: '',
        name: '',
      },
      newlogoAddress: '',
      industryoption: [], //行业
      scaleoption: [], //规模
      areaoption: [], //区域
      examineparams: {
        id: '',
        examinestate: '',
      },
      // 表头
      columns: [
        // {
        //   title: '#',
        //   dataIndex: '',
        //   key: 'rowIndex',
        //   width: 70,
        //   fixed: 'left',
        //   align: "center",
        //   customRender: function (t, r, index) {
        //     return parseInt(index) + 1;
        //   }
        // },
        {
          title: '所属区域',
          align: 'center',
          width: 150,
          dataIndex: 'area',
        },
        {
          title: '企业LOGO',
          align: 'center',
          width: 150,
          dataIndex: 'logoAddress',
          scopedSlots: { customRender: 'logoAddress' },
        },
        {
          title: '企业名称',
          align: 'center',
          width: 200,
          dataIndex: 'enterpriseName',
        },
        {
          title: '负责人',
          align: 'center',
          width: 80,
          dataIndex: 'companyPrincipal',
        },
        {
          title: '联系电话',
          align: 'center',
          width: 120,
          dataIndex: 'phone',
        },
        {
          title: '所属行业',
          align: 'center',
          width: 130,
          dataIndex: 'trade',
        },
        {
          title: '企业规模',
          align: 'center',
          width: 100,
          dataIndex: 'scale',
        },
        // {
        //   title: '地址',
        //   align: 'center',
        //   width: 200,
        //   dataIndex: 'address',
        // },
        // {
        //   title: '审核状态',
        //   align: 'center',
        //   width: 90,
        //   dataIndex: 'examinestate',
        // },
        {
          title: '审核状态',
          align: 'center',
          width: 80,
          dataIndex: 'examinestate',
          scopedSlots: { customRender: 'examine' },
        },
        {
          title: '原因描述',
          align: 'center',
          dataIndex: 'errorReason',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 200,
          fixed: 'right',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      dataSource: [],
      restParam: {
        id: '',
      },
      enableParam: {
        id: '',
        enable: '',
      },
      dict: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      url: {
        list: '/base/list?type=area',
        delete: '/sys/dict/delete',
        exportXlsUrl: 'sys/dict/exportXls',
        importExcelUrl: 'sys/dict/importExcel',
        refleshCache: 'sys/dict/refleshCache',
        queryAllDictItems: 'sys/dict/queryAllDictItems',
        Reseturl: '/hall/enterprise/resetpsw',
        industrylist: '/base/list?type=industrytype',
        industrychildren: '/base/list?type=industryname',
        scalelist: '/base/list?type=scale',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  mounted() {
    this.trymodel()
  },
  methods: {
    tohandleAdd() {
      this.$refs.toaddent.add()
    },
    examineFormclick(resobj) {
      this.$refs.examineForm.edit(resobj)
    },
    switched() {
      // this.loadData()
    },
    cascaderonChange(value) {
      console.log('行业', value)
      this.cascaderit = value[1]
    },
    trymodel() {
      let that = this

      getAction(that.url.industrylist).then((res) => {
        // let items = []
        for (var i = 0; i < res.result.records.length; ++i) {
          res.result.records[i].items = ''
          let aaa = i
          getAction(that.url.industrychildren, { parentid: res.result.records[i].id }).then((rest) => {
            res.result.records[aaa].items = rest.result.records
          })
        }
        this.industryoption = res.result.records
      })
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var departn = localStorage.getItem('departId')
      console.log('部门信息', departn)
      console.log('userID', store.getters.userInfo.id)
      this.axios({
        method: 'get',
        url: '/sys/getenterprisebyuser',
        headers: {},
        params: { userid: store.getters.userInfo.id, departid: departn },
      })
        .then((response) => {
          console.log('企业信息', response.result)

          let params = this.getQueryParams() //查询条件
          params.id = response.result.enterpriseIds
          console.log('table参数', params)
          var logoAddressUrl = 'https://dwrlzy.jiahangit.com.cn/zqhr'
          entapprovedList(params).then((res) => {
            // res.result.records[0].examinestate=2
            // console.log("企业信息",res.result.records);
            if (params.id == '' || params.id == null) {
              this.dataSource = []
            } else {
              if (res.success) {
                
                for (var i = 0; i < res.result.records.length; ++i) {
                  
                  if(res.result.records[i].examinestate == 2){
                    res.result.records[i].examinestate=""
                  }else if(res.result.records[i].examinestate == 0){
                    res.result.records[i].examinestate="待审"
                  }else if(res.result.records[i].examinestate == 1){
                    res.result.records[i].examinestate="通过"
                  }else if(res.result.records[i].examinestate == -1){
                    res.result.records[i].examinestate="不通过"
                  }
                  res.result.records[i].logoAddress = logoAddressUrl + res.result.records[i].logoAddress
                  this.newlogoAddress = res.result.records[i].logoAddress
                }
                this.dataSource = res.result.records
                this.ipagination.total = res.result.total
              }
            }
          })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          data.onError() // 返回报错
          console.log(error)
        })
    },
    handleResetad(idr) {
      const that = this
      that.restParam.id = idr
      editresetenterprise(that.restParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      console.log('参数传输', param)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    //取消选择
    cancelDict() {
      this.dict = ''
      this.visible = false
      this.loadData()
    },
    //编辑字典数据
    editDictItem(record) {
      this.$refs.examineItemList.edit(record)
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.trade = ''
      that.queryParam.area = ''
      that.queryParam.name = ''
      that.queryParam.scale = ''
      that.cascaderit = ''
      that.loadData(this.ipagination.current)
    },
    exportFile() {
      var that = this
      var trade = that.queryParam.trade
      var area = that.queryParam.area
      var name = that.queryParam.name
      var scale = that.queryParam.scale
      console.log('trade', trade)
      console.log('area', area)
      console.log('name', name)
      console.log('scale', scale)

      this.$http({
        url: '/hall/enterprise/export?area=' + area + '&trade=' + trade + '&name=' + name + '&scale=' + scale,
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
          //console.log("res",res);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openDeleteList() {
      this.$refs.dictDeleteList.show()
    },
    refleshCache() {
      getAction(this.url.refleshCache)
        .then((res) => {
          if (res.success) {
            //重新加载缓存
            getAction(this.url.queryAllDictItems).then((res) => {
              if (res.success) {
                Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
                Vue.ls.set(UI_CACHE_DB_DICT_DATA, res.result, 7 * 24 * 60 * 60 * 1000)
              }
            })
            this.$message.success('刷新缓存完成！')
          }
        })
        .catch((e) => {
          this.$message.warn('刷新缓存失败！')
          console.log('刷新失败', e)
        })
    },
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>