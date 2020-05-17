<template>
  <div class="mine">
    <van-nav-bar
      title="我的"
    />

    <div class="avatar" @click="login">
      <img />
      <div class="name">请登录</div>
    </div>
  </div>
</template>

<script>
export default {
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
    
  }
}
</style>
