<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" style="margin-left:10%" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8">
            <a-form-item label="招聘会名称" :labelCol="{span: 7}" :wrapperCol="{span: 16, offset: 1}">
              <a-select
                show-search
                v-model="jobid"
                option-filter-prop="children"
                :filter-option="filterOption"
                @change="handleChange"
              >
                <a-select-option v-for="d in joboption" :key="d.id" :value="d.id">{{d.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-operator" style="border-top: 5px;margin-left:5%">
        <a-button @click="invitationAdd" type="primary" icon="plus">保存</a-button>
        <a-button @click="preview" type="primary" icon="eye">预览</a-button>
      </div>
      
    </div>
    <!-- <a @click="editDictItem(record)"><a-icon type="setting"/>审核</a> -->
    <j-editor v-model="demovalue"/>
    <!-- <div>编辑富文本内容{{demovalue}}</div> -->
    <p-review ref="invitationlist" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
import PReview from './modules/EyePreview'
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
import { areaList, editinvitation } from '@/api/api'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import DictModal from '../basicinfo/modules/AreaModal'
import DictItemList from '../system/DictItemList'
import DictDeleteList from '../system/DictDeleteList'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import Vue from 'vue'
import store from '@/store'

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { DictModal, DictItemList, DictDeleteList, JEditor, PageLayout,PReview },
  data() {
    return {
      jobid: '',
      joboption: [],
      demovalue: '',
      eyeid:'',
      description: '这是地区信息管理页面',
      visible: false,
      // 查询条件
      queryParam: {
        name: '',
      },
      invitationobj: [],
      dataSource: [],
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
        list: '/sys/dict/list',
        delete: '/base/area/delete',
        exportXlsUrl: 'sys/dict/exportXls',
        importExcelUrl: 'sys/dict/importExcel',
        refleshCache: 'sys/dict/refleshCache',
        queryAllDictItems: 'sys/dict/queryAllDictItems',
        industrylist: '/hall/jobfair/list',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  created() {
    this.loadData()
  },
  mounted() {
    console.log('11111111')
    this.getindustryList()
  },
  methods: {
    //下拉搜索
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleChange(value) {
      let that = this
      console.log('选种', value)
      that.eyeid=value;
      getAction('/hall/jobfair/list', { id: value }).then((res) => {
        that.invitationobj = res.result.records[0]
        console.log(that.invitationobj)
        that.demovalue = that.invitationobj.invitation
      })
    },
    preview(){
        this.$refs.invitationlist.edit(this.demovalue)
    },
    invitationAdd() {
      let that = this
      // console.log('添加对象', that.invitationobj.invitation)
      if (that.invitationobj.id > 0) {
        that.invitationobj.invitation = that.demovalue;
        console.log("添加对象",that.invitationobj);
         that.invitationobj.updateBy= store.getters.userInfo.username
         that.invitationobj.invitationTitle= that.invitationobj.name+"邀请函"
        //  that.invitationobj.updateBy= store.getters.userInfo.username
        // console.log('添加对象', that.invitationobj.invitation)
        editinvitation(that.invitationobj).then((res) => {
          if (res.success) {
            that.$message.success('保存邀请函内容成功！')
          } else {
            that.$message.warning('保存邀请函内容失败！')
          }
        })
      }else{
          that.$message.warning('请先选择招聘会！')
      }
    },
    getindustryList() {
      let that = this
      getAction(that.url.industrylist).then((res) => {
        that.joboption = res.result.records
      })
    },
    addtext() {
      this.demovalue = "<h1 style='text-align: center;'>啊啊啊啊啊</h1>"
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      areaList(params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam)
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
      this.$refs.dictItemList.edit(record)
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.name = ''
      that.loadData(this.ipagination.current)
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