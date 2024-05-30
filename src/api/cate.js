import request from '@/utils/request.js'

// 获取文章分类
export const cateGetListAPI = () => {
  return request.get('/my/cate/list')
}

// 新增文章分类
export const catePostAddAPI = (form) => {
  return request.post('/my/cate/add', form)
}

// 更新文章分类
export const catePutUpdateAPI = (form) => {
  return request.put('/my/cate/info', form)
}

// 删除文章分类
export const cateDeleteAPI = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
