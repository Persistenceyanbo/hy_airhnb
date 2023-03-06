import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 路由最重要的是映射关系 // path -> component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue'),
      children: [
        {
          path: '/main/analysis/overview',
          component: () => import('@/views/main/analysis/analysis.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})
// 路由导航守卫
/**
 * 1.参数：to(跳转到的位置) / from (从哪里跳转过来)
 * 2. 返回值： 返回值决定导航的路径
 * 举个例子：/login => path
 * to: /login from 返回值: /abc
 */
router.beforeEach((to, from) => {
  // 只有登录成功才能真正进入登录界面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (!token && to.path === '/main') return '/login'
})

export default router
