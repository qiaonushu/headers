<template>
  <div id="user">
    <van-loading size="24px" v-if="!User.photo" class="loading">加载中...</van-loading>
    <div v-else>
      <div class="title">
        <div class="top">
          <div>
            <img :src="User.photo" alt="">
          </div>
          <div class="intro">
            <div> {{User.name}} </div>
            <div>申请认证</div>
          </div>
        </div>
        <div class="bottom">
          <div>
            <span> {{User.art_count}} </span>
            <span> {{User.follow_count}} </span>
            <span> {{User.fans_count}} </span>
          </div>
          <div>
            <span>动态</span>
            <span>关注</span>
            <span>粉丝</span>
          </div>
        </div>
      </div>
      <van-cell title="编辑资料" icon="edit" is-link to="setdata" />
      <van-cell title="小思同学" icon="chat-o" is-link to="/xs" />
      <van-cell title="退出登录" icon="warning-o" is-link @click="signOut" />
      <van-dialog v-model="show" title="提示" message="这就走了?不爱我了吗?" show-cancel-button @confirm="determine" />
    </div>
  </div>
</template>

<script>
import { GetUserAPI } from '@/API/UserAPI.js'
import { removeStorage, getStorage } from '@/utils/storage.js'

export default {
  data() {
    return {
      User: {},
      show: false,
      photo: ''
    }
  },
  methods: {
    signOut() {
      this.show = true
    },
    determine() {
      removeStorage('token')
      removeStorage('refresh_token')
      this.$store.commit('Login/setToken', '')
      this.$store.commit('Login/setRefresh_Token', '')
      this.$router.replace('/login')
    }
  },
  async created() {
    const { data: res } = await GetUserAPI()
    this.User = res.data
    this.photo = getStorage('photo') || this.User.photo
  }
}
</script>

<style lang="less" scope>
#user {
  .title {
    display: flex;
    flex-direction: column;
    background: #007bff;
    height: 200px;
    color: white;
    .top {
      display: flex;
      margin: 30px 10px;
      margin-bottom: 0;
      div {
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .intro {
        font-size: 15px;
        margin: 5px 10px;
        div:last-child {
          margin-top: 5px;
          padding: 2px;
          font-size: 12px;
          background-color: #fff;
          color: #007bff;
          border-radius: 5%;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 70px;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        text-align: center;
        span {
          flex: 1;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
