<template>
<a-drawer
    title="招聘会"
    :maskClosable="true"
    :width="width"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: 100%;overflow: auto;padding-bottom: 53px;"
  >
  
    <booth-form ref="realForm" @ok="submitCallback" @eChange="etChange" :disabled="disableSubmit" normal></booth-form>
    
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm> -->
      <!-- <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">保存</a-button> -->
    </div>
  </a-drawer>
  
</template>

<script>

  import BoothForm from './BoothForm'
  export default {
    name: "TenantModal",
    components: {
      BoothForm
    },
    data () {
      return {
        title:'',
        width:'90%',
        visible: false,
        disableSubmit: false
      }
    },
    methods: {
      etChange(){
        this.$nextTick(() => {
              this.close();
            });
    },
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.add();
        })
      },
      edit (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.edit(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
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