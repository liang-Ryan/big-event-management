// =================    导入    =====================

import { createRouter, createWebHistory } from 'vue-router'
// history模式：createWebHistory
// hash模式：createHashHistory
import { useUserStore } from '@/stores'

// ==================================================
// 路由配置
// ==================================================

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/index.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/manage.vue')
        },
        {
          path: 'article/cate',
          component: () => import('@/views/article/cate.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/avatar.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/profile.vue')
        },
        {
          path: '/user/resetPassword',
          component: () => import('@/views/user/resetPassword.vue')
        }
      ]
    }
  ]
})

// 路由前置守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

// ==================================================
// 导出
// ==================================================

export default router
