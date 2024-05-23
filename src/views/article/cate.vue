<script setup>
// 通用
import { ref } from 'vue'
import { cateDelCate, cateGetCateList } from '@/api/cate'

// 组件
import { Edit, Delete } from '@element-plus/icons-vue'
import editCateDialog from './components/editCateDialog.vue'
import { ElMessage } from 'element-plus'

// ==================================================
// 数据
// ==================================================

const loading = ref(false) // loading动画

const dialog = ref(null) // 文章操作弹窗组件

// ==================================================
// 获取分类
// ==================================================

const cateList = ref([])
const getCate = async () => {
  loading.value = true

  const {
    data: { data }
  } = await cateGetCateList()
  cateList.value = data

  loading.value = false
}
getCate()

// ==================================================
// 添加分类
// ==================================================

const addCate = () => {
  dialog.value.showDialog()
}

// ==================================================
// 编辑分类
// ==================================================

const editCate = (cate) => {
  dialog.value.showDialog(cate)
}
// ==================================================
// 删除分类
// ==================================================

const delCate = (cate) => {
  ElMessageBox.confirm('确定要删除该分类吗？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const {
        data: { message }
      } = await cateDelCate(cate.id)
      ElMessage.success(message)
      getCate()
    })
    .catch(() => {})
}
</script>

<template>
  <!-- top -->
  <pageContent title="文章分类">
    <template #button>
      <el-button @click="addCate">添加分类</el-button>
    </template>

    <!-- conntent -->
    <el-table :data="cateList" class="table-content" v-loading="loading">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column prop="" label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            :icon="Edit"
            circle
            @click="editCate(row)"
          ></el-button>
          <el-button
            type="danger"
            plain
            :icon="Delete"
            circle
            @click="delCate(row)"
          ></el-button>
        </template>
      </el-table-column>

      <!-- no data -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <!-- 编辑弹框 -->
    <editCateDialog ref="dialog" @submit="getCate()"></editCateDialog>
  </pageContent>
</template>

<style scoped>
.table-content {
  width: 100%;
}
</style>
