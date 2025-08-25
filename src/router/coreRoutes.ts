import type { RouteRecordRaw } from 'vue-router'

/**
 * 核心路由 (Core Routes)
 * 定义：无需权限控制的全局基础路由，保障系统最基本功能
 * 特点：项目初始化时直接注册，所有用户（包括未登录用户）可见
 * 包含内容：登录页、注册页、忘记密码页、404 错误页等
 */
export const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: '登录',
      public: true, // 标记为公开路由
      hideInMenu: true, // 不在菜单中显示
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404Page.vue'),
    meta: {
      title: '页面未找到',
      public: true,
      hideInMenu: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      public: true,
      hideInMenu: true,
    },
  },
]
