import Vue from 'vue'
import $http from './request'

let map = {};
for (let i = 0; i < 1000; i++) {
  map[i] = [];
}

export default new Vue({
  data: {
    msgList: [],
    msgRoomMap: map,
    userInfo: {}
  },
  created() {
    this.loop();
  },
  methods: {
    setUserInfo(info) {
      this.userInfo = info;
      this.loop();
    },
    sleep(time = 1000) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },
    loop(isFirst = false) {
      let userInfo = {};
      try {
        userInfo = window.localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        this.userInfo = userInfo;
        Promise.all([this.sleep(), this.getMsg(isFirst)]).then(() => {
          this.loop()
        })
      } catch (e) {
        console.log(e);
        userInfo = {}
      }
    },
    getMsg() {
      const id = this.msgList.length ? this.msgList[this.msgList.length - 1].id : undefined;
      return $http.get('/api/msg/list', { params: { id } }).then(res => {
        if (res.data && res.data.length) {
          this.msgList = this.msgList.concat(res.data);
          for (let i = 0; i < res.data.length; i++) {
            if (this.msgRoomMap[res.data[i].room_id]) {
              this.msgRoomMap[res.data[i].room_id].push(res.data[i])
            } else {
              this.msgRoomMap[res.data[i].room_id] = [res.data[i]]
            }
          }
          console.log(this.msgRoomMap)
        }
      })
    }
  }
}) 
