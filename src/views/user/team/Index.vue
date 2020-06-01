<template>
  <div class="team">
    <h2>选择你感兴趣的小组</h2>
    <p>加入小组，一起和小伙伴聊天吧</p>
    <div class="list">
      <div class="item" v-for="(team, index) in teams" :key="team.id">
        <div class="left">{{team.name}}</div>
        <div class="right" v-if="!team.checked" @click="clickHandle(index)">
          <van-icon name="plus" />
        </div>
      </div>
    </div>

    <van-button 
      class="sumbit" 
      type="primary"
      :disabled="checkedLength < 1"
      @click="nextStep"
    >
      <span>{{checkedTeams && `加入${checkedTeams}` || '完成'}}</span>
    </van-button>

    <div class="skip" @click="nextStep">
      <span>跳过</span>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    checkedLength() {
      return this.teams.filter(item => item.checked).length
    },
    checkedTeams() {
      return this.teams.filter(item => item.checked).map(item => item.name).join(',')
    }
  },
  data() {
    return {
      teams: [],
    }
  },
  methods: {
    clickHandle(index) {
      this.teams[index].checked = !this.teams[index].checked
    },
    setTeams() {
      return this.$http.post('/api/teams/set', {
        ids: this.teams.filter(item => item.checked).map(item => item.id).join(',')
      }).then(() => {
        return this.$http.get('/api/user/isLogin').then(res => {
          if (res.data && res.data.isLogin) {
            window.localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
          }
        });
      })
    },
    nextStep() {
      return (
        this.checkedTeams.length 
          ? this.setTeams() 
          : Promise.resolve()
      ).then(() => {
        this.$router.replace({ name: 'home' })
      })
    }
  },
  created() {
    this.$http.get('/api/teams').then(({ data }) => {
      this.teams = data.map(item => {
        item.checked = false
        return item
      })
    })
  }
}
</script>

<style scoped lang="less">
.team {
  padding: 60px 40px;
  text-align: center;

  > h2 {
    margin-top: 0;
    font-size: 60px;
    color: #111;
    font-weight: 400;
  }

  > p {
    margin: 10px 0 20px;
    font-size: 32px;
    color: #999;
  }

  .list {
    padding: 0 40px;
    margin-bottom: 40px;

    .item {
      display: flex;
      width: 100%;
      line-height: 80px;
      justify-content: space-between;

      .right {
        color: #07c160;
      }
    }
  }

  .sumbit {
    width: 70vw;
  }

  .skip {
    margin-top: 40px;
    padding: 0 15vw;
    text-align: right;
    color: #999;
    font-size: 10px;
  }
}
</style>
