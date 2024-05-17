<script setup>
// 通用
import { ref, computed, onUnmounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

// 组件
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'

// 注册
const userStore = useUserStore()
const router = useRouter()

// ==================================================
// 用户信息
// ==================================================

userStore.getUserInfo()

const username = computed(() => {
  return userStore.userInfo.username
})
const nickname = computed(() => {
  return userStore.userInfo.nickname
})
const user_pic = computed(() => {
  return userStore.userInfo.user_pic || '@/assets/default.png'
})

// ==================================================
// 用户头像下拉栏
// ==================================================

let timer = ref(null)
onUnmounted(() => {
  if (timer.value) clearTimeout(timer.value)
})

const commandFn = (key) => {
  if (key === 'logout') {
    // 退出账号
    ElMessageBox.confirm('确定要退出登录吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        userStore.setUserInfo({})
        userStore.removeToken()
        ElMessage.success('退出成功')
        timer.value = setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
      .catch(() => {})
  } else {
    // 跳转链接
    router.push(`/user/${key}`)
  }
}

// ==================================================
</script>

<template>
  <el-container class="main-content">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>

      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>

        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>

        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>

          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>

          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>

          <el-menu-item index="/user/resetPassword">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <div>
          黑马程序员：<strong>{{ nickname || username }}</strong>
        </div>

        <el-dropdown placement="bottom-end" @command="commandFn">
          <span class="el-dropdown__box">
            <el-avatar :src="user_pic" />
            <el-icon><CaretBottom /></el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="resetPassword" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- 主窗口 -->
      <el-main>
        <router-view></router-view>
      </el-main>

      <!-- footer -->
      <el-footer>大事件 ©2024 Created by {{ nickname || username }}</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.main-content {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
