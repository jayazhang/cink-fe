<template>
  <div class="msg">
    <van-nav-bar
      title="消息列表"
    />
    <div class="list" v-if="userInfo.teams">
      <div class="room" @click="goRoom(room)" v-for="room in roomList" :key="room.id">
        <div class="name">{{room.name}}</div>
        <div class="last">
          {{msgRoomMap[room.id].length ? msgRoomMap[room.id][msgRoomMap[room.id].length - 1].msg : ''}}
        </div>
        <div class="date">
          {{msgRoomMap[room.id].length ? msgRoomMap[room.id][msgRoomMap[room.id].length - 1].send_date : ''}}
        </div>
      </div>
    </div>

    <div class="no-msg" v-if="!userInfo.teams">
      <van-button class="add" @click="join">选择一个你感兴趣的小组加入吧</van-button>
    </div>
  </div>
</template>

<script>
import store from '../../store';

export default {
  data() {
    return {
      roomList: [],
      msgRoomMap: store.msgRoomMap,
      userInfo: store.userInfo,
    }
  },
  created() {
    this.getRoom();
    this.$http.get('/api/user/isLogin').then(res => {
      if (res.data && res.data.isLogin) {
        this.userInfo = res.data;
        this.getRoom();
      }
    });
  },
  methods: {
    getRoom() {
      const teams = this.userInfo.teams.split(',').map(item => +item);
      this.$http.get('/api/teams').then(({ data }) => {
        this.roomList = data.filter(item => {
          return teams.indexOf(item.id) > -1
        })
      })
    },
    goRoom(room) {
      this.$router.push({ name: 'room', query: { id: room.id } })
    },
    join() {
      this.$router.push({ name: 'team' });
    }
  }
}
</script>

<style scoped lang="less">
.room {
  position: relative;
  padding: 12px 24px;
  border: 1px solid #f9f9f9;

  .name {
    font-size: 30px;
    color: #333;
  }

  .last {
    font-size: 26px;
    color: #999;
    height: 32px;
    overflow: hidden;
  }

  .date {
    position: absolute;
    right: 24px;
    top: 20px;
    line-height: 24px;
    font-size: 24px;
    color: #a1a1a1;
  }
}

.no-msg {
  padding-top: 160px;
  text-align: center;
}
</style>
