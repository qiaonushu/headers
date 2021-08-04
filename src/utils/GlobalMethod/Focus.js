// 定义input框自动获取焦点
// 引入vue
import Vue from 'vue'
// 在Vue中定义自定义指令
Vue.directive('getFocus', {
  // 固定写法inserted插入，还有bind绑定，updata更新
  inserted(el) {
    // el表示当前标签，获取当前标签里的input标签，使用自动获取焦点事件
    fn(el)
  },
  update(el) {
    // el表示当前标签，获取当前标签里的input标签，使用自动获取焦点事件
    fn(el)
  }
})

function fn(el) {
  if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
    el.focus()
  } else if (el.querySelector('input')) {
    el.querySelector('input').focus()
  } else if (el.querySelector('textarea')) {
    el.querySelector('textarea').focus()
  }
}

// 在main.js中全局引入
