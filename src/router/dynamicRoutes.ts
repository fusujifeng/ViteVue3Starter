import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'

/**
 * 动态业务路由 (Dynamic Routes)
 * 定义：高级业务路由，权限要求较高，不同角色可见范围不同
 * 特点：由后端接口根据用户权限动态返回，前端处理后注册
 * 包含内容：权限管理、数据报表等角色专属功能页面
 */

// 后端路由数据结构接口
export interface BackendRoute {
  path: string
  name: string
  componentPath: string // 组件路径（如 "permission/RoleMgt"）
  meta?: {
    title: string
    icon?: string
    permission?: string
    requiresAuth?: boolean
    hideInMenu?: boolean
  }
  children?: BackendRoute[]
}

// 预定义的动态路由模板（用于演示）
// 注意：这些路由需要对应的页面组件存在才能正常工作
export const dynamicRouteTemplates: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    redirect: '/admin/settings',
    meta: {
      title: '系统管理',
      icon: 'SettingOutlined',
      permission: 'admin',
      requiresAuth: true,
    },
    children: [
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/FormPage.vue'), // 暂时使用现有组件
        meta: {
          title: '系统设置',
          icon: 'SettingOutlined',
          permission: 'admin:settings',
          requiresAuth: true,
        },
      },
    ],
  },
  // 注释掉暂时不需要的路由，避免引用不存在的组件
  // {
  //   path: '/reports',
  //   name: 'Reports',
  //   component: Layout,
  //   redirect: '/reports/sales',
  //   meta: {
  //     title: '数据报表',
  //     icon: 'BarChartOutlined',
  //     permission: 'reports',
  //     requiresAuth: true
  //   },
  //   children: [
  //     {
  //       path: 'sales',
  //       name: 'SalesReport',
  //       component: () => import('@/views/reports/SalesReport.vue'),
  //       meta: {
  //         title: '销售报表',
  //         icon: 'LineChartOutlined',
  //         permission: 'reports:sales',
  //         requiresAuth: true
  //       }
  //     }
  //   ]
  // }
]

// 从后端获取动态路由（模拟接口）
export const fetchDynamicRoutes = async (): Promise<BackendRoute[]> => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟根据用户权限返回不同的路由
      const userRole = localStorage.getItem('userRole') || 'user'

      if (userRole === 'admin') {
        resolve([
          {
            path: '/admin',
            name: 'Admin',
            componentPath: 'Layout',
            meta: {
              title: '系统管理',
              icon: 'SettingOutlined',
              permission: 'admin',
              requiresAuth: true,
            },
            children: [
              {
                path: 'users',
                name: 'UserManagement',
                componentPath: 'admin/UserManagement',
                meta: {
                  title: '用户管理',
                  icon: 'UserOutlined',
                  permission: 'admin:user',
                  requiresAuth: true,
                },
              },
            ],
          },
        ])
      } else {
        resolve([])
      }
    }, 500)
  })
}

// 转换后端路由为前端可用格式
export const transformBackendRoutes = (routes: BackendRoute[]): RouteRecordRaw[] => {
  return routes.map((route) => {
    const transformed: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      component:
        route.componentPath === 'Layout'
          ? Layout
          : () => import(`@/views/${route.componentPath}.vue`),
      meta: route.meta || {},
      children: [],
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      transformed.children = transformBackendRoutes(route.children)
    }

    return transformed
  })
}

// 根据用户权限过滤路由
export const filterRoutesByPermission = (
  routes: RouteRecordRaw[],
  userPermissions: string[],
): RouteRecordRaw[] => {
  return routes.filter((route) => {
    // 检查路由权限
    const permission = route.meta?.permission as string
    if (permission && !userPermissions.includes(permission)) {
      return false
    }

    // 递归过滤子路由
    if (route.children && route.children.length > 0) {
      route.children = filterRoutesByPermission(route.children, userPermissions)
    }

    return true
  })
}
