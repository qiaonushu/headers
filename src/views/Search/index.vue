<template>
  <div id="search">
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" background="#007bff" shape="round" @clear="Onclear" @input="Oninput" @search="Onsearch" v-getFocus>
        <template #left>
          <van-icon name="arrow-left" @click="$router.back()" />
        </template>
        <template #left-icon>
          <van-icon name="search" @click="Onsearch" />
        </template>
      </van-search>
    </form>
    <div v-if="value">
      <van-cell v-for="item in list" :key="item" @click="Onsearch">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title" v-html="fontHighLight(item,value)"></span>
        </template>
      </van-cell>
    </div>
    <div v-else>
      <van-cell title="搜索历史" center>
        <template #right-icon>
          <van-icon name="delete" @click="delHistory" />
        </template>
      </van-cell>
      <div class="box">
        <span v-for="item in historyList" :key="item" @click="OnClick"> {{item}} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSuggestionAPI } from '@/API/SearchAPI.js'
import { fontHighLight } from '@/utils/GlobalMethod/fontHeighLight.js'
import { removeStorage, getStorage, setStorage } from '@/utils/storage.js'

export default {
  name: 'Search',
  data() {
    return {
      value: '',
      timer: '',
      list: [],
      historyList: ['API', 'java', 'css', '前端', '后台接口', 'python']
    }
  },
  methods: {
    // 高亮事件
    fontHighLight,
    Onclear() {
      this.value = ''
    },
    Onsearch() {
      this.$router.push(`/searchresult/${this.value}`)
      this.value = ''
    },
    OnClick(e) {
      if (e.target.localName === 'span') {
        this.value = e.target.innerText
        this.$router.push(`/searchresult/${this.value}`)
      }
    },
    Oninput() {
      this.list = []
      if (!this.value) return
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        try {
          const { data: res } = await GetSuggestionAPI(this.value)
          this.list = res.data.options
        } catch (err) {
          console.error(err)
        }
      }, 500)
      this.historyList.push(this.value)
    },
    delHistory() {
      removeStorage('his')
    }
  },
  watch: {
    historyList(oldVal, newVal) {
      setStorage('his', JSON.stringify(newVal))
    }
  },
  created() {
    this.historyList = JSON.parse(getStorage('his'))
  }
}
</script>

<style lang="less" scope>
#search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .van-icon-arrow-left {
    font-size: 20px;
    color: white;
    margin-right: 10px;
  }
  .text_content {
    margin: 10px;
    font-size: 15px;
    div {
      padding-left: 5px;
      margin-bottom: -5px;
    }
  }
  .box {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    padding: 0 10px;
    span {
      background: rgb(238, 235, 235);
      padding: 5px 10px;
      border-radius: 10%;
      margin: 5px 5px;
    }
  }
}
</style>
