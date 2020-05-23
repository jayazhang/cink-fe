<template>
  <div class="login">
    <h2>请使用账号密码登录</h2>
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="username"
        label="username"
        placeholder="please input username"
        :rules="[{ required: true, message: 'please input username' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="password"
        placeholder="password"
        :rules="[{ required: true, message: 'please input password' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          Sign in
        </van-button>
      </div>
    </van-form>
    <div class="info">
      New to CInK?
      <router-link replace to="/user/sign">Create an account</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    onSubmit() {
      this.$http.post('/api/user/login', this.form).then(res => {
        if (res.success) {
          window.localStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push(
            !res.data.tags 
              ? { name: 'interest' } 
              : { name: 'home' }
          )
        }
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  h2,
  .info {
    text-align: center;
  }
}
</style>
