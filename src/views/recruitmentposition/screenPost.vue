<template>
  <a-card :bordered="false">
    <child ref="approvedlist">
      </child>
    <!-- <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="审核通过" key="1">
        <child ref="approvedlist">
      </child>
      </a-tab-pane>
      <a-tab-pane tab="待审核" key="2">
         <reviewed ref="toBeReviewedlist">
      </reviewed>
      </a-tab-pane>
      <a-tab-pane tab="审核不通过" key="3">
        <audit ref="auditFailurelist">
      </audit>
      </a-tab-pane>
      
    </a-tabs> -->
  </a-card>
</template>

<script>
  import child from '../../components/Compost/screenApproved'
  import audit from '../../components/Compost/AuditFailure'
  import reviewed from '../../components/Compost/ToBeReviewed'
  import Vue from 'vue'
  export default {
    name: 'ArchivesStatisticst',
    components: {
      child,audit,reviewed
    },
    data() {
      return {
        
      }
    },
    created() {
      this.$refs.approvedlist.switched()
    },
    methods: {
      
      // 选择统计图类别
      // callback(key) {
      //   if(key === "1"){
      //     this.$refs.approvedlist.switched()
      //   }
      //   else if(key === "2"){
      //     this.$refs.toBeReviewedlist.switched()
      //   }else if(key === "3"){
      //     this.$refs.auditFailurelist.switched()
      //   }
      // },
      
      
    }
  }
</script>
<style scoped>

</style>