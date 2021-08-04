<template>
  <div>
    <van-cell>
      <van-icon name="cross" @click.stop="clickShow" />
    </van-cell>
    <van-action-sheet v-model="show" :actions="actions" :cancel-text="text" :close-on-click-action="state" @select="content" @cancel="closeSheet" get-container="body" />
    <van-action-sheet v-model="newshow" :title="nameText" get-container="body" :closeable="btn" className="con_text" :close-on-click-overlay="false" @click="click_close">
      <template #description>
        <textarea class="inp_text" placeholder="请描写问题信息" v-model="textContent"></textarea>
      </template>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      btn: true,
      nameText: '',
      textContent: '',
      newshow: false,
      state: false,
      text: '取消',
      show: false,
      actions: [],
      firstTitle: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }],
      secondTitle: [
        { name: '其他问题', type: 0, subname: '必须填写问题信息' },
        { name: '标题夸张', type: 1 },
        { name: '低俗色情', type: 2 },
        { name: '错别字多', type: 3 },
        { name: '旧文重复', type: 4 },
        { name: '内容不实', type: 6 },
        { name: '侵权', type: 8 },
        { name: '广告软文', type: 5 },
        { name: '涉嫌犯罪', type: 7 }
      ]
    }
  },
  props: {
    is_id: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('Article', ['Postdislikes', 'Postreports']),
    // 点击secondShow中的取消按钮将显示firstShow中的内容
    closeSheet() {
      // 判断aactions显示哪个数组
      if (this.actions === this.secondTitle) {
        // 在这个数组中点击返回显示first数组中的内容，并显示面板
        this.text = '取消'
        this.show = true
        this.actions = this.firstTitle
      } else if ((this.actions = this.firstTitle)) {
        // 在这个数组中隐藏面板
        this.show = false
      }
    },
    clickShow() {
      // 点击X，显示firstTitle中的内容
      this.show = true
      this.actions = this.firstTitle
    },
    content(e) {
      // 判断是否点击了'反馈垃圾内容'选项，点击则显示secondShow的内容
      if (e.name === '反馈垃圾内容') {
        this.text = '返回'
        this.actions = this.secondTitle
      } else if (e.name === '不感兴趣') {
        this.postDislikes()
        this.$emit('content', this.is_id)
      }
      // 判断点击的是否有type有则显示描述信息，0为false但也要进入
      if (e.type) {
        this.newshow = true
        this.show = false
        this.nameText = e.name
      } else if (e.type === 0) {
        this.nameText = e.name
        this.newshow = true
        this.show = false
        this.btn = false
      }
      this.textContent = ''
    },
    // 接口文档要求如果是其他问题要有问题描述
    click_close() {
      if (this.nameText === '其他问题') {
        if (this.textContent) {
          this.btn = true
          this.newshow = false
        } else {
          this.newshow = true
          this.$toast('请输入描写信息')
        }
      } else {
        this.btn = true
        this.newshow = false
      }
      this.postReports()
    },
    // 调用Article.js中的将不感兴趣文章的Id传入接口
    async postDislikes() {
      try {
        await this.Postdislikes({ target: this.is_id })
      } catch (err) {
        console.error(err)
      }
    },
    // 反馈接口
    async postReports() {
      try {
        const { data } = await this.Postreports({ target: this.is_id, type: this.type, remark: this.textContent || '' })
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="less" scope>
.titleContent {
  padding: 16px 16px 160px;
  border: 0;
}
.con_text {
  width: 100%;
}
.inp_text {
  border: 0;
  width: 100%;
  height: 200px;
}
</style>
