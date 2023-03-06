<template>
  <div class="main-header">
    <div class="content-left">
      <div class="menu-icon" @click="isOpen">
        <el-icon size="28">
          <component :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
      <div class="breadcrumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/">promotion management</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content-right">
      <div class="infos"><header-infos /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import headerInfos from './c-cpns/header-info.vue'
const isFold = ref(false)
// 内部自定义事件
const emit = defineEmits(['foldChange'])
const isOpen = () => {
  // 内部改变状态
  isFold.value = !isFold.value
  // 2. 将我们的事件&状态传递出去
  emit('foldChange', isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .content-left {
    display: flex;
    align-items: center;
    .menu-icon {
      margin-right: 10px;
    }
  }
}
</style>
