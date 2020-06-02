<template>
  <div class="interest">
    <h2>관심 있는 내용 선택해주세요</h2>
    <p>흥미에 따라 개인의 정보 흐름을 생성합니다</p>
    <div class="list">
      <van-row gutter="20">
        <van-col 
          span="8" 
          class="item" 
          v-for="(item, index) in interestList" 
          :key="item.id"
          @click="clickHandle(index)"
        >
          <div class="img">
            <img :src="item.poster" />
            <div class="radio" :class="{checked: item.checked}">
              <van-icon name="success" />
            </div>
          </div>
          <div class="desc">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>

    <van-button 
      class="sumbit" 
      type="primary"
      :disabled="checkedLength < 2"
      @click="nextStep"
    >
      <span v-if="checkedLength < 2">최소 2개이상 선택해 주세요</span>
      <span v-else>다음</span>
    </van-button>
  </div>
</template>

<script>
export default {
  computed: {
    checkedLength() {
      return this.interestList.filter(item => item.checked).length
    },
    checkedInterest() {
      return this.interestList.filter(item => item.checked)
    }
  },
  data() {
    return {
      interestList: [],
    }
  },
  methods: {
    clickHandle(index) {
      this.interestList[index].checked = !this.interestList[index].checked
    },
    nextStep() {
      this.$http.post('/api/tags/set', {
        ids: this.interestList.filter(item => item.checked).map(item => item.id).join(','),
      }).then(res => {
        if (res.success) {
          this.$router.replace({ name: 'team' })
        } else {
          alert('error')
        }
      });
    }
  },
  created() {
    this.$http.get('/api/tags').then(({ data }) => {
      this.interestList = data.map(interest => {
        interest.checked = false
        return interest
      })
    })
  }
}
</script>

<style scoped lang="less">
.interest {
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
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .item {
      height: 260px;

      .img {
        position: relative;
        width: 100%;
        height: 180px;
        border-radius: 8px;
        overflow: hidden;
        text-align: center;
        border: 1px solid #d1d1d1;

        .radio {
          position: absolute;
          top: 20px;
          right: 10px;
          width: 26px;
          height: 26px;
          border: 2px solid #d1d1d1;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.15);
          color: transparent;

          &.checked {
            background: #fff;
            color: #07c160;
          }
        }

        img {
          height: 100%;
        }
      }

      .desc {
        line-height: 50px;
      }
    }
  }

  .sumbit {
    width: 70vw;
  }
}
</style>
