<template>
  <div class="msg">
    <van-nav-bar
      title="메시지 목록"
    >
      <template #right>
        <van-icon @click="showActions = true" name="add" size="18" />
      </template>
    </van-nav-bar>
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

    <van-action-sheet v-model="showActions" :actions="actions" @select="onSelect" />

    <van-dialog 
      v-model="showCreate" 
      @confirm="confirmCreateGroup" 
      title="create a group" 
      show-cancel-button
      confirm-button-text="OK"
      cancel-button-text="cancel"
    >
      <input class="group-input" v-model="createGroupValue" placeholder="please input group name" />
    </van-dialog>

    <van-dialog 
      v-model="showJoin" 
      title="join a group" 
      show-cancel-button
      confirm-button-text="OK"
      cancel-button-text="cancel"
      @confirm="confirmJoinGroup"
    >
      <input class="group-input" v-model="joinGroupValue" placeholder="please input group name" />
    </van-dialog>
  </div>
</template>

<script>
import store from '../../store';

export default {
  data() {
    return {
      joinGroupValue: '',
      createGroupValue: '',
      showCreate: false,
      showJoin: false,
      showActions: false,
      roomList: [],
      actions: [
        {
          name: 'create a group',
          id: 1
        },
        {
          name: 'join a group',
          id: 2
        }
      ],
      msgRoomMap: store.msgRoomMap,
      userInfo: store.userInfo,
    }
  },
  created() {
    this.$http.get('/api/user/isLogin').then(res => {
      console.log(res)
      if (res.data && res.data.isLogin) {
        console.log(res.data)
        this.userInfo = res.data.userInfo;
        this.getRoom();
      }
    });
  },
  methods: {
    getRoom() {
      const teams = this.userInfo.teams ? this.userInfo.teams.split(',').map(item => +item) : [];
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
    },
    createRoom() {
      this.showCreate = true;
    },
    joinRoom() {
      this.showJoin = true;
    },
    onSelect(item) {
      switch (item.id) {
        case 1:
          this.createRoom();
          break;
        case 2:
          this.joinRoom();
          break;
      }
    },
    confirmCreateGroup() {
      this.$http.post('/api/teams/add', {
        name: this.createGroupValue
      })
      .then(res => {
        this.roomList = res.data;
        this.createGroupValue = '';
        this.showActions = false;
      }, err => {
        alert(err.msg);
      })
    },
    confirmJoinGroup() {
      this.$http.post('/api/teams/join', {
        name: this.joinGroupValue
      })
      .then(res => {
        this.roomList = res.data;
        this.joinGroupValue = '';
        this.showActions = false;
      }, err => {
        alert(err.msg);
      })
    }
  }
}
</script>

<style scoped lang="less">
.group-input {
  height: 70px;
  margin: 40px;
  border: 1px solid #e1e1e1;
  border-radius: 15px;
  width: 450px;
  padding-left: 30px;
}
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
