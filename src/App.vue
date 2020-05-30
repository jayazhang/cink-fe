<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created() {
    if (this.$route.path !== '/user/login' && this.$route.path !== '/user/sign') {
      this.$http.get('/api/user/isLogin').then(res => {
        if (res.data && res.data.isLogin) {
          window.localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
        } else {
          this.$router.replace({ name: 'login' })
        }
      });
    }
  }
}
</script>

<style>
</style>
