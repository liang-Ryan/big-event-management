<script setup>
// 通用
import { ref } from 'vue'
import { useUserStore } from '@/stores'

// 组件
import { ElMessage } from 'element-plus'

// api
import { userUpdateAPI } from '@/api/user'

// =============================
// 数据
// =============================

const formRef = ref('')

// =============================
// 获取用户信息
// =============================

const {
  userInfo: { id, username, nickname, email },
  getUserInfo
} = useUserStore()

// =============================
// 表单
// =============================

// 表单数据
const userProfileFormData = ref({
  id: id,
  username: username,
  nickname: nickname,
  email: email
})

// 表单规则
const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称长度应为2~10个非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
}

// =============================
// 提交修改请求
// =============================

const updateProfile = async () => {
  await formRef.value.validate()
  const {
    data: { message }
  } = await userUpdateAPI(userProfileFormData.value)
  getUserInfo()
  ElMessage.success(message)
}
</script>

<template>
  <pageContent title="基本资料">
    <el-form
      :model="userProfileFormData"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="登录用户">
        <el-input v-model="userProfileFormData.username" disabled />
      </el-form-item>

      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userProfileFormData.nickname" />
      </el-form-item>

      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userProfileFormData.email" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="updateProfile">提交修改</el-button>
  </pageContent>
</template>

<style scoped>
.el-button {
  margin-left: 100px;
}
</style>
