<template>
  <div class="sign">
    <h2>회원 가입</h2>
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
import store from '../../../store';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$http.post('/api/user/register', this.form).then(res => {
        if (res.success) {
          window.localStorage.setItem('userInfo', JSON.stringify(res.data))
          store.setUserInfo(res.data);
          this.$router.push({ name: 'interest' })
        }
      })
    }
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
