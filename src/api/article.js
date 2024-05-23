import request from '@/utils/request.js'

// 获取文章列表
export const articleGetList = (form) => {
  return request.get('/my/article/list', {
    params: {
      ...form
    }
  })
}
