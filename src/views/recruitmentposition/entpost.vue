<template>
  <a-card :bordered="false">
    <a-tabs defaultActiveKey="2" @change="callback">
      <a-tab-pane tab="审核通过岗位" key="1">
        <child ref="approvedlist">
      </child>
      </a-tab-pane>
      <a-tab-pane tab="发布岗位" key="2">
        <!-- <span slot="tab">
          <el-badge :value="tablab" :max="99" class="item">
              <div class="dshdiv">发布岗位</div>
          </el-badge>
        </span> -->
         <reviewed ref="toBeReviewedlist">
      </reviewed>
      </a-tab-pane>
      <!-- <a-tab-pane tab="审核不通过" key="3">
        <audit ref="auditFailurelist">
      </audit>
      </a-tab-pane> -->
      
    </a-tabs>
  </a-card>
</template>

<script>
  import child from '../../components/Compost/entApproved'
  import audit from '../../components/Compost/emAuditFailure'
  import reviewed from '../../components/Compost/entToBeReviewed'
  import Vue from 'vue'
  export default {
    name: 'ArchivesStatisticst',
    components: {
      child,audit,reviewed
    },
    data() {
      return {
        tablab: 0
      }
    },
    created() {
      // this.selecttabitem()
    },
    mounted() {
    // this.selecttabitem()
    this.dataRefreh()
  },
    methods: {
      selecttabitem(){
          this.axios({
          method: 'get',
          url: '/BigScreen/statistics/getTodoWork',
          headers: {},
        })
          .then((response) => {
            this.tablab=response.result.postWaitfor
          })
          .catch(function (error) {
            this.$message.success('查询企业失败:', error)
            console.log(error)
          })
      },
      // 
      callback(key) {
        if(key === "1"){
          this.$refs.approvedlist.switched()
        }else if(key === "2"){
          this.$refs.toBeReviewedlist.switched()
        }else if(key === "3"){
          this.$refs.auditFailurelist.switched()
        }
      },
      dataRefreh() {
      let that = this
      if (this.timer != null) {
        return
      }
      this.timer = setInterval(() => {
        that.selecttabitem()
      }, 10000)
    },
      
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