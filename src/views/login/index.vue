<script setup>
// 通用
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { userRegisterService, userLoginService } from '@/api/user'

// 组件
import { User, Lock } from '@element-plus/icons-vue'

// 注册
const router = useRouter()
const userStore = useUserStore()

// =================================================
// 切换注册和登录
// =================================================

const isRegister = ref(false)
watch(isRegister, () => {
  formData.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

// =================================================
// 数据
// =================================================

// 获取表单实例
const form = ref()

// 表单数据
const formData = ref({
  username: '',
  password: '',
  repassword: ''
})

// =================================================
// 注册
// =================================================

// 注册校验规则
const registerRules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }, // 非空校验
    { min: 5, max: 10, message: '用户名长度应为 5~10个 字符', trigger: 'blur' } // 长度校验
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      // 正则检验（包含长度校验）
      pattern: /^\S{6,15}$/,
      message: '密码应为 6~15个 非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      // 密码二次验证
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback() // 校验成功
        }
      },
      trigger: 'blur'
    }
  ]
}
// 提交注册申请
const register = async () => {
  await form.value.validate()

  const {
    data: { message }
  } = await userRegisterService(formData.value)
  ElMessage.success(message)

  isRegister.value = false
}

// =================================================
// 登录
// =================================================

// 登录校验规则
const loginRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}

// 提交登录申请
let loginTimeout = ref(null)
onUnmounted(() => {
  if (loginTimeout.value) clearTimeout(loginTimeout.value)
})

const login = async () => {
  await form.value.validate()

  const {
    data: { message, token }
  } = await userLoginService(formData.value)
  ElMessage.success(message)
  userStore.setToken(token)

  loginTimeout.value = setTimeout(() => {
    router.push('/')
  }, 1000)
}

// =================================================
// =================================================
</script>

<template>
  <div class="main-contain">
    <el-row class="login-page">
      <!-- 左侧logo -->
      <el-col :span="12" class="background-img"></el-col>

      <!-- 右侧功能区 -->
      <el-col :span="6" :offset="3" class="form">
        <!-- 注册页面 -->
        <el-form
          :model="formData"
          :rules="registerRules"
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
        >
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="formData.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="formData.password"
            ></el-input>
          </el-form-item>

          <el-form-item prop="repassword">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
              v-model="formData.repassword"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="button"
              type="primary"
              auto-insert-space
              @click="register"
            >
              注册
            </el-button>
          </el-form-item>

          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false">
              ← 返回
            </el-link>
          </el-form-item>
        </el-form>

        <!-- 登录页面 -->
        <el-form
          :model="formData"
          :rules="loginRules"
          ref="form"
          size="large"
          autocomplete="off"
          v-else
        >
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="formData.username"
              @keyup.enter="login"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="formData.password"
              @keyup.enter="login"
            ></el-input>
          </el-form-item>

          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              class="button"
              type="primary"
              auto-insert-space
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>

          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true">
              注册 →
            </el-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  // 左侧logo
  .background-img {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  // 右侧表单
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
