// 通用
import { ref } from 'vue'
import { defineStore } from 'pinia'

// api
import { userGetInfoAPI } from '@/api/user'

// ==================================================
// 用户信息
// ==================================================

export const useUserStore = defineStore(
  'userStore',
  () => {
    // ==================================================
    // 数据
    // ==================================================

    // 登录token
    const token = ref('')

    // 用户信息
    const userInfo = ref({})

    // ==================================================
    // 函数
    // ==================================================

    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }

    // 删除token
    const removeToken = () => {
      token.value = ''
    }

    // 获取用户信息
    const getUserInfo = async () => {
      const {
        data: { data }
      } = await userGetInfoAPI()
      userInfo.value = data
    }

    // 修改用户信息
    const setUserInfo = (newValue) => {
      userInfo.value = newValue
    }

    // ==================================================
    // 导出
    // ==================================================

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo,
      setUserInfo
    }
  },
  { persist: { key: 'big-event-userInfo' } }
)
