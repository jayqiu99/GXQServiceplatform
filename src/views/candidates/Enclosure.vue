<template>
  <el-dialog title="附件预览" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <div class="demo-image__preview">
      <el-image style="width: 100%; height: 100%" :src="imgurl" :preview-src-list="srcList"></el-image>
    </div>
  </el-dialog>
</template>
<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ResumeInfo from './ResumeInfo'
import { getAction } from '@/api/manage'
import store from '@/store'
import { entcandiateList } from '@/api/api'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import Vue from 'vue'

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { ResumeInfo },
  data() {
    return {
      dialogVisible: false,
      imgurl: '',
      srcList: [],
      url: {}
    }
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    showDrawer(record) {
      console.log('附件预览', record)
      var headerimg = 'http://123.57.236.82:8080/zqhr'
      this.imgurl = headerimg + record.photographResumeAddress
      
      console.log('放大附件预览', this.srcList)
      this.srcList[0]=headerimg + record.photographResumeAddress
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>