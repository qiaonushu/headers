<template>
  <div id="details">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.push('/layout/home')" />
    <van-cell-group inset>
      <van-cell>
        <template #title>
          <h3> {{article.title}} </h3>
        </template>
        <template #label>
          <div class="title">
            <img :src="article.aut_photo" alt="">
            <div>
              <p> {{article.aut_name}} </p>
              <p> {{article.pubdate}} </p>
            </div>
          </div>
          <div class="btn">
            <van-button type="info" v-if="article.is_followed" @click="Onfollow(false)">已关注</van-button>
            <van-button plain hairline type="info" v-else @click="Onfollow(true)">
              <van-icon name="plus" />
              <span class="title-content">关注</span>
            </van-button>
          </div>
        </template>
      </van-cell>
      <div class="content" v-html="article.content"></div>
      <van-cell class="thumbs">
        <span>End</span>
        <van-button color="red" plain v-if="article.attitude===-1" @click="Onthumbs(1)" class="like">
          <van-icon name="good-job-o" color="red" />
          <span style="color:red;">点赞</span>
        </van-button>
        <van-button color="red" v-if="article.attitude===1" @click="Onthumbs(-1)" class="like">
          <van-icon name="good-job" color="white" />
          <span style="color:white;">已点赞</span>
        </van-button>
      </van-cell>
      <Comment v-if="article.art_id" :id="article.art_id"></Comment>
    </van-cell-group>
  </div>
</template>

<script>
import { GetArticleDetailsAPI, PostUserFollowingsAPI, DeleteUserFollowingsAPI, PostArticleLikingsAPI, DeleteArticleLikingsAPI } from '@/API/ArticleAPI.js'
import Comment from './comments'

export default {
  name: 'ArticleDetails',
  data() {
    return {
      article: {}
    }
  },
  methods: {
    async GetArticleDetails() {
      const { data: res } = await GetArticleDetailsAPI(this.$route.params.id)
      this.article = res.data
      this.follow = res.data.is_followed
    },
    async Onfollow(val) {
      if (val) {
        this.article.is_followed = val
        await PostUserFollowingsAPI(this.article.aut_id)
      } else {
        this.article.is_followed = val
        await DeleteUserFollowingsAPI(this.article.aut_id)
      }
    },
    async Onthumbs(val) {
      if (val === 1) {
        this.article.attitude = val
        await PostArticleLikingsAPI(this.article.art_id)
      } else if (val === -1) {
        this.article.attitude = val
        await DeleteArticleLikingsAPI(this.article.art_id)
      }
    }
  },
  components: {
    Comment
  },
  created() {
    this.GetArticleDetails()
  }
}
</script>

<style lang="less" scope>
#details {
  margin: 0 20px;
  .content {
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;
    /deep/ img {
      width: 100%;
    }
    /deep/ pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .van-cell__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      display: flex;
      justify-content: center;
      width: 50px;
      height: 30px;
      padding: 0;
      .van-icon-plus {
        flex: 1;
        font-size: 10px;
        margin-right: 2px;
      }
      .title-content {
        flex: 1;
        font-size: 10px;
      }
    }
    .title {
      display: flex;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 5px;
      }
      p:first-child {
        color: black;
        font-size: 14px;
        margin-bottom: -5px;
      }
    }
  }
  .thumbs {
    .van-cell__value {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        margin: 15px 0 25px;
      }
      span {
        color: rgb(184, 184, 184);
      }
    }
  }
}
</style>
