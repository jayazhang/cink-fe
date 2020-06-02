<template>
  <div class="login">
    <h2>로그인</h2>
    <van-form>
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
        <van-button @click="onSubmit" round block type="info">
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
import store from '../../../store';

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
          window.localStorage.setItem('userInfo', JSON.stringify(res.data));
          store.setUserInfo(res.data);
          this.$router.push(
            !res.data.tags 
              ? { name: 'interest' } 
              : { name: 'home' }
          )
        } else {
          alert(res.msg)
        }
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
