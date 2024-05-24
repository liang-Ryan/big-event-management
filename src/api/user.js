import request from '@/utils/request.js'

// 注册申请
export const userRegisterAPI = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

// 登录申请
export const userLoginAPI = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 获取用户信息
export const userGetInfoAPI = () => {
  return request.get('/my/userinfo')
}
