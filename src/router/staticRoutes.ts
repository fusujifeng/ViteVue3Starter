import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'

/**
 * 静态业务路由 (Static Routes)
 * 定义：基础业务路由，需要登录权限但权限要求较低
 * 特点：代码中固定定义，登录后经权限筛选动态注册
 * 包含内容：首页、个人中心等所有登录用户基本可见的功能
 * 权限控制：通过 meta.permission 标识所需权限，无标识则默认登录即可访问
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '主页',
      requiresAuth: true, // 需要登录
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          title: '仪表盘',
          icon: 'DashboardOutlined',
          requiresAuth: true,
        },
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/TablePage.vue'),
        meta: {
          title: '表格页面',
          icon: 'TableOutlined',
          requiresAuth: true,
        },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/FormPage.vue'),
        meta: {
          title: '表单页面',
          icon: 'FormOutlined',
          requiresAuth: true,
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfilePage.vue'),
        meta: {
          title: '个人中心',
          icon: 'UserOutlined',
          requiresAuth: true,
          hideInMenu: true, // 不在侧边菜单中显示
        },
      },
    ],
  },
]
