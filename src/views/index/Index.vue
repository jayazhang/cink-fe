<template>
  <div class="home">
    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <div class="list">
      <div class="item" v-for="item in list" :key="item.title">
        <div class="wrap">
          <div class="img">
            <img :src="item.img" />
            <div class="title">{{item.title}}</div>
          </div>
          <div class="info">
            <div class="auth">{{item.auth}}</div>
            <div class="desc">
              {{item.intro}}
            </div>
            <div class="others">
              <div class="tag">#演讲</div>
              <div class="date">2020/5/12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from './config'

export default {
  data() {
    return {
      list,
      value: ''
    }
  }
}
</script>

<style scoped lang="less">
.home {
  background: #f5f5f5;
  .list {
    padding-top: 20px;

    .item {
      margin-bottom: 15px;
      padding: 15px 30px;
      background: #fff;

      .wrap {
        border: 1px solid #d1d1d1;
        border-radius: 10px;
        overflow: hidden;
      }

      .img {
        position: relative;
        height: 420px;
        text-align: center;

        img {
          height: 100%;
        }
        .title {
          position: absolute;
          left: 20px;
          bottom: 12px;
          font-size: 32px;
          color: #fff;
        }
      }
      .info {
        padding: 10px 20px;
        .auth {
          margin-bottom: 12px;
        }
      }
      .desc {
        margin-bottom: 12px;
        color: #999;
        font-size: 10px;
      }
      .others {
        display: flex;
        justify-content: space-between;
        .tag {}
        .date {}
      }
    }
  }
}
</style>
