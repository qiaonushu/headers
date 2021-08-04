<template>
  <div id="app">
    <van-cell @click="showPopup" class="btn">
      <van-icon name="plus" />
    </van-cell>
    <!-- 频道页面主体区 -->
    <van-popup v-model="show" :overlay="false">
      <van-nav-bar title="频道管理" @click-right="onClickRight">
        <template #right>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
      <div class="title">
        <span class="label">我的频道</span>
        <span class="span">点击{{ is_state ?'删除':'进入'}}频道</span>
        <van-button size="small" type="primary" @click='click_btn'>{{is_state ? '完成' : '编辑'}}</van-button>
      </div>
      <van-grid :gutter="10">
        <van-grid-item v-for="item in channelsList" :key="item.id" @click="removeList(item.id)">
          <van-badge color="white" v-if="is_state">
            <template #content>
              <van-icon name="cross" />
            </template>
          </van-badge>
          <div class="item-text"> {{ item.name }} </div>
        </van-grid-item>
      </van-grid>
      <div class="text">点击添加更多频道：</div>
      <van-grid :gutter="10">
        <van-grid-item v-for="(item,index) in setChannel" :key="index" @click="addList(item.id)">
          <div class="item-text"> {{ item.name }} </div>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      show: false,
      is_state: false,
      arr: []
    }
  },
  props: ['is_id'],
  computed: {
    ...mapState('Home', ['channelsList', 'AllChannelsList']),
    // 未被选中的数组
    setChannel() {
      return this.AllChannelsList.filter(item => {
        return this.channelsList.findIndex(i => item.id === i.id) === -1
      })
    }
  },
  methods: {
    ...mapActions('Home', ['PutUserChannels']),
    showPopup() {
      this.show = true
    },
    onClickRight() {
      this.show = false
      // 调用Home.js中的更新列表接口
      this.PutUserChannels()
    },
    // 点击按钮修改页面显示文字
    click_btn() {
      if (this.is_state) {
        this.is_state = false
      } else {
        this.is_state = true
      }
    },
    // 添加频道事件
    addList(val) {
      if (!this.is_state) {
        this.setChannel.some((item, index) => {
          if (item.id === val) {
            this.channelsList.push(item)
            this.setChannel.splice(index, 1)
            return true
          }
        })
      }
    },
    // 删除频道事件
    removeList(val) {
      if (this.is_state) {
        this.channelsList.some((item, index) => {
          if (item.id === val && val !== 0) {
            this.channelsList.splice(index, 1)
            this.setChannel.push(item)
            return true
          }
        })
      } else {
        this.$emit('enterThisChannel', val)
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scope>
.van-popup--center {
  width: 100%;
  height: 100%;
}
.text {
  font-size: 14px;
  text-align: left;
  margin-left: 5px;
  height: 30px;
  line-height: 30px;
}
.van-badge {
  color: rgb(150, 150, 150);
  position: absolute;
  top: 0;
  right: 0;
}
.van-popup--center {
  line-height: 20px;
}
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .label {
    font-size: 15px;
    line-height: 30px;
    margin-left: 10px;
  }
  .span {
    margin-left: -180px;
    line-height: 30px;
    color: darkgray;
  }
}
</style>
