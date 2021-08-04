<template>
  <div id="article">
    <van-loading size="24px" v-if="list.length===0" class="loading">加载中...</van-loading>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :disabled="finished" v-else>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="30" :immediate-check="false">
        <van-cell v-for="item in list" :key="item.art_id" @click="$router.push(`/articledetails/${item.art_id}`)">
          <template #title>
            <div class="title_box">
              <span> {{ item.title }} </span>
              <img alt="" class="image" v-if="item.cover.type===1" v-lazy="item.cover.images[0]">
            </div>
            <div class="img_box" v-if="item.cover.type>1">
              <img alt="" class="image" v-for="(item,index) in item.cover.images" :key="index" v-lazy="item">
            </div>
          </template>
          <template #label>
            <div class="label">
              <span> {{item.aut_name}}&nbsp;&nbsp;{{item.comm_count}}评论&nbsp;&nbsp;{{is_time(item.pubdate)}}</span>
              <Feedback :is_id="item.art_id" @content="removeList"></Feedback>
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import 'moment/locale/zh-cn.js'
import moment from 'moment'
import { GetArticleAPI } from '@/API/ArticleAPI.js'
import Feedback from '@/components/Article/Feedback.vue'
import { mapState } from 'vuex'

export default {
  name: 'Article',
  data() {
    return {
      finished: false,
      loading: false,
      refreshing: true,
      list: [],
      pre_timestamp: null
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    // Article.js中的文章Id
    ...mapState('Article', ['target'])
  },
  methods: {
    // 在ArticleAPI.js中调用发送请求接口
    // 因为需要上拉和下拉在页面中写比较方便
    async Getarticle(val) {
      // 获取成功数据
      try {
        // 发送请求
        const { data: res } = await GetArticleAPI({
          channel_id: this.id,
          pre_timestamp: this.pre_timestamp
        })
        // 判断是下拉加载还是上拉加载
        if (val) {
          // 下拉加载拼接数据
          this.list = [...this.list, ...res.data.results]
          // false表示加载完毕可以再次发送请求
          this.loading = false
        } else {
          // 上拉加载拼接数据
          this.list = [...res.data.results, ...this.list]
          // false表示加载完毕可以再次发送请求
          this.refreshing = false
        }
        // 判断有没有pre_timestamp值，没有为null
        if (res.data.pre_timestamp) {
          // 有值将值保存到data中方便取用
          this.pre_timestamp = res.data.pre_timestamp
        } else {
          // 没有pre_timestamp值，将在底部显示没有更多并禁用上拉，下拉加载
          this.finished = true
        }
      } catch (err) {
        // 打印请求失败结果
        console.error(err)
      }
    },
    is_time(val) {
      // 设置时间为几年前
      return moment(val).fromNow()
    },
    onLoad() {
      // 在获取数据时防止用户多次刷新，重复发送请求，true表示加载中不能发送请求
      this.loading = true
      // 重新加载数据
      this.Getarticle(true)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 在获取数据时防止用户多次刷新，重复发送请求，true表示加载中不能发送请求
      this.refreshing = true
      // 重新加载数据
      this.Getarticle(false)
    },
    // 子向父传数据，用户点击的不感兴趣的文章的Id在数组中删除
    removeList(val) {
      this.list.some((item, index) => {
        if (item.art_id === val) {
          this.list.splice(index, 1)
          return true
        }
      })
    }
  },
  components: {
    Feedback
  },
  created() {
    // 调用接口获取数据
    this.Getarticle()
    this.removeList()
  }
}
</script>

<style scoped lang="less">
#article {
  .loading {
    margin: 50px 130px;
  }
  .title_box {
    display: flex;
    justify-content: space-between;
  }
  .image {
    width: 110px;
    height: 70px;
    margin-right: 3px;
    object-fit: cover;
  }

  .image_box {
    display: flex;
  }
  .label {
    display: flex;
    justify-content: space-between;
  }
}
</style>
