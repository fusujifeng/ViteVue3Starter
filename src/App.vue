<script setup lang="ts">
import { envConfig } from '@/utils/env'
// 导入Ant Design Vue样式
import 'ant-design-vue/dist/reset.css'

// 设置页面标题
document.title = envConfig.appTitle
</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
</style>
