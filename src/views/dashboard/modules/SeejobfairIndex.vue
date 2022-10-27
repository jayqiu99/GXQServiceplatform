<template>

    <a-modal title="招聘会详情" :width="1200" :visible="visible" @cancel="bmtjryhandleCancel">
        <a-spin :spinning="confirmLoading">
            <a-descriptions :title="jobfairinfo.name" >
                <a-descriptions-item span="2" label="举办时间">{{jobfairinfo.holdingtimeStart}}</a-descriptions-item>
                <a-descriptions-item label="报名时间">{{jobfairinfo.entrytimeStart}}</a-descriptions-item>
                <a-descriptions-item span="2" label="主办方">{{jobfairinfo.organizer}}</a-descriptions-item>
                <a-descriptions-item label="协办方">{{jobfairinfo.coorganizer}}</a-descriptions-item>
                <a-descriptions-item span="2" label="举办规模">{{jobfairinfo.holdingscale}}</a-descriptions-item>
                <a-descriptions-item label="展位数量">{{jobfairinfo.boothAmount}}</a-descriptions-item>
                <a-descriptions-item span="2" label="费用明细">{{jobfairinfo.feeDetails}}</a-descriptions-item>
                <a-descriptions-item label="报名费用">{{jobfairinfo.entryFee}}</a-descriptions-item>
                <a-descriptions-item span="3" label="报名要求">{{jobfairinfo.requirement}}</a-descriptions-item>
                <!-- <a-descriptions-item label="展位数量">{{jobfairinfo.boothAmount}}</a-descriptions-item> -->
                
                <!-- <a-descriptions-item span="2" label="主题">{{jobfairinfo.theme}}</a-descriptions-item> -->
                <!-- <a-descriptions-item label="主办单位">{{jobfairinfo.organizer}}</a-descriptions-item> -->
                <!-- <a-descriptions-item span="2" label="举办状态">{{jobfairinfo.holdingtimeOverdue}}</a-descriptions-item> -->
                <!-- <a-descriptions-item label="剩余展位">{{jobfairinfo.surplusBooth}}</a-descriptions-item> -->
                <!-- <a-descriptions-item span="2" label="我的报名状态">{{jobfairinfo.examinestate}}</a-descriptions-item> -->
                <!-- <a-descriptions-item label="已参会企业">{{jobfairinfo.enterpriseTotal}}</a-descriptions-item> -->
                <!-- <a-descriptions-item span="2" label="需求岗位数量">{{jobfairinfo.postTotal}}</a-descriptions-item> -->
                <!-- <a-descriptions-item label="需求人数">{{jobfairinfo.recruitment}}</a-descriptions-item> -->
                <!-- <a-descriptions-item span="2" label="报名开始时间">{{jobfairinfo.entrytimeStart}}</a-descriptions-item>
                <a-descriptions-item label="报名结束时间">{{jobfairinfo.entrytimeEnd}}</a-descriptions-item> -->
                <a-descriptions-item span="2" label="举办地址">
                  {{jobfairinfo.address}}
                </a-descriptions-item>
                
              </a-descriptions>
        </a-spin>

        <template slot="footer">
            <a-button @click="bmtjryhandleCancel">关闭</a-button>
        </template>
    </a-modal>
</template>

<script>

    //   import BoothForm from './BoothForm'
    export default {
        name: "TenantModal",
        components: {
            //   BoothForm
        },
        data() {
            return {
                confirmLoading: false,
                title: '',
                width: '90%',
                visible: false,
                disableSubmit: false,
                jobfairinfo:''
            }
        },
        methods: {
            bmtjryhandleCancel() {
                this.bmtjryclose()
            },
            bmtjryclose() {
                this.$emit('close')
                this.visible = false
            },

            edit(record) {
                this.visible = true
                this.jobfairinfo=record;
                // this.$nextTick(()=>{
                //   this.$refs.realForm.edit(record);
                // })
            },
        }
    }
</script>
<style scoped>
    
    .drawer-bootom-button {
        bottom: -8px;
        width: 100%;
        padding: 10px 16px;
        text-align: right;
        left: 0;
        border-radius: 0 0 2px 2px;
        margin-top: 13.8%;
        margin-left: -12%;
    }
</style>
<style lang="less" scoped>
   /deep/ .ant-descriptions-title{
        font-size: 20px;
    }
    /deep/ .ant-descriptions-item-label{
        font-size: 17px;
        font-weight: 700;
    }
    /deep/ .ant-descriptions-item-content{
        font-size: 16px;
    }
</style>