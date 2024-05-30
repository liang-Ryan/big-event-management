import request from '@/utils/request.js'

// 注册申请
export const userPostRegisterAPI = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

// 登录申请
export const userPostLoginAPI = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 获取用户信息
export const userGetInfoAPI = () => {
  return request.get('/my/userinfo')
}

// 更新用户信息
export const userPostInfoAPI = (form) => {
  return request.put('/my/userinfo', form)
}

// 更新用户头像
export const userPatchAvatarAPI = (image) => {
  return request.patch('/my/update/avatar', {
    avatar: image
  })
}

// 更新用户密码
export const userPatchPasswordAPI = (form) => {
  return request.patch('/my/updatepwd', form)
}
