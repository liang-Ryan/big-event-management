<script setup>
// 通用
import { ref } from 'vue'
import { useUserStore } from '@/stores'

// 组件
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

// api
import { userPatchAvatarAPI } from '@/api/user'

// =============================
// 数据
// =============================

const uploadRef = ref(null) // 获取upload组件实例

const avatar = ref('') // 头像

const {
  userInfo: { user_pic },
  getUserInfo
} = useUserStore()
avatar.value = user_pic

// =============================
// 本地图片预览
// =============================

const selectImage = (image) => {
  const reader = new FileReader()
  reader.readAsDataURL(image.raw)
  reader.onload = () => {
    avatar.value = reader.result
    console.log(avatar.value) // base64格式
  }
}

// =============================
// 提交上传请求
// =============================

const updataAvatar = async () => {
  const {
    data: { message }
  } = await userPatchAvatarAPI(avatar.value)
  ElMessage.success(message)
  getUserInfo()
}
</script>

<template>
  <pageContent title="更换头像">
    <el-upload
      class="avatar-uploader"
      ref="uploadRef"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="selectImage"
    >
      <img v-if="avatar" :src="avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"> <Plus /> </el-icon>
    </el-upload>
    <!-- <template #trigger> -->
    <el-button
      type="primary"
      :icon="Plus"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <!-- </template> -->
    <el-button type="success" :icon="Upload" @click="updataAvatar"
      >上传头像</el-button
    >
  </pageContent>
</template>

<style lang="scss" scoped>
// 上传图片
.avatar-uploader {
  :deep() {
    .avatar {
      width: 228px;
      height: 228px;
    }

    .el-upload {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .el-icon.avatar-uploader-icon {
      width: 228px;
      height: 228px;
      margin-bottom: 12px;
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
</style>
