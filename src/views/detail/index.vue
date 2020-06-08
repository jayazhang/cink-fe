<template>
  <div class="detail">
    <h1>{{detail.title}}</h1>
    <div class="info">
      <div class="auth">{{detail.auth}}</div>
      <div class="time">{{detail.createTime}}</div>
    </div>
    <div class="content" v-html="detail.content"></div>

    <div class="comment">
      <h3>Comments</h3>
      <div class="comment-list">
        <div class="comment-item" v-for="(item, index) in comment" :key="index">
          <div class="comment-username">{{item.user_name}}</div>
          <div class="comment-content" v-html="item.content"></div>
        </div>
      </div>
    </div>

    <div class="input">
      <textarea v-model="content" placeholder="plz input you comment" />
      <van-button @click="publish">publish</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      detail: {},
      comment: []
    };
  },
  created() {
    this.$http.get('/api/news/detail', {
      params: {
        id: this.$route.query.id
      }
    })
    .then(res => {
      res.data.content = res.data.content.split('\n').join('<br/>');
      this.detail = res.data;
    });
    this.getCommonts();
  },
  methods: {
    getCommonts() {
      return this.$http.get('/api/comment/list/article', {
        params: { id: this.$route.query.id }
      }).then(res => {
        this.comment = res.data || [];
      });
    },
    publish() {
      this.$http.post('/api/comment/add', {
        article_id: this.detail.id,
        article_title: this.detail.title,
        content: this.content
      }).then(() => {
        this.content = '';
        this.getCommonts();
      });
    }
  }
}
</script>

<style scoped lang="less">
.detail {
  padding: 20px 24px 100px;

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
  }

  .content {
    margin-top: 24px;
    line-height: 1.45;
  }
}
.comment {
  margin-top: 40px;
  &-item {
    margin-top: 20px;
  }
  &-username {
    font-size: 42px;
    margin-bottom: 10px;
  }
  &-content {
    font-size: 30px;
    color: #999;
  }
}
.input {
  margin-top: 40px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background: #fff;

  textarea {
    box-sizing: border-box;
    padding-left: 12px;
    width: 70vw;
    height: 80px;
    border-radius: 20px;
    border: 1px solid #e1e1e1;
  }

  button {
    flex: 1;
    margin-left: 12px;
    border-radius: 20px;
  }
}
</style>
