<script setup>
// Store
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <div>app</div>
  <div>{{ userStore.token }}</div>
  <el-button @click="console.log(userStore.token)">test</el-button>
</template>

<style scoped></style>
