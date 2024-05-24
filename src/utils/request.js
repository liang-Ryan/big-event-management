import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 请求携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }

    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 响应成功判断
    if (response.data.code === 0) {
      return response
    }

    // 响应错误处理
    ElMessage.error(response.data.message || '请求错误')
    return Promise.reject(response)
  },
  (err) => {
    // 错误特殊情况（权限不足）
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 响应错误默认处理
    ElMessage.error(err.response.data.message || '请求错误')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
