import request from '@/utils/request.js'

// 获取文章分类
export const articleGetCateList = () => {
  return request.get('/my/cate/list')
}

// 新增文章分类
export const articleAddCate = (form) => {
  return request.post('/my/cate/add', form)
}

// 更新文章分类
export const articleUpdateCate = (form) => {
  return request.put('/my/cate/info', form)
}

// 删除文章分类
export const articleDelCate = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
