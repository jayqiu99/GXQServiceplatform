<template>
<a-drawer
    title="审核确认"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="innerVisible"
    style="height: 100%;overflow: auto;padding-bottom: 53px;"
  >
  <!-- <a-modal
    :width="500"
    :title="title"
    :visible="innerVisible"
    @cancel="handleCancel"
    cancelText="关闭"
    :okButtonProps="{ style: { display: 'none' } }"
  > -->
    <div style="padding-left: 30%;padding-top: 10%">
      <a-radio-group v-model="value" @change="onChange">
        <a-radio :value="1"> 通过 </a-radio>
        <a-radio :value="-1"> 不通过 </a-radio>
      </a-radio-group>
    </div>
    <!-- <div v-if="showPrise" style="padding-top: 10%">
      <a-divider orientation="left"> 不通过原因 </a-divider>
      <a-checkbox-group @change="oncheckbox" :disabled='idscheckbox'>
        <a-row>
          <a-col>
            <a-checkbox value="1"> 企业信息审核不通过 </a-checkbox>
          </a-col>
          <a-col>
            <a-checkbox value="2"> 职位信息审核不通过 </a-checkbox>
          </a-col>
          <a-col>
            <a-checkbox value="3"> 其他 </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div> -->

    <div v-show="showRentPrise" style="padding-top: 10%">
      <a-divider orientation="left"> 不通过明细 </a-divider>
      <a-textarea v-model="stateremarks" :disabled='disothertext' placeholder="审核不通过明细......." style="height:300px" :auto-size="{ minRows: 3, maxRows: 20 }" />
    </div>
    <div class="drawer-bootom-button">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消"> -->
      <a-button style="margin-right: .8rem" @click="touplist()" >上一页</a-button>
      <a-button @click="handleEdit()" type="primary">确认信息并审核</a-button>
      <!-- <a-button style="margin-right: .8rem" @click="handleCancel">取消</a-button> -->
      <!-- </a-popconfirm> -->
    </div>
  <!-- </a-modal> -->
  </a-drawer>
</template>

<script>
import { putAction, deleteAction, getFileAccessHttpUrl, getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { filterObj } from '@/utils/util'
import { invitationjobfair, getenterpriseList, staffList, poststaff, getaddticket, getcancelticket,getOnekey } from '@/api/api'
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
      title: '审核确认',
      stateremarks:'',
      drawerWidth: '35%',
      Onekeyobj:{},
      jobOnekeyobj:'',
      remarksnumber:'',
      enterpriseinfoobj:'',
      othertext: '',
      idscheckbox:true,
      disothertext:true,
      showPrise: true,
      showRentPrise: true,
      value: 1,
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
    handleEdit(){
      
      this.Onekeyobj.UpdateBy=store.getters.userInfo.username;
      this.Onekeyobj.enterpriseInfoId=this.jobOnekeyobj.enterpriseid;
      this.Onekeyobj.examinestate=this.value;
      this.Onekeyobj.jobFairId=this.jobOnekeyobj.jobfairid;
      this.Onekeyobj.remarks=this.stateremarks;
      this.Onekeyobj.remarksnumber=this.remarksnumber;
      console.log("其他的备注",this.Onekeyobj);
      // console.log("其他的备注2",this.jobOnekeyobj);
      getOnekey(this.Onekeyobj).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              this.innerVisible = false
            } else {
              this.$message.warning(res.message)
              this.innerVisible = false
            }
          })
    },
    touplist(){
      this.$emit('ok',this.enterpriseinfoobj);
      console.log("上一页",this.enterpriseinfoobj);
      this.innerVisible = false
    },
    onChange(e) {
      console.log('radio checked', e.target.value)
      if (e.target.value == -1) {
        this.idscheckbox=false
        this.disothertext = false
        // this.showPrise = true
      } else if (e.target.value == 1) {
        this.idscheckbox=true
        this.disothertext = true
        // this.showPrise = false
      }
    },
    oncheckbox(checkedValues) {
      // console.log('多选checked = ', checkedValues)
      // console.log('多选长度 = ', checkedValues.length)
      if(checkedValues.length==1){
        this.remarksnumber='';
        this.remarksnumber=checkedValues[0]
      }else if(checkedValues.length==2){
        this.remarksnumber='';
        this.remarksnumber+=checkedValues[0]+';'
        this.remarksnumber+=checkedValues[1]
      }else if(checkedValues.length==3){
        this.remarksnumber='';
        this.remarksnumber+=checkedValues[0]+';'
        this.remarksnumber+=checkedValues[1]+';'
        this.remarksnumber+=checkedValues[2]
      }
      // console.log('原因序号',this.remarksnumber)
      // if (checkedValues.length == 0) {
      //   this.disothertext = false
      //   // this.showRentPrise = false
      // }
      // for (var i = 0; i < 3; ++i) {
      //   // console.log("是否禁用222",checkedValues[i]);
      //   if (checkedValues[i] != 3) {
      //     this.disothertext = false
      //   //   this.showRentPrise = false
      //   } else if (checkedValues[i] == 3) {
      //     this.disothertext = false
      //     return;
      //   //   this.showRentPrise = true
      //   }
      // }
    },
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
        } else {
          vm.$message.warning(res.message)
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
        } else {
          vm.$message.warning(res.message)
        }
      })
    },
    edit(record) {
      console.log('弹出层', record)
      this.jobOnekeyobj=record
      this.stateremarks=''
      this.enterpriseinfoobj=record
      this.restrecord = record
      this.enterpriseid = record.enterpriseid
      this.invitationjobfairId = record.id
      // this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      let that = this
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

    //区域下拉框
    getareaList() {
      let that = this
      getAction(that.url.arealist).then((res) => {
        that.areaoption = res.result.records
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      console.log('企业id', this.enterpriseid)
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
      this.$emit('ok')
      this.visible = false
    },
    handleCancel() {
      this.innerVisible = false
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

<style lang="less" scoped>
// .a{padding-left: ;}
.drawer-bootom-button {
  position: absolute;
  bottom: -8px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>