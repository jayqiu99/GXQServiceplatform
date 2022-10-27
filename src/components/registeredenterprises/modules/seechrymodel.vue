<template>
    <a-modal :title="title" :width="600" :visible="tbryvisible" @cancel="tjryhandleCancel">
        <a-spin :spinning="confirmLoading">
            <!-- 1 -->
            <el-card class="box-card" style="height: 300px;">
                <div slot="header" class="clearfix">
                    <span>参会人员1</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <div class="text item">
                    <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="名称">
                            <a-input disabled v-model="formLabelAlign[0].name"></a-input>
                        </el-form-item>
                        <el-form-item label="职位">
                            <a-input disabled v-model="formLabelAlign[0].post"></a-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <a-input disabled v-model="formLabelAlign[0].phone"></a-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <br />
            <!-- 2 -->
            <el-card class="box-card" style="height: 300px;">
                <div slot="header" class="clearfix">
                    <span>参会人员2</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <div class="text item">
                    <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="名称">
                            <a-input disabled v-model="formLabelAlign[1].name"></a-input>
                        </el-form-item>
                        <el-form-item label="职位">
                            <a-input disabled v-model="formLabelAlign[1].post"></a-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <a-input disabled v-model="formLabelAlign[1].phone"></a-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </a-spin>

        <template slot="footer">
            <a-button @click="tjryhandleCancel">关闭</a-button>
            <!-- <a-button type="primary" @click="bcchry">保存</a-button> -->
        </template>
    </a-modal>
</template>

<script>
    import { putAction, deleteAction, getFileAccessHttpUrl, getAction } from '@/api/manage'
    import { JeecgListMixin } from '@/mixins/JeecgListMixin'
    import { ACCESS_TOKEN } from '@/store/mutation-types'
    import store from '@/store'
    import { filterObj } from '@/utils/util'
    import { invitationjobfair, getenterpriseList, staffList, poststaff, getaddticket, getcancelticket } from '@/api/api'
    // 高度封装的请求，请使用 superRequest.call(this,{}) 的方式调用

    export default {
        name: 'seechrymodel',
        mixins: [JeecgListMixin],
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                jobfairinfo: '',
                labelPosition: 'right',
                formLabelAlign: [{
                    name: '1',
                    post: '1',
                    phone: '1'
                }, {
                    name: '',
                    post: '',
                    phone: ''
                }],
                title: '查看参会人员',
                confirmLoading: false,
                tbryvisible: false,
                url: {

                },
            }
        },
        computed: {
        },
        watch: {
        },
        mounted() {
        },
        methods: {
            tjryhandleCancel() {
                this.tjryclose()
            },
            tjryclose() {
                this.$emit('close')
                this.tbryvisible = false
            },
            edit(record) {
                this.formLabelAlign = [{
                    name: '',
                    post: '',
                    phone: ''
                }, {
                    name: '',
                    post: '',
                    phone: ''
                }],
                    console.log("参会人员", record);
                this.axios({
                    method: 'get',
                    url: '/app/staff/list',
                    headers: {},
                    params: { enterpriseInfoId: record.enterpriseid, jobfairid: record.jobfairid },
                })
                    .then((response) => {
                        console.log('企业信息长度', response.result.records.length)
                        console.log('企业信息', response.result.records)
                        if (response.result.records.length < 1) {
                            this.$message.warning('该企业没有参会人员！')
                            return
                        } else if (response.result.records.length < 2) {
                            
                            this.formLabelAlign[0].name = response.result.records[0].name
                            this.formLabelAlign[0].post = response.result.records[0].post
                            this.formLabelAlign[0].phone = response.result.records[0].phone
                            // console.log('企业信息', this.formLabelAlign[0])
                            this.tbryvisible = true;
                        } else {
                            this.formLabelAlign = response.result.records
                            this.tbryvisible = true;
                        }

                        // this.formLabelAlign[0].jobFairId = this.jobfairinfo.id
                        // this.formLabelAlign[0].enterpriseInfoId = response.result.enterpriseIds
                        // this.formLabelAlign[0].createBy = store.getters.userInfo.username
                        // this.formLabelAlign[0].createTime = this.getNowFormatDate()

                        // this.formLabelAlign[1].jobFairId = this.jobfairinfo.id
                        // this.formLabelAlign[1].enterpriseInfoId = response.result.enterpriseIds
                        // this.formLabelAlign[1].createBy = store.getters.userInfo.username
                        // this.formLabelAlign[1].createTime = this.getNowFormatDate()
                        // console.log('报名信息', this.formLabelAlign)
                    })
                    .catch(function (error) {
                        // this.$message.error(res.message || '上传失败');
                        // data.onError() // 返回报错
                        console.log(error)
                    })
                
            },

        },
    }
</script>

<style lang="less" scoped>
    input[disabled] {
        color: rgb(8, 7, 7);
        opacity: 1
    }
</style>