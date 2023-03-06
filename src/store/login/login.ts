import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getRoleMenu
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      // 账号登录，获取token信息
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 3.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // 根据角色的请求用户的权限(菜单menus)
      const userMenuResult = await getRoleMenu(this.userInfo.role.id)
      const userMenus = userMenuResult.data
      this.userMenus = userMenus
      // 将数据存在本地缓存中
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)
      // 4. 页面跳转
      router.push('/main')
    }
  }
})
export default useLoginStore
