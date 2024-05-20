<script setup>
// ==================================================
// 传参
// ==================================================
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="content">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <slot name="button"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped>
.content {
  min-height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 15px;
    }
  }
}
</style>
