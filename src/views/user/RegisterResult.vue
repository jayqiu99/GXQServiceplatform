<template>
  <result :isSuccess="true" :content="false" :title="email">

    <template slot="action">
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>

  </result>
</template>

<script>
  import Result from '@/views/result/Result'

  export default {
    name: "RegisterResult",
    components: {
      Result
    },
    data() {
      return {
        form: {},
      }
    },
    computed: {
      email() {
        let v = this.form ? this.form.username || this.form.mobile : ' XXX '
        console.log("注册信息2222", v);
        if (v == undefined) {
          console.log("注册信息3333", this.form);
          let title = `您的账户：${this.form.account}忘记密码邮件已发送至您邮箱，请注意查收`
          this.username = v;
          return title
        } else {
          let title = `您的账户：${v} 注册成功`
          this.username = v;
          return title
        }

      }
    },
    created() {
      console.log("注册信息", this.$route.params);
      this.form = this.$route.params
    },
    methods: {
      goHomeHandle() {
        let params = {};
        params.username = this.form.username;
        params.password = this.form.password;
        console.log(params);
        this.$router.push({ name: 'login', params })
      },
    }
  }
</script>

<style scoped>

</style>