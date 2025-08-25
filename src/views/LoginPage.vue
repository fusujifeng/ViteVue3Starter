<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>Vue3 Starter</h1>
        <p>欢迎登录管理系统</p>
      </div>

      <a-form
        :model="loginForm"
        :rules="rules"
        @finish="handleLogin"
        @finishFailed="handleLoginFailed"
        layout="vertical"
        class="login-form"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            :prefix="h(UserOutlined)"
          />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="loginForm.password"
            placeholder="请输入密码"
            size="large"
            :prefix="h(LockOutlined)"
          />
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="loginForm.remember"> 记住我 </a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <div class="login-demo">
        <a-divider>演示账号</a-divider>
        <div class="demo-accounts">
          <a-button type="link" size="small" @click="quickLogin('admin')">
            管理员 (admin/123456)
          </a-button>
          <a-button type="link" size="small" @click="quickLogin('user')">
            普通用户 (user/123456)
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const loading = ref(false)

// 表单数据
const loginForm = ref({
  username: '',
  password: '',
  remember: false,
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' },
  ],
}

// 模拟登录API
const mockLogin = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (username === 'admin' && password === '123456') ||
        (username === 'user' && password === '123456')
      ) {
        const userData = {
          id: username === 'admin' ? 1 : 2,
          username,
          name: username === 'admin' ? '管理员' : '普通用户',
          role: username === 'admin' ? 'admin' : 'user',
          permissions:
            username === 'admin'
              ? [
                  'admin',
                  'admin:user',
                  'admin:role',
                  'admin:permission',
                  'reports',
                  'reports:sales',
                  'reports:analytics',
                ]
              : ['basic'],
        }
        resolve({
          code: 200,
          data: {
            token: `mock-token-${Date.now()}`,
            user: userData,
          },
          message: '登录成功',
        })
      } else {
        reject({
          code: 401,
          message: '用户名或密码错误',
        })
      }
    }, 1000)
  })
}

interface LoginForm {
  username: string
  password: string
}

interface LoginResponse {
  data: {
    token: string
    user: {
      id: string
      username: string
      role: string
      permissions: string[]
    }
  }
}

interface LoginError {
  message: string
}

interface ValidationError {
  values: LoginForm
  errorFields: Array<{
    name: string[]
    errors: string[]
  }>
}

// 处理登录
const handleLogin = async (values: LoginForm) => {
  loading.value = true

  try {
    const response = (await mockLogin(values.username, values.password)) as LoginResponse

    // 保存登录信息
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('userRole', response.data.user.role)
    localStorage.setItem('permissions', JSON.stringify(response.data.user.permissions))

    message.success('登录成功！')

    // 跳转到目标页面或首页
    const redirect = router.currentRoute.value.query.redirect as string
    const targetPath = redirect || '/dashboard'

    console.log('🚀 登录成功，准备跳转到:', targetPath)
    console.log('🔍 当前路由状态:', {
      hasRoute: router.hasRoute('Dashboard'),
      allRoutes: router.getRoutes().map((r) => ({ name: r.name, path: r.path })),
    })

    await router.push(targetPath)

    // 跳转后检查当前路由
    setTimeout(() => {
      console.log('📍 跳转后当前路由:', router.currentRoute.value.path)
    }, 100)
  } catch (error: unknown) {
    const loginError = error as LoginError
    message.error(loginError.message || '登录失败')
  } finally {
    loading.value = false
  }
}

// 处理登录失败
const handleLoginFailed = (errorInfo: ValidationError) => {
  console.log('登录表单验证失败:', errorInfo)
}

// 快速登录
const quickLogin = (type: 'admin' | 'user') => {
  loginForm.value.username = type
  loginForm.value.password = '123456'
  handleLogin(loginForm.value)
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.login-header p {
  color: #6b7280;
  margin: 0;
  font-size: 14px;
}

.login-form {
  margin-bottom: 24px;
}

.login-demo {
  text-align: center;
}

.demo-accounts {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.demo-accounts .ant-btn {
  flex: 1;
  font-size: 12px;
}

@media (max-width: 480px) {
  .login-box {
    padding: 24px;
  }

  .demo-accounts {
    flex-direction: column;
  }
}
</style>
