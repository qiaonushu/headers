<template>
  <div id="result">
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.push('/layout/home')" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="0">
        <van-cell v-for="(item,index) in list" :key="index" @click="$router.push(`/articledetails/${item.art_id}`)">
          <template #title>
            <div class="list">
              <span> {{item.title}} </span>
              <img :src="item.cover.images[0]" alt="" v-if="item.cover.type===1" class="image">
            </div>
            <div v-if="item.cover.type===3" class="list">
              <img :src="item" alt="" v-for="(item,index) in item.cover.images" :key="index" class="image">
            </div>
          </template>
          <template #label>
            <span> {{item.aut_name}} </span>
            <span> {{item.comm_count}} 评论</span>
            <span> 2年前</span>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { GetSearchAPI } from '@/API/SearchAPI.js'

export default {
  data() {
    return {
      page: 1,
      list: [],
      loading: true,
      refreshing: true,
      finished: false
    }
  },
  methods: {
    async GetSearch(val) {
      try {
        const { data } = await GetSearchAPI({ q: this.$route.params.q, page: this.page })
        this.list = data.data.results
        if (val) {
          this.list = [...data.data.results, ...this.list]
          this.refreshing = false
        } else {
          this.list = [...this.list, ...data.data.results]
          this.loading = false
        }
        if (data.data.results.length < 10 || data.data.page) {
          this.finished = true
        }
        this.page++
      } catch (err) {
        console.error(err)
      }
    },
    onLoad() {
      this.loading = true
      this.GetSearch(false)
    },
    onRefresh() {
      this.finished = false
      this.refreshing = true
      this.GetSearch(true)
    }
  },
  created() {
    this.GetSearch()
  }
}
</script>

<style lang="less" scope>
.list {
  display: flex;
  justify-content: space-between;
  .image {
    width: 110px;
    height: 70px;
  }
}
</style>
