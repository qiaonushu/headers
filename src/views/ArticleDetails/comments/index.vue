<template>
  <div id="comment">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset='10' ref="comment">
      <van-cell v-for="(item,index) in comment" :key="index">
        <div class="top">
          <div class="title">
            <img :src="item.aut_photo" alt="">
            <span> {{item.aut_name}} </span>
          </div>
          <div class="comment">
            <van-icon name="like" color="red" v-if="item.is_liking" @click="OnLike(item,false)" />
            <van-icon name="like-o" color="gray" v-else @click="OnLike(item,true)" />
          </div>
        </div>
        <div class="bottom">
          <div> {{item.content}} </div>
          <span> {{item.pubdate}} </span>
        </div>
      </van-cell>
    </van-list>
    <van-tabbar class="footer">
      <div class="publish" v-if="inp_state">
        <van-icon name="arrow-left" class="left" @click="$router.push('/layout/home')" />
        <div class="comm">
          <span></span>
          <div @click="toggle">发表评论</div>
          <span></span>
        </div>
        <van-icon name="comment-o" :badge="count" @click="Fn" v-if="count" class="mm" />
        <van-icon name="comment-o" v-else class="mm" />
        <van-icon name="star-o" />
        <van-icon name="share-o" />
      </div>
      <div class="inp_content" v-else>
        <textarea v-model="text_content" v-getFocus placeholder="友善评论、理性发言、阳光心灵" @blur="loseFocs"></textarea>
        <button :disabled="btn" @click="click_publish()">发布</button>
      </div>
    </van-tabbar>
  </div>
</template>

<script>
import { GetCommentsAPI, PostCommentLikingsAPI, DeleteCommentLikingsAPI, PostCommentsAPI } from '@/API/CommentAPI.js'
export default {
  data() {
    return {
      comment: [],
      last_id: '',
      loading: true,
      finished: false,
      count: 0,
      inp_state: true,
      text_content: '',
      btn: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    // 获取评论列表
    async GetComments() {
      // 下拉时将loading改为false表示上次请求已完成可以再次发送请求
      this.loading = false
      // 发送请求获取评论
      const { data: res } = await GetCommentsAPI({ source: this.id, offset: this.last_id })
      // 拼接数组
      if (res.data.total_count > 99) {
        this.count = 99 + '+'
      } else {
        this.count = res.data.total_count
      }
      this.comment = [...this.comment, ...res.data.results]
      // 判断返回数据中是否有下一页数据的必备参数,有就加载,没有就将finished改为true
      if (res.data.last_id) {
        this.last_id = res.data.last_id
      } else {
        this.finished = true
      }
    },
    // 评论喜欢接口
    async OnLike(item, val) {
      if (val) {
        item.is_liking = val
        await PostCommentLikingsAPI(item.com_id)
      } else {
        item.is_liking = val
        await DeleteCommentLikingsAPI(item.com_id)
      }
    },
    // 发布接口
    async click_publish() {
      if (this.text_content) {
        this.btn = false
        try {
          await PostCommentsAPI({
            target: this.id,
            content: this.text_content
          })
          this.count++
          this.text_content = ''
          this.Fn()
        } catch (err) {
          console.error(err)
        }
      } else {
        this.btn = true
      }
      this.inp_state = true
    },
    // 下拉刷新
    onLoad() {
      this.loading = true
      this.GetComments()
    },
    // 切换发布框和输入框
    toggle() {
      this.inp_state = false
    },
    // 输入框失去焦点事件
    loseFocs() {
      if (this.text_content) {
        this.inp_state = false
      } else {
        this.inp_state = true
      }
    },
    // 将滚动条滚动到发表的最新评论位置
    Fn() {
      document.querySelector('.like').scrollIntoView({
        behavior: 'smooth'
      })
    }
  },
  created() {
    this.GetComments()
  }
}
</script>

<style lang="less" scope>
#comment {
  margin-top: 50px;
  margin-bottom: 40px;
  .footer {
    height: auto;
    .publish {
      position: relative;
      height: 30px;
      padding: 10px 0;
      width: 100%;
      .mm {
        margin-left: 265px;
        margin-top: 7px;
      }
      .van-icon-star-o {
        position: absolute;
        top: 16px;
        right: 50px;
      }
      .left {
        position: absolute;
        top: 16px;
        left: 10px;
      }
      .van-icon-share-o {
        position: absolute;
        top: 16px;
        right: 20px;
      }
      .comm {
        display: flex;
        position: absolute;
        top: 10px;
        left: 35px;
        width: 220px;
        span {
          display: block;
          flex: 1;
          width: 15px;
          height: 30px;
          border-radius: 20px 0 0 20px;
          border-left: 1px solid rgb(209, 207, 207);
          border-top: 1px solid rgb(209, 207, 207);
          border-bottom: 1px solid rgb(209, 207, 207);
        }
        span:last-child {
          transform: rotate(180deg);
        }
        div {
          flex: 3;
          border-top: 1px solid rgb(209, 207, 207);
          border-bottom: 1px solid rgb(209, 207, 207);
          border-right: 0;
          border-left: 0;
          line-height: 30px;
          text-align: left;
          font-size: 14px;
          background: white;
        }
      }
    }
    .inp_content {
      display: flex;
      background: rgb(249, 249, 249);
      width: 100%;
      padding-top: 5px;
      textarea {
        flex: 5;
        border: 1px solid rgb(243, 243, 243);
        background: rgb(249, 249, 249);
        height: 70px;
        color: rgb(131, 133, 138);
        border-radius: 5px;
        font-size: 14px;
        overflow: hidden;
      }
      button {
        flex: 1;
        background: rgb(249, 249, 249);
        color: rgb(170, 170, 170);
        color: black;
        border: 0;
        font-size: 16px;
      }
    }
  }
  .top {
    display: flex;
    .title {
      flex: 1;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span {
        position: absolute;
        top: 10px;
        left: 70px;
      }
    }
    .comment {
      flex: 1;
      text-align: right;
    }
  }
  .bottom {
    margin-top: 5px;
    div {
      margin-left: 20px;
    }
    span {
      color: rgb(184, 184, 184);
    }
  }
}
</style>
