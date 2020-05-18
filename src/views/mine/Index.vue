<template>
  <div class="mine">
    <van-nav-bar
      title="我的"
    />

    <div class="avatar" v-if="isLogin">
      <img />
      <div class="name">请登录</div>
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
      return false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'login' })
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
