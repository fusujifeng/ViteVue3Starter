import { createRouter, createWebHistory } from 'vue-router'
import { coreRoutes } from './coreRoutes'
import { staticRoutes } from './staticRoutes'
import { dynamicRouteTemplates, filterRoutesByPermission } from './dynamicRoutes'

/**
 * 路由系统入口
 * 按「路由类型拆分解耦」设计：
 * - 核心路由：登录、404等无需权限的路由
 * - 静态业务路由：基础功能路由，需要登录权限
 * - 动态业务路由：高级功能路由，根据用户权限动态加载
 */

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: coreRoutes.filter((route) => route.path !== '/:pathMatch(.*)*'), // 先不注册通配符路由
})

// 用户权限状态
let isAuthenticated = false
let userPermissions: string[] = []
let staticRoutesAdded = false
let dynamicRoutesAdded = false

// 模拟用户登录状态检查
const checkAuthStatus = (): boolean => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  return !!(token && user)
}

// 获取用户权限
const getUserPermissions = (): string[] => {
  const permissions = localStorage.getItem('permissions')
  return permissions ? JSON.parse(permissions) : []
}

// 添加静态路由
const addStaticRoutes = () => {
  if (staticRoutesAdded) return

  staticRoutes.forEach((route) => {
    router.addRoute(route)
    console.log('📝 添加静态路由:', route.name, route.path)
  })
  staticRoutesAdded = true
  console.log('✅ 静态业务路由已加载')

  // 验证Dashboard路由是否存在
  const hasDashboard = router.hasRoute('Dashboard')
  console.log('🔍 Dashboard路由存在:', hasDashboard)
}

// 添加动态路由
const addDynamicRoutes = async () => {
  if (dynamicRoutesAdded) return

  try {
    // 方式1: 从后端获取动态路由（生产环境）
    // const backendRoutes = await fetchDynamicRoutes()
    // const transformedRoutes = transformBackendRoutes(backendRoutes)

    // 方式2: 使用预定义模板（开发环境）
    const filteredRoutes = filterRoutesByPermission(dynamicRouteTemplates, userPermissions)

    filteredRoutes.forEach((route) => {
      router.addRoute(route)
    })

    // 最后添加通配符路由（404处理）
    const wildcardRoute = coreRoutes.find((route) => route.path === '/:pathMatch(.*)*')
    if (wildcardRoute && !router.hasRoute('NotFoundWildcard')) {
      router.addRoute({ ...wildcardRoute, name: 'NotFoundWildcard' })
      console.log('✅ 通配符路由已添加')
    }

    dynamicRoutesAdded = true
    console.log('✅ 动态业务路由已加载', filteredRoutes)
  } catch (error) {
    console.error('❌ 动态路由加载失败:', error)
  }
}

// 重置路由状态（用于登出）
export const resetRouterState = () => {
  isAuthenticated = false
  userPermissions = []
  staticRoutesAdded = false
  dynamicRoutesAdded = false

  // 重新创建路由实例以清除动态路由
  const newRouter = createRouter({
    history: createWebHistory(),
    routes: [...coreRoutes],
  })

  // 替换当前路由实例的matcher
  router.matcher = newRouter.matcher
  console.log('🔄 路由状态已重置')
}

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Vue3 Starter`
  }

  // 检查用户认证状态
  isAuthenticated = checkAuthStatus()
  userPermissions = getUserPermissions()

  // 公开路由直接放行
  if (to.meta?.public) {
    next()
    return
  }

  // 特殊处理：访问根路径时的重定向逻辑
  if (to.path === '/') {
    if (!isAuthenticated) {
      console.log('🚫 未登录访问根路径，重定向到登录页')
      next({ name: 'Login' })
      return
    } else {
      // 已登录用户访问根路径，先加载静态路由再重定向
      console.log('🔄 已登录用户访问根路径，开始加载路由...')
      addStaticRoutes()
      await addDynamicRoutes()

      // 再次验证Dashboard路由
      const hasDashboard = router.hasRoute('Dashboard')
      console.log('🔍 重定向前Dashboard路由存在:', hasDashboard)

      if (hasDashboard) {
        console.log('✅ 已登录访问根路径，重定向到仪表盘')
        next({ name: 'Dashboard' })
      } else {
        console.log('❌ Dashboard路由不存在，重定向到/dashboard路径')
        next('/dashboard')
      }
      return
    }
  }

  // 需要认证的路由
  if (to.meta?.requiresAuth && !isAuthenticated) {
    console.log('🚫 未登录，重定向到登录页')
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户，加载业务路由
  if (isAuthenticated) {
    // 添加静态路由
    addStaticRoutes()

    // 添加动态路由
    await addDynamicRoutes()

    // 如果访问的是登录页，重定向到首页
    if (to.name === 'Login') {
      console.log('✅ 已登录访问登录页，重定向到仪表盘')
      next({ name: 'Dashboard' })
      return
    }

    // 检查目标路由是否存在
    const hasRoute = router.hasRoute(to.name as string)
    if (!hasRoute && to.name !== 'Dashboard') {
      console.log('⚠️ 路由不存在，重定向到仪表盘')
      next({ name: 'Dashboard' })
      return
    }

    // 检查权限
    const requiredPermission = to.meta?.permission as string
    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
      console.log('🚫 权限不足，重定向到仪表盘')
      next({ name: 'Dashboard' })
      return
    }
  }

  next()
})

// 全局后置守卫
router.afterEach((to) => {
  console.log(`📍 路由跳转: ${to.path}`, {
    name: to.name,
    meta: to.meta,
    authenticated: isAuthenticated,
    permissions: userPermissions,
  })
})

export default router
