<template>
  <div class="mine">
    <van-nav-bar
      title="我的"
    />

    <div class="avatar" v-if="isLogin">
      <img src="http://cink.club:8088/assets/interest/img1.png" />
      <div class="info">{{userInfo.nickname || userInfo.username}}</div>

      <div class="arrow">
        <van-icon name="arrow"/>
      </div>
    </div>

    <div class="login-pane" v-else>
      <van-button @click="login">请登录 / 注册</van-button>
    </div>

    <van-cell-group title="社交功能" @click="alert('暂未开放')">
      <van-cell title="닷글단 글" value="닷글" icon="location-o" />
      <van-cell title="작성글" value="글" icon="location-o" />
    </van-cell-group>

    <!-- <van-cell-group title="其他功能" @click="alert('暂未开放')">
      <van-cell title="我的评论" value="评论" icon="location-o" />
      <van-cell title="我的文章" value="文章" icon="location-o" />
    </van-cell-group> -->
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
    alert(msg) {
      alert(msg)
    }
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
    flex-direction: row;
    padding: 12px 20px;
    background: #fff;

    img {
      width: 120px;
      height: 120px;
      border-radius: 12px;
    }

    .arrow {
      display: flex;
      flex: 1;
      flex-direction: row-reverse;
      align-items: center;
    }

    .info {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
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
