<script setup>
// 通用
import axios from 'axios'
import { ref, defineExpose, defineEmits } from 'vue'

// 组件
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { baseURL } from '@/utils/request'

import cateSelect from './cateSelect.vue'

// api
import {
  articleGetInfoAPI,
  articlePutUpdataAPI,
  articlePostAddAPI
} from '@/api/article'

const quillEditorRef = ref(null)

// =============================
// 开关
// =============================

const drawerVisible = ref(false) // 编辑抽屉开关

const isEdit = ref(false) // 判断新增文章 或 编辑文章

// =============================
// 表单
// =============================

// 表单数据
const articleFormDate = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
// 表单验证规则
const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传文章封面', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}
// 表单实例
const formRef = ref(null)

// =============================
// 重置表单
// =============================

const resetForm = () => {
  // 重置表单
  if (quillEditorRef.value) quillEditorRef.value.setHTML('')
  articleFormDate.value = {
    title: '',
    cate_id: '',
    cover_img: '',
    content: '',
    state: ''
  }
  imageUrl.value = ''
}

// =============================
// 表单转为formData
// =============================

// formData对象
const formData = new FormData()

// 转换函数
const toFormData = (formData, form) => {
  for (let key in form) {
    formData.append(key, form[key])
  }
}

// =============================
// 图片网络地址转为 file 对象
// =============================

const imageUrlToFile = async (imageUrl, filename) => {
  try {
    // 下载图片
    const image = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    // 图片转Blob对象
    const blob = new Blob([image.data], {
      type: image.headers['content-type']
    })

    // Blob转file
    const file = new File([blob], filename, {
      type: image.headers['content-type']
    })

    return file
  } catch (error) {
    console.error(error)
    return null
  }
}

// =============================
// 渲染抽屉
// =============================

const showDrawer = async (item) => {
  if (item.id) {
    isEdit.value = true

    const {
      data: { data }
    } = await articleGetInfoAPI(item.id)

    articleFormDate.value.id = data.id
    articleFormDate.value.title = data.title
    articleFormDate.value.cate_id = data.cate_id
    imageUrl.value = baseURL + data.cover_img
    articleFormDate.value.content = data.content
    articleFormDate.value.state = data.state
  } else {
    isEdit.value = false
    resetForm()
  }

  drawerVisible.value = true
}

defineExpose({
  showDrawer
})

// 退出时清空抽屉
const closeDrawer = () => {
  formRef.value.clearValidate()
  drawerVisible.value = false
}

// 本地图片预览
const imageUrl = ref('') // 本地图片地址
const selectImage = (image) => {
  imageUrl.value = URL.createObjectURL(image.raw)
  articleFormDate.value.cover_img = image.raw
}

// =============================
// 提交请求
// =============================

const emit = defineEmits(['submit'])

const submit = async (state) => {
  articleFormDate.value.state = state

  if (articleFormDate.value.id) {
    // 编辑文章

    // 图片url转file
    articleFormDate.value.cover_img = await imageUrlToFile(
      imageUrl.value,
      'BigEventArticleImage.jpg'
    )

    // 表单转formData
    toFormData(formData, articleFormDate.value)

    await formRef.value.validate()
    const {
      data: { message }
    } = await articlePutUpdataAPI(formData)
    ElMessage.success(message)

    emit('submit', 'edit')
  } else {
    // 添加文章

    // 表单转formData
    toFormData(formData, articleFormDate.value)

    await formRef.value.validate()
    const {
      data: { message }
    } = await articlePostAddAPI(formData)
    ElMessage.success(message)

    emit('submit', 'add')
  }

  drawerVisible.value = false
  resetForm()
}
</script>

<template>
  <el-drawer v-model="drawerVisible" :before-close="closeDrawer" size="50%">
    <el-form
      :model="articleFormDate"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="articleFormDate.title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章分类" prop="cate_id">
        <cateSelect v-model="articleFormDate.cate_id"></cateSelect>
      </el-form-item>

      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="selectImage"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"> <Plus /> </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            v-model:content="articleFormDate.content"
            content-type="html"
            ref="quillEditorRef"
          ></QuillEditor>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('已发布')">{{
          isEdit ? '提交修改' : '发布文章'
        }}</el-button>
        <el-button type="info" @click="submit('草稿')">保存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
// 上传图片
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
    }

    .el-upload {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .el-icon.avatar-uploader-icon {
      width: 178px;
      height: 178px;
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      font-size: 28px;
      color: #8c939d;
      text-align: center;
    }

    .avatar-uploader-icon:hover {
      border-color: var(--el-color-primary);
    }
  }
}

// 文本编辑器
.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
