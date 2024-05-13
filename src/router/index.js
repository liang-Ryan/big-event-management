import { createRouter, createWebHistory } from 'vue-router'
// history模式：createWebHistory
// hash模式：createHashHistory

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
