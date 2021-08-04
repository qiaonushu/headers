<template>
  <div id="data">
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.push('/layout/user')" />
    <van-cell title="头像" is-link class="photo">
      <template>
        <img :src="photo" accept="image/*" alt="" class="img" @click="$refs.inp_file.click()">
        <input type="file" v-show="false" ref="inp_file" @change="setphoto">
      </template>
    </van-cell>
    <van-cell title="名称" is-link @click="modify" :value="setdata.name" />
    <van-cell title="生日" is-link @click="closeFn" v-model="setdata.birthday" />
    <van-dialog v-model="show" title="修改名称" show-cancel-button :before-close="close_dialog">
      <input type="text" class="inp" v-model="content" v-getFocus>
    </van-dialog>
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" v-show="birthday" @confirm="close_cell" />
  </div>
</template>

<script>
import { GetUserProfile, PatchUserPhoto, PatchUserProfile } from '@/API/UserAPI.js'
import { setStorage } from '@/utils/storage.js'
import moment from 'moment'
import 'moment/locale/zh-cn.js'

export default {
  data() {
    return {
      setdata: {},
      show: false,
      photo: '',
      content: '',
      birthday: false,
      minDate: new Date(1921, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    async setphoto(e) {
      const fn = new FormData()
      fn.append('photo', e.target.files[0])
      const { data: res } = await PatchUserPhoto(fn)
      this.photo = res.data.photo
      setStorage('photo', res.data.photo)
    },
    modify() {
      this.show = true
      this.content = this.setdata.name
    },
    closeFn() {
      this.birthday = true
      this.currentDate = new Date(this.setdata.birthday)
    },
    async close_dialog(action, done) {
      if (action === 'confirm') {
        if (/^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,7}$/.test(this.content)) {
          await PatchUserProfile({ name: this.content || '', birthday: this.date || '' })
          this.setdata.name = this.content
          done()
        } else {
          this.$toast('请输入1到7位数字字母中文')
          done(false)
        }
      } else {
        done()
      }
    },
    async close_cell() {
      const date = moment(this.currentDate).format('YYYY-MM-DD')
      this.setdata.birthday = date
      await PatchUserProfile({ name: this.content || '', birthday: date || '' })
      this.birthday = false
    }
  },
  async created() {
    const { data: res } = await GetUserProfile()
    this.setdata = res.data
    this.photo = res.data.photo
  }
}
</script>

<style lang="less" scope>
#data {
  .photo {
    line-height: 40px;
    .van-cell__right-icon {
      line-height: 40px;
    }
  }
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .name {
    text-align: center;
  }
  .inp {
    border: 0;
    text-align: center;
    padding-left: 60px;
  }
}
</style>
