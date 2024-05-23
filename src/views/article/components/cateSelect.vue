<script setup>
// 通用
import { ref, defineProps } from 'vue'
import { cateGetCateList } from '@/api/cate'

// =============================
// 数据
// =============================

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])

// =============================
// 获取文章列表
// =============================

const cateList = ref([])
const getcateList = async () => {
  const {
    data: { data }
  } = await cateGetCateList()
  cateList.value = data
}
getcateList()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in cateList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<style scoped></style>
