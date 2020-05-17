<template>
  <div class="interest">
    <h2>选择感兴趣的内容</h2>
    <p>根据兴趣，生成私人的信息流</p>
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
            <img :src="item.img" />
            <div class="radio" :class="{checked: item.checked}">
              <van-icon name="success" />
            </div>
          </div>
          <div class="desc">{{item.text}}</div>
        </van-col>
      </van-row>
    </div>

    <van-button 
      class="sumbit" 
      type="primary"
      :disabled="checkedLength < 2"
      @click="nextStep"
    >
      <span v-if="checkedLength < 2">至少关注2个兴趣</span>
      <span v-else>下一步</span>
    </van-button>
  </div>
</template>

<script>
const interestList = [
  {
    id: 1,
    img: require('../../../assets/interest/img1.png'),
    text: '汇率',
  },
  {
    id: 2,
    img: require('../../../assets/interest/img2.png'),
    text: '新闻',
  },
  {
    id: 3,
    img: require('../../../assets/interest/img3.png'),
    text: '医疗',
  },
  {
    id: 4,
    img: require('../../../assets/interest/img4.png'),
    text: '租房',
  },
  {
    id: 5,
    img: require('../../../assets/interest/img5.png'),
    text: '学校',
  },
  {
    id: 6,
    img: require('../../../assets/interest/img6.png'),
    text: '求职',
  },
  {
    id: 7,
    img: require('../../../assets/interest/img7.png'),
    text: '音乐',
  },
  {
    id: 8,
    img: require('../../../assets/interest/img8.png'),
    text: '美食',
  },
  {
    id: 9,
    img: require('../../../assets/interest/img9.png'),
    text: '签证',
  },
]
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
      interestList: interestList.map(item => {
        item.checked = false
        return item
      }),
    }
  },
  methods: {
    clickHandle(index) {
      this.interestList[index].checked = !this.interestList[index].checked
    },
    nextStep() {
      this.$router.replace({ name: 'team' })
    }
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
