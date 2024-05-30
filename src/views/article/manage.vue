<script setup>
// 通用
import { ref } from 'vue'

// 组件
import { dayjs, ElMessageBox } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'

import cateSelect from './components/cateSelect.vue'
import articleDrawer from './components/articleDrawer.vue'

// api
import { articleDeleteAPI, articleGetListAPI } from '@/api/article'

const drawer = ref(null) // 获取抽屉组件

// =============================
// 表单数据
// =============================

const articleListFormData = ref({
  pagenum: 1, // 页码
  pagesize: 5, // 每页文章数量
  cate_id: '', // 文章分类id
  state: '' // 文章发布状态
})

// =============================
// 开关
// =============================

const loading = ref(false) // loading动画开关

// =============================
// 获取文章列表
// =============================

const articleList = ref([])
const articleTotal = ref(0)
const getAriticleList = async () => {
  loading.value = true

  const {
    data: { data, total }
  } = await articleGetListAPI(articleListFormData.value)
  articleList.value = data
  articleTotal.value = total

  loading.value = false
}
getAriticleList()

// =============================
// 添加文章
// =============================

const addArticle = () => {
  drawer.value.showDrawer({})
}

// =============================
// 编辑文章
// =============================

const editAriticle = (item) => {
  drawer.value.showDrawer(item)
}

// =============================
// 删除文章
// =============================

const delAriticle = (item) => {
  ElMessageBox.confirm('确认删除这篇文章吗？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const {
        data: { message }
      } = await articleDeleteAPI(item.id)
      ElMessage.success(message)
      getAriticleList()
    })
    .catch(() => {})
}

// =============================
// 添加 / 编辑文章请求 回调
// =============================
const submit = (isEdit) => {
  if (isEdit === 'add') {
    // 跳转最后一页
    articleListFormData.value.pagenum = Math.ceil(
      (articleTotal.value + 1) / articleListFormData.value.pagesize
    )
  }
  getAriticleList()
}

// =============================
// 文章搜索 / 重置
// =============================

// 搜索
const searchArticle = () => {
  articleListFormData.value.pagenum = 1
  getAriticleList()
}

// 重置
const resetArticle = () => {
  articleListFormData.value.pagenum = 1
  articleListFormData.value.cate_id = ''
  articleListFormData.value.state = ''
  getAriticleList()
}

// =============================
// 分页
// =============================

// 切换每页文章数量
const changeSize = (value) => {
  articleListFormData.value.pagenum = 1 // 返回第一页
  articleListFormData.value.pagesize = value
  getAriticleList()
}

// 切换页数
const changeCurrent = (value) => {
  articleListFormData.value.pagenum = value
  getAriticleList()
}
</script>

<template>
  <!-- top -->
  <pageContent title="文章管理">
    <template #button>
      <el-button type="primary" @click="addArticle">添加文章</el-button>
    </template>

    <!-- form -->
    <el-form inline>
      <el-form-item label="文章分类">
        <cateSelect v-model="articleListFormData.cate_id"></cateSelect>
      </el-form-item>

      <el-form-item label="发布状态">
        <el-select v-model="articleListFormData.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchArticle">搜索</el-button>
        <el-button @click="resetArticle">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ dayjs(row.pub_date).format('YYYY年MM月DD日') }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            :icon="Edit"
            circle
            @click="editAriticle(row)"
          ></el-button>
          <el-button
            type="danger"
            plain
            :icon="Delete"
            circle
            @click="delAriticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="articleListFormData.pagenum"
      v-model:page-size="articleListFormData.pagesize"
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="sizes, prev, pager, next, jumper, total"
      :total="articleTotal"
      @size-change="changeSize"
      @current-change="changeCurrent"
      style="margin-top: 10px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <articleDrawer ref="drawer" @submit="submit"></articleDrawer>
  </pageContent>
</template>

<style scoped>
.el-select {
  min-width: 200px;
}
</style>
