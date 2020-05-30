<template>
  <div class="detail">
    <h1>{{detail.title}}</h1>
    <div class="info">
      <div class="auth">{{detail.auth}}</div>
      <div class="time">{{detail.createTime}}</div>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    this.$http.get('/api/news/detail', {
      params: {
        id: this.$route.query.id
      }
    })
    .then(res => {
      this.detail = res.data;
      console.log(res)
    })
  }
}
</script>

<style scoped lang="less">
.detail {
  padding: 20px 24px;

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
  }

  .content {
    margin-top: 24px;
    line-height: 1.45;
  }
}
</style>
