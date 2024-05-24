import request from '@/utils/request.js'

// 获取文章列表
export const articleGetList = (form) => {
  return request.get('/my/article/list', {
    params: {
      ...form
    }
  })
}

// 发布文章
export const articleAdd = (form) => {
  return request.post('/my/article/add', form)
}

// 获取文章详情
export const articleGet = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}

// 更新文章详情
export const articleUpdata = (form) => {
  return request.put('/my/article/info', form)
}

// 删除文章
export const articleDel = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id
    }
  })
}
