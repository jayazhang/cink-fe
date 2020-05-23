<template>
  <div class="mine">
    <van-nav-bar
      title="我的"
    />

    <div class="avatar" v-if="isLogin">
      <img />
      <div class="name">{{userInfo.nickname}}</div>
    </div>

    <div class="login-pane" v-else>
      <van-button @click="login">请登录 / 注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.userInfo && this.userInfo.id
    }
  },
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'login' })
    },
  },
  created() {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    }
  }
}
</script>

<style scoped lang="less">
.mine {
  background: #f5f5f5;

  .avatar {
    display: flex;
  }

  .login-pane {
    display: flex;
    justify-content: center;
    align-items: center;
    background: cornflowerblue;
    height: 260px;
  }
}
</style>
