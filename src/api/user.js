import request from '@/utils/request.js'

// 注册申请
export const userRegister = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

// 登录申请
export const userLogin = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 获取用户信息
export const userGetInfo = () => {
  return request.get('/my/userinfo')
}
