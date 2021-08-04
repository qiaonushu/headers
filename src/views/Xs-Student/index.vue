<template>
  <div id="container">
    <van-nav-bar title="小思同学" left-arrow @click-left="$router.back()" />
    <div class="list">
      <div v-for="item,index in list" :key="index">
        <div class="xs" v-if="item.name==='xs'">
          <van-image round fit="cover" width="1.5rem" height="1.5rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" class="img" />
          <div class="text">
            <div class="icon"></div>
            {{item.msg}}
          </div>
        </div>
        <div class="me" v-if="item.name==='me'">
          <van-image round fit="cover" width="1.5rem" height="1.5rem" :src="photo" class="img" />
          <div class="text">
            <div class="icon"></div>
            {{item.msg}}
          </div>
        </div>
      </div>
    </div>
    <van-tabbar class="footer">
      <input type="text" placeholder="说点什么..." v-model="value" v-getFocus>
      <button @click="sendFn">提交</button>
    </van-tabbar>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import store from '@/store'
import { GetUserAPI } from '@/API/UserAPI.js'
import { getStorage, setStorage } from '@/utils/storage.js'

export default {
  data() {
    return {
      photo: getStorage('photo'),
      value: '',
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }
      ],
      // 定义一个变量来接收引入的scoket实例
      scoket: null
    }
  },
  methods: {
    sendFn() {
      if (this.value === '') {
        return this.$toast('输入框不能为空')
      }
      // 向后端发送数据，后端在接收时，也就是监听send事件
      // this.scoket.emit('monitorName',sendData)
      // monitorName：监听标识自定义的，和后端约定好
      // sendData：可以是字符串，{}，JSON对象，向后端发送过去的数据
      this.list.push({ name: 'me', msg: this.value })
      this.scoket.emit('message', {
        msg: this.value,
        timestamp: new Date().getTime()
      })
      this.value = ''
    },
    async getUser() {
      const { data } = await GetUserAPI()
      setStorage('photo', data.data.photo)
    }
  },
  created() {
    // 和后端建立连接
    this.scoket = io('http://toutiao.itheima.net', {
      query: {
        token: store.state.Login.token
      },
      transports: ['websocket']
    })
    // 监听后端推送过来的数据
    // this.scoket.on('monitorName',callBack)
    // monitorName：监听标识自定义的，和后端约定好
    // callBack：是一个会回调函数，里面的参数就是后端发送过来的数据
    this.scoket.on('message', data => {
      // 后端推送过来的数据
      this.list.push({ name: 'xs', msg: data.msg })
    })
    this.getUser()
    // scoket.on(),scoket.emit()方法，在前后端是成对出现的
  }
}
</script>

<style lang="less" scoped>
#container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #fafafa;
  box-sizing: border-box;
  .footer {
    input {
      border: 0;
      padding-left: 20px;
      width: 80%;
      font-size: 17px;
    }
    input::-webkit-input-placeholder {
      color: rgb(207, 207, 207);
      font-size: 15px;
    }
    button {
      font-size: 15px;
      border: 0;
      background-color: #fff;
      color: rgb(190, 190, 190);
    }
  }
  .list {
    background: #fafafa;
    padding: 10px 10px 65px 10px;
    .xs,
    .me {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 17px;
      .icon {
        width: 10px;
        height: 10px;
        background-color: rgb(224, 239, 251);
        transform: rotate(45deg);
        border-left: 0.5px solid #c2d9ea;
        border-bottom: 0.5px solid #c2d9ea;
        z-index: 1;
      }
      .text {
        background-color: rgb(224, 239, 251);
        border: 0.5px solid #c2d9ea;
        padding: 0 7px;
        height: 40px;
        line-height: 40px;
      }
    }
    .me {
      transform: rotate(180deg);
      .text {
        transform: rotate(180deg);
        padding: 0 7px;
      }
      .img {
        transform: rotate(180deg);
        margin-right: 20px;
      }
      .icon {
        transform: rotate(-135deg);
        position: absolute;
        right: -6px;
        top: 15px;
      }
    }
    .xs {
      .img {
        margin-right: 20px;
      }
      .icon {
        position: absolute;
        left: 72px;
        top: 22px;
      }
    }
  }
}
</style>
