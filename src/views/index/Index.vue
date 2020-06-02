<template>
  <div class="home">
    <van-search v-model="value" placeholder="검색어 입력" />

    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="item" v-for="item in list" :key="item.id" @click="goDetail(item)">
        <div class="wrap">
          <div class="img" v-if="item.poster">
            <img :src="item.poster" />
            <div class="title">{{item.title}}</div>
          </div>
          <div class="info">
            <div class="title" v-if="!item.poster">{{item.title}}</div>
            <div class="auth">{{item.auth}}</div>
            <div class="desc">
              {{item.intro}}
            </div>
            <div class="others">
              <div class="tag">#{{item.tagName}}</div>
              <div class="date">{{item.createTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// import { list } from './config'

export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      value: '',
      offset: 0,
      limit: 5
    }
  },
  methods: {
    goDetail(item) {
      window.open('/detail?id=' + item.id);
    },
    onLoad() {
      this.loading = true;
      this.$http.get('/api/news/list', {
        params: {
          limit: this.limit,
          offset: this.offset
        }
      })
      .then(res => {
        this.list = this.list.concat(res.data ? res.data : []);
        this.loading = false;
        this.offset += this.limit;
        if (!res.data || res.data.length === 0) {
          this.finished = true;
        }
      })
    },
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
      font-size: 30px;

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
        font-size: 28px;
      }
      .others {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
