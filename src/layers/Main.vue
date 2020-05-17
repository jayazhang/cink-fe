<template>
  <div>
    <router-view/>
    <van-tabbar v-model="currentMenu" safe-area-inset-bottom>
      <van-tabbar-item 
        :icon="item.icon" 
        :name="item.name"
        :key="item.text"
        v-for="item in menuList"
        @click="clickHandle(item)"
      >
        {{item.text}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          text: '首页',
          icon: 'home-o',
          name: 'home'
        },
        {
          text: '消息',
          icon: 'comment-o',
          name: 'msg'
        },
        {
          text: '我的',
          icon: 'friends-o',
          name: 'mine'
        },
      ],
      currentMenu: this.$route.name
    }
  },
  watch: {
    $route() {
      this.currentMenu = this.$route.name
    }
  },
  methods: {
    clickHandle({ name }) {
      this.$router.replace({ name })
    }
  }
}
</script>

<style scoped lang="less">
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
