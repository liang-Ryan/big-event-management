<script setup>
// 通用
import { ref } from 'vue'
import { articleGetList } from '@/api/article'

// 组件
import { Edit, Delete } from '@element-plus/icons-vue'
// import { ElMessageBox } from 'element-plus'
import cateSelect from './components/cateSelect.vue'
import { formatTime } from '@/utils/format'

// =============================
// 数据
// =============================

const loading = ref(false)

// =============================
// 表单数据
// =============================

const articleFormData = ref({
  pagenum: 1, // 页码
  pagesize: 5, // 每页文章数量
  cate_id: '', // 文章分类id
  state: '' // 文章发布状态
})

// =============================
// 获取文章列表
// =============================

const articleList = ref([
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  },
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  },
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  },
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])
const articleTotal = ref(8)
const getAriticleList = async () => {
  loading.value = true

  const {
    data: { data, total }
  } = await articleGetList(articleFormData.value)
  articleList.value = data
  articleTotal.value = total

  loading.value = false
}
// getAriticleList()

// =============================
// 编辑文章
// =============================

const editAriticle = (item) => {
  console.log(item)
}

// =============================
// 删除文章
// =============================

// const delAriticle = (item) => {
//   ElMessageBox.confirm('确认删除这篇文章吗？', {
//     confirmButtonText: '确认',
//     cancelButtonText: '取消',
//     type: 'warning'
//   })
//     .then(() => {
//       ElMessage.success(message)
//     })
//     .catch(() => {})
// }

// =============================
// 文章搜索 / 重置
// =============================

// 搜索
const searchArticle = () => {
  articleFormData.value.pagenum = 1
  getAriticleList()
}

// 重置
const resetArticle = () => {
  articleFormData.value.pagenum = 1
  articleFormData.value.cate_id = ''
  articleFormData.value.state = ''
  getAriticleList()
}

// =============================
// 分页
// =============================

// 切换每页文章数量
const changeSize = (value) => {
  articleFormData.value.pagenum = 1 // 返回第一页
  articleFormData.value.pagesize = value
  getAriticleList()
}

// 切换页数
const changeCurrent = (value) => {
  articleFormData.value.pagenum = value
  getAriticleList()
}
</script>

<template>
  <!-- top -->
  <pageContent title="文章管理">
    <template #button>
      <el-button>添加文章</el-button>
    </template>

    <!-- form -->
    <el-form inline>
      <el-form-item label="文章分类">
        <cateSelect v-model="articleFormData.cate_id"></cateSelect>
      </el-form-item>

      <el-form-item label="发布状态">
        <el-select v-model="articleFormData.state">
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
          {{ formatTime(row.pub_date) }}
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
          <el-button type="danger" plain :icon="Delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="articleFormData.pagenum"
      v-model:page-size="articleFormData.pagesize"
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="sizes, prev, pager, next, jumper, total"
      :total="articleTotal"
      @size-change="changeSize"
      @current-change="changeCurrent"
      style="margin-top: 10px; justify-content: flex-end"
    />
  </pageContent>
</template>

<style scoped>
.el-select {
  min-width: 200px;
}
</style>
