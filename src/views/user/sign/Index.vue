<template>
  <div class="sign">
    <h2>请注册账号密码</h2>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="username"
        placeholder="please input username"
        :rules="[{ required: true, message: 'please input username' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="password"
        placeholder="password"
        :rules="[{ required: true, message: 'please input password' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          Create an account
        </van-button>
      </div>
    </van-form>
    <div class="info">
      If you have an account?
      <router-link replace to="/user/login">Sign in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style scoped lang="less">
.sign {
  h2,
  .info {
    text-align: center;
  }
}
</style>
