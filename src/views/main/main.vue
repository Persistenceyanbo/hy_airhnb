<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-menu :isCollapse="isCollapse"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @foldChange="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <main-content></main-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import MainContent from '@/components/main-content/main-content.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
// 处理main-header中折叠的变化
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;

      background-color: #001529;
      transition: width 0.3s linear;
      &::-webkit-scrollbar {
        display: none;
      }
      transition: width 1s ease;
    }
    .el-main {
      height: 100%;
      background-color: pink;
    }
  }
}
</style>
