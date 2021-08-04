<template>
  <div id="layout">
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部路由链接 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style>
</style>
