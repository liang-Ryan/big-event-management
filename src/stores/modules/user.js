// 通用
import { ref } from 'vue'
import { defineStore } from 'pinia'

// 数据
export const useUserStore = defineStore(
  'userStore',
  () => {
    // 登录token
    const token = ref('')

    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }

    // 删除token
    const removeToken = () => {
      token.value = ''
    }

    // 导出
    return {
      token,
      setToken,
      removeToken
    }
  },
  { persist: { key: 'big-event-userInfo' } }
)
