<template>
  <div class="app">
    {{ stateRef.age }}

    ---
    {{ state.age }}
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
const state = reactive({
  age: 20,
  name: '双越'
})
// 整个对象响应式 stateRef.age 和state.age 一起变化
const stateRef = toRefs(state)

setTimeout(() => {
  state.age = 30
}, 2000)
</script>
<style lang="less" scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
