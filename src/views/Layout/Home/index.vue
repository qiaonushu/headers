<template>
  <div id="home">
    <van-loading size="24px" v-if="channelsList.length===0" class="loading">加载中...</van-loading>
    <div v-else>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/image/logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="0.6rem" @click="$router.push('/search')" />
        </template>
      </van-nav-bar>
      <!-- 头部分类区 -->
      <van-tabs v-model="active" animated sticky offset-top="1.25rem">
        <!-- <template #nav-right>

      </template> -->
        <van-tab v-for="item in channelsList" :key="item.id" :title="item.name" :name="item.id">
          <!-- 文章内容区 -->
          <div class="box">
            <Article :id="active"></Article>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 频道页面 -->
      <SetChannels @enterThisChannel="ThisChannel" :is_id="active"></SetChannels>

    </div>
    <!-- 头部区域 -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Article from '@/components/Article/Article.vue'
import SetChannels from '@/components/SetChannels/index.vue'

export default {
  data() {
    return {
      active: 0,
      site: {}
    }
  },
  computed: {
    // Home.js中的已选列表
    ...mapState('Home', ['channelsList'])
  },
  methods: {
    ...mapActions('Home', ['GetUserchannels', 'Getchannels', 'PutUserChannels']),
    ThisChannel(id) {
      this.active = id
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.site[oldVal] = window.scrollY
      setTimeout(() => {
        window.scrollTo(0, this.site[newVal])
      })
    }
  },
  created() {
    // 调用Home.js中的已选列表接口
    this.GetUserchannels()
    // 调用Home.js中的全部列表接口
    this.Getchannels()
  },
  components: {
    Article,
    SetChannels
  }
}
</script>

<style lang="less" scope>
.loading {
  margin: 50px 130px;
}
#home {
  .logo {
    height: 90%;
    margin-left: -10px;
  }
  .box {
    margin-top: 45px;
    margin-bottom: 50px;
  }
  .btn {
    position: fixed;
    top: 1.22667rem;
    right: 0;
    background: #fff;
    z-index: 100;
    width: 25px;
    height: 40px;
    padding: 0 0 0 5px;
    line-height: 45px;
  }
  .van-tabs__wrap {
    padding-right: 20px;
  }
}
</style>
