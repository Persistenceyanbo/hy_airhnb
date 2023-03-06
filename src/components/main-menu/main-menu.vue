<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isCollapse" class="title">弘源管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        default-active="3"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isCollapse"
      >
        <!--遍历整个菜单-->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import useLoginStore from '@/store/login/login'
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
// 获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
console.log(userMenus, 'userMenus')
// const isCollapse = ref(true)
const handleOpen = () => {}
const handleClose = () => {}
</script>
<style lang="less" scoped>
.main-menu {
  // width: 210px;
  height: 100%;
  background-color: #001529;
  .logo {
    height: 28px;
    padding: 12px 8px 8px 8px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    overflow: hidden;
    img {
      width: 30px;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}
.el-menu-item {
  padding-left: 50px !important;
}
.el-sub-menu {
  background-color: #0c2135;
  .el-menu-item:hover {
    color: #fff;
    &.is-active {
      background-color: #0a60bd;
    }
  }
}
.el-menu-item.is-active {
  background-color: #0a60bd;
}
</style>
