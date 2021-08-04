<template>
  <div id="login">
    <van-nav-bar title="黑马头条——登录" />
    <van-form @submit="onSubmit">
      <van-field v-model="formLogin.mobile" name="mobile" required label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号',pattern: /^1[3456789]\d{9}$/ }]" />
      <van-field v-model="formLogin.code" type="password" name="code" required label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码',pattern: /^\d{6}$/ }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" loading-text="加载中..." :loading="show" :disabled="show">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入登录接口
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      show: false
    }
  },
  computed: {
    // 登陆数据
    ...mapState('Login', ['formLogin'])
  },
  methods: {
    // Login.js中的登录接口
    ...mapActions('Login', ['getLogin']),
    // 表单提交事件
    async onSubmit() {
      // 发起请求时禁用按钮防止用户多次点击
      this.show = true
      // try{请求成功执行的代码}catch（接收错误）{请求失败执行的代码}
      try {
        // 调用登录接口
        await this.getLogin()
        this.show = false
        // 请求成功提示
        this.$toast.success('登陆成功')
        // 跳转页面
        this.$router.push('/layout')
      } catch (err) {
        // 解除禁用按钮
        this.show = false
        // 错误提示信息
        this.$toast.fail('用户名或密码错误')
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scope>
.van-popup--center {
  width: 7.333rem;
  height: 2.083rem;
  text-align: center;
  line-height: 2.083rem;
}
</style>
