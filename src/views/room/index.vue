<template>
  <div class="room">
    <div class="list">
      <div 
        class="msg" 
        v-for="msg in msgList" :key="msg.id"
        :class="{ right: msg.send_from === userInfo.username }"
      >
        <div class="name">{{msg.send_from}}</div>
        <div class="content">{{msg.msg}}</div>
      </div>
    </div>
    <div class="input">
      <textarea v-model="msg" />
      <van-button @click="send">发送</van-button>
    </div>
  </div>
</template>

<script>
import store from '../../store';

export default {
  data() {
    return {
      msg: '',
      userInfo: store.userInfo,
      msgRoomMap: store.msgRoomMap,
    }
  },
  computed: {
    msgList() {
      return store.msgRoomMap[this.$route.query.id] || [];
    }
  },
  watch: {
    'msgList.length'() {
      window.scrollTo(0, 1000000000);
    }
  },
  created() {
    setTimeout(() => {
      window.scrollTo(0, 1000000000);
    }, 1000)
  },
  methods: {
    send() {
      this.$http.post('/api/msg/insert', {
        roomId: this.$route.query.id,
        msg: this.msg,
        sendFrom: this.userInfo.username
      }).then(() => {
        this.msg = '';
      })
    }
  }
}
</script>

<style scoped lang="less">
.input {
  display: flex;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  background: #fff;

  textarea {
    box-sizing: border-box;
    width: 70vw;
    height: 80px;
    border-radius: 20px;
    border: 1px solid #f7f7f7;
  }

  button {
    flex: 1;
    margin-left: 12px;
    border-radius: 20px;
  }
}

.list {
  padding: 20px 24px 100px;
  .msg {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    &.right {
      align-items: flex-end;
    }

    .name {
      font-size: 32px;
      color: #333;
    }

    .content {
      padding: 12px 20px;
      background-color: rgba(0, 0, 0, .3);
      color: #fff;
      border-radius: 15px;
      width: 70vw;
    }
  }
}
</style>
