<script setup>
// 通用
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

// 组件
import { ElMessage } from 'element-plus'

// api
import { userPatchPasswordAPI } from '@/api/user'

// =============================
// 数据
// =============================

const passwordFormRef = ref(null) // 获取表单实例

// =============================
// 表单
// =============================

// 表单数据
const passwordForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 校验规则
const rules = {
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    {
      // 正则检验（包含长度校验）
      pattern: /^\S{6,15}$/,
      message: '密码应为 6~15个 非空字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    {
      // 正则检验（包含长度校验）
      pattern: /^\S{6,15}$/,
      message: '密码应为 6~15个 非空字符',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '确认新密码不能为空', trigger: 'blur' },
    {
      // 密码二次验证
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.new_pwd) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback() // 校验成功
        }
      },
      trigger: 'blur'
    }
  ]
}

// =============================
// 重置表单
// =============================

const resetForm = () => {
  passwordFormRef.value.resetFields()
}

// =============================
// 提交修改密码请求
// =============================

const router = useRouter()
const userStore = useUserStore()

let loginTimeout = ref(null)
onUnmounted(() => {
  if (loginTimeout.value) clearTimeout(loginTimeout.value)
})

const updataPassword = async () => {
  await passwordFormRef.value.validate()
  const {
    data: { message }
  } = await userPatchPasswordAPI(passwordForm.value)
  ElMessage.success(message)

  // 退出重新登录
  userStore.setToken('')
  userStore.setUserInfo({})

  loginTimeout.value = setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>

<template>
  <pageContent title="重置密码">
    <!-- 表单区 -->
    <el-form
      :model="passwordForm"
      :rules="rules"
      ref="passwordFormRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          type="password"
          show-password
          v-model="passwordForm.old_pwd"
        ></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          type="password"
          show-password
          v-model="passwordForm.new_pwd"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input
          type="password"
          show-password
          v-model="passwordForm.re_pwd"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 功能区 -->
    <div class="button-content">
      <el-button type="primary" @click="updataPassword">修改密码</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </pageContent>
</template>

<style scoped>
.el-form {
  max-width: 50%;
}

.button-content {
  margin-left: 100px;
}
</style>
