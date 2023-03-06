<template>
  <div class="account">
    <el-form
      label-width="60px"
      size="large"
      style="max-width: 460px"
      :model="account"
      :rules="rules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  type FormRules,
  type FormInstance,
  type ElForm,
  ElMessage
} from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_NAME, LOGIN_PASSWORD, ISREMPWD } from '@/global/constants'

// 定义account数据 响应式对象
const account = reactive<IAccount>({
  name: localCache.getCache(LOGIN_NAME) ?? '',
  password: localCache.getCache(LOGIN_PASSWORD) ?? ''
})
// 定义校验规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须输入6-20位数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须输入3位以上的数字或者字母组成',
      trigger: 'blue'
    }
  ]
})
// 执行账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      // 向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then((res) => {
        if (isRemPwd) {
          localCache.setCache(LOGIN_NAME, name)
          localCache.setCache(LOGIN_PASSWORD, password)
        } else {
          localCache.removeCache(LOGIN_NAME)
          localCache.removeCache(LOGIN_PASSWORD)
          localCache.removeCache(ISREMPWD)
        }
      })
    } else {
      ElMessage.error('请输入正确的格式，在进行校验')
    }
  })
}
// 父组件想用子组件方法，必须将该方法暴漏出去
defineExpose({
  loginAction
})
</script>
<style lang="less" scoped></style>
