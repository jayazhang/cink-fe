<template>
  <div class="mine">
    <van-nav-bar
      title="My comments"
    />

    <div class="list">
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="title">from: {{item.article_title}}</div>
        <div class="content">{{item.content}}</div>
      </div>
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
      userInfo: {},
      comments: []
    }
  },
  methods: {
  },
  created() {
    this.$http.get('/api/comment/list/user').then(res => {
      this.comments = res.data;
    })
  }
}
</script>

<style scoped lang="less">
.list {
  padding: 30px 24px;

  .item:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }
  .item {
    padding-bottom: 10px;
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      color: #999;
    }

    .content {
      font-size: 32px;
    }
  }
}
</style>
