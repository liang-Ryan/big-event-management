import { createRouter, createWebHistory } from 'vue-router'
// history模式：createWebHistory
// hash模式：createHashHistory

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
          path: 'article/channel',
          component: () => import('@/views/article/channel.vue')
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

export default router
