<template>
  <a-card :bordered="false">
    <a-tabs defaultActiveKey="2" @change="callback">
      <a-tab-pane tab="审核通过" key="1">
        <child ref="approvedlist" :key="childKey" :enterprisetype="enterprisetype"></child>
      </a-tab-pane>
      <a-tab-pane tab="待审核" key="2">
        <reviewed ref="toBeReviewedlist" :key="reviewedKey" :enterprisetype="enterprisetype"></reviewed>
      </a-tab-pane>
      <a-tab-pane tab="审核不通过" key="3">
        <audit ref="auditFailurelist" :key="auditKey" :enterprisetype="enterprisetype"></audit>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import child from '../../components/Compost/Approved'
import audit from '../../components/Compost/AuditFailure'
import reviewed from '../../components/Compost/ToBeReviewed'
import Vue from 'vue'
export default {
  name: 'rlzypost',
  components: {
    child,
    audit,
    reviewed
  },
  data() {
    return {
      tablab: 0,
      childKey: false,
      reviewedKey: false,
      auditKey: false,
      enterprisetype: 'rlzy'
    }
  },
  created() {
    this.selecttabitem()
  },
  mounted() {
    this.selecttabitem()
    this.dataRefreh()
  },
  methods: {
    // 定时刷新
    // selecttabitem(){
    //     this.axios({
    //     method: 'get',
    //     url: '/BigScreen/statistics/getTodoWork',
    //     headers: {},
    //   })
    //     .then((response) => {
    //       this.tablab=response.result.postWaitfor
    //     })
    //     .catch(function (error) {
    //       this.$message.success('查询企业失败:', error)
    //       console.log(error)
    //     })
    // },
    //
    callback(key) {
      if (key === '1') {
        this.childKey = !this.childKey
        this.$refs.approvedlist.switched()
      } else if (key === '2') {
        this.reviewedKey = !this.reviewedKey
        this.$refs.toBeReviewedlist.switched()
      } else if (key === '3') {
        this.auditKey = !this.auditKey
        this.$refs.auditFailurelist.switched()
      }
    },
    dataRefreh() {
      let that = this
      if (this.timer != null) {
        return
      }
      // 定时刷新
      // this.timer = setInterval(() => {
      //   that.selecttabitem()
      // }, 10000)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 0px;
  transform: translateY(-50%) translateX(100%);
}
</style>