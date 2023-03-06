<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs
        v-model="activeName"
        type="card"
        class="login-tabs"
        stretch
        @tab-click="handleClick"
      >
        <!-- 账号登录的pane -->
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <div class="text">手机登录</div>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox
        v-model="isRemPwd"
        size="large"
        label="记住密码"
      ></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      type="primary"
      class="login-btns"
      size="large"
      @click="accountLogin"
      >立即登录</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { ISREMPWD } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

// 初始化
const isRemPwd = ref<boolean>(localCache.getCache(ISREMPWD) ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache(ISREMPWD, newValue)
})
const activeName = ref('account')
// InstanceType<typeof PaneAccount> 表示PaneAccount这个对象的实例
const accountRef = ref<InstanceType<typeof PaneAccount>>()
const handleClick = () => {}
const accountLogin = () => {
  if (activeName.value === 'account') {
    // 1. 获取子组件的实例  ?.表示可选链
    accountRef.value?.loginAction(isRemPwd.value)
    // 2. 调用方法
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 333px;
  margin-bottom: 150px;
  background-color: #fff;
  padding: 20px;
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
  }
  .login-btns {
    width: 100%;
  }
}
</style>
