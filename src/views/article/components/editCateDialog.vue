<script setup>
// 通用
import { ref, defineExpose, defineEmits } from 'vue'

// 组件
import { ElMessage } from 'element-plus'

// api
import { catePostAddAPI, catePutUpdateAPI } from '@/api/cate'

// ==================================================
// 表单
// ==================================================

// 表单数据
const cateFormData = ref({
  cate_name: '',
  cate_alias: ''
})
// 表单验证规则
const rules = {
  cate_name: [
    { required: true, message: '分类名称不能为空', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名应为 1~10 位非空字符' }
  ],
  cate_alias: [
    { required: true, message: '分类别名不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类名应为 1~15 位字母或数字' }
  ]
}

// 表单实例
const formRef = ref(null)

// ==================================================
// 开关
// ==================================================

const dialogVisible = ref(false) // 弹窗判断开关

// ==================================================
// 渲染弹窗
// ==================================================

const showDialog = (item) => {
  cateFormData.value = { ...item }
  dialogVisible.value = true
}

defineExpose({
  showDialog
})
// ==================================================
// 提交请求
// ==================================================

// 父组件监听事件
const emit = defineEmits(['submit'])

const submit = async () => {
  await formRef.value.validate()

  if (cateFormData.value.id) {
    // 更新分类
    const {
      data: { message }
    } = await catePutUpdateAPI(cateFormData.value)
    ElMessage.success(message)
  } else {
    // 添加分类
    const {
      data: { message }
    } = await catePostAddAPI(cateFormData.value)
    ElMessage.success(message)
  }

  emit('submit')
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="cateFormData.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form :model="cateFormData" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          placeholder="请输入分类名称"
          v-model="cateFormData.cate_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          placeholder="请输入分类别名"
          v-model="cateFormData.cate_alias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit(cateFormData)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
