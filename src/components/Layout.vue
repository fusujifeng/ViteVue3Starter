<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <h3 v-if="!collapsed" style="color: white; text-align: center; margin: 16px 0">管理系统</h3>
        <h3 v-else style="color: white; text-align: center; margin: 16px 0">MS</h3>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :items="menuItems"
        @click="handleMenuClick"
      />
    </a-layout-sider>

    <!-- 主内容区域 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header
        style="background: #fff; padding: 0; box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
          "
        >
          <div style="display: flex; align-items: center">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            <a-breadcrumb style="margin-left: 16px">
              <a-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
                <router-link v-if="item.path" :to="item.path">{{ item.title }}</router-link>
                <span v-else>{{ item.title }}</span>
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>

          <!-- 顶部右侧菜单 -->
          <div style="display: flex; align-items: center; gap: 16px">
            <a-badge :count="5">
              <bell-outlined style="font-size: 16px; cursor: pointer" />
            </a-badge>
            <a-dropdown @click="handleUserMenuClick">
              <a class="ant-dropdown-link" @click.prevent>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
                <span style="margin-left: 8px">管理员</span>
                <down-outlined />
              </a>
              <template #overlay>
                <a-menu @click="handleUserMenuClick">
                  <a-menu-item key="profile">
                    <user-outlined />
                    个人中心
                  </a-menu-item>
                  <a-menu-item key="settings">
                    <setting-outlined />
                    设置
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout">
                    <logout-outlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content
        style="margin: 24px 16px; padding: 24px; background: #fff; min-height: 360px"
      >
        <router-view />
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer style="text-align: center; background: #f0f2f5">
        管理系统 ©2024 Created by Vue3 + Ant Design Vue
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TableOutlined,
  FormOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { resetRouterState } from '@/router'

const route = useRoute()
const router = useRouter()

// 侧边栏折叠状态
const collapsed = ref(false)

// 菜单选中状态
const selectedKeys = ref<string[]>(['dashboard'])
const openKeys = ref<string[]>([])

// 菜单项配置
const menuItems = [
  {
    key: 'dashboard',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
  },
  {
    key: 'table',
    icon: () => h(TableOutlined),
    label: '表格页面',
  },
  {
    key: 'form',
    icon: () => h(FormOutlined),
    label: '表单页面',
  },
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: '系统设置',
  },
]

// 面包屑导航
const breadcrumbItems = computed(() => {
  const routeTitleMap: Record<string, string> = {
    '/dashboard': '仪表盘',
    '/table': '表格页面',
    '/form': '表单页面',
    '/settings': '系统设置',
  }

  const items = [{ title: '首页', path: '/' }]
  const currentTitle = routeTitleMap[route.path]
  if (currentTitle) {
    items.push({ title: currentTitle, path: '' })
  }

  return items
})

// 路由映射
const routeMap: Record<string, string> = {
  dashboard: '/dashboard',
  table: '/table',
  form: '/form',
  settings: '/settings',
}

const routeKeyMap: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/table': 'table',
  '/form': 'form',
  '/settings': 'settings',
}

// 菜单点击处理
const handleMenuClick = ({ key }: { key: string }) => {
  const targetRoute = routeMap[key]
  if (targetRoute && targetRoute !== route.path) {
    router.push(targetRoute)
  }
}

// 用户菜单点击处理
const handleUserMenuClick = ({ key }: { key: string }) => {
  switch (key) {
    case 'profile':
      message.info('个人中心功能开发中...')
      break
    case 'settings':
      message.info('设置功能开发中...')
      break
    case 'logout':
      Modal.confirm({
        title: '确认退出',
        content: '确定要退出登录吗？',
        onOk() {
          // 清除本地存储的用户信息
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')

          // 重置路由状态
          resetRouterState()

          // 跳转到登录页
          router.push('/login')

          message.success('已退出登录')
        },
      })
      break
  }
}

// 监听路由变化更新选中状态
watch(
  () => route.path,
  (newPath) => {
    const key = routeKeyMap[newPath]
    if (key) {
      selectedKeys.value = [key]
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  border-radius: 6px;
}

.ant-dropdown-link {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
}

.ant-dropdown-link:hover {
  color: #1890ff;
}
</style>
