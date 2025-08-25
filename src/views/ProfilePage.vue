<template>
  <div class="profile-container">
    <a-card title="个人中心" :bordered="false">
      <div class="profile-content">
        <div class="profile-header">
          <a-avatar :size="80" :src="userInfo.avatar">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>

          <div class="profile-info">
            <h2>{{ userInfo.name }}</h2>
            <p class="profile-role">
              <a-tag :color="userInfo.role === 'admin' ? 'red' : 'blue'">
                {{ userInfo.role === 'admin' ? '管理员' : '普通用户' }}
              </a-tag>
            </p>
            <p class="profile-desc">{{ userInfo.description }}</p>
          </div>
        </div>

        <a-divider />

        <div class="profile-details">
          <a-row :gutter="[24, 24]">
            <a-col :xs="24" :sm="12" :md="8">
              <a-card size="small" title="基本信息">
                <div class="info-item">
                  <span class="info-label">用户名：</span>
                  <span class="info-value">{{ userInfo.username }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">邮箱：</span>
                  <span class="info-value">{{ userInfo.email }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">手机：</span>
                  <span class="info-value">{{ userInfo.phone }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">注册时间：</span>
                  <span class="info-value">{{ userInfo.createTime }}</span>
                </div>
              </a-card>
            </a-col>

            <a-col :xs="24" :sm="12" :md="8">
              <a-card size="small" title="权限信息">
                <div class="permissions-list">
                  <a-tag
                    v-for="permission in userInfo.permissions"
                    :key="permission"
                    color="green"
                    style="margin-bottom: 8px"
                  >
                    {{ getPermissionName(permission) }}
                  </a-tag>
                </div>
              </a-card>
            </a-col>

            <a-col :xs="24" :sm="12" :md="8">
              <a-card size="small" title="统计信息">
                <div class="info-item">
                  <span class="info-label">登录次数：</span>
                  <span class="info-value">{{ userInfo.loginCount }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">最后登录：</span>
                  <span class="info-value">{{ userInfo.lastLoginTime }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">在线时长：</span>
                  <span class="info-value">{{ userInfo.onlineTime }}</span>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <div class="profile-actions">
          <a-button type="primary" @click="editProfile">
            <template #icon>
              <EditOutlined />
            </template>
            编辑资料
          </a-button>

          <a-button @click="changePassword">
            <template #icon>
              <KeyOutlined />
            </template>
            修改密码
          </a-button>

          <a-button danger @click="logout">
            <template #icon>
              <LogoutOutlined />
            </template>
            退出登录
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { UserOutlined, EditOutlined, KeyOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { resetRouterState } from '@/router'

const router = useRouter()

// 用户信息
const userInfo = ref({
  id: 0,
  username: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  avatar: '',
  description: '',
  permissions: [] as string[],
  createTime: '',
  lastLoginTime: '',
  loginCount: 0,
  onlineTime: '',
})

// 权限名称映射
const permissionNames: Record<string, string> = {
  basic: '基础权限',
  admin: '管理员权限',
  'admin:user': '用户管理',
  'admin:role': '角色管理',
  'admin:permission': '权限管理',
  reports: '报表权限',
  'reports:sales': '销售报表',
  'reports:analytics': '数据分析',
}

// 获取权限名称
const getPermissionName = (permission: string): string => {
  return permissionNames[permission] || permission
}

// 加载用户信息
const loadUserInfo = () => {
  const user = localStorage.getItem('user')
  const permissions = localStorage.getItem('permissions')

  if (user) {
    const userData = JSON.parse(user)
    userInfo.value = {
      ...userData,
      email: userData.username + '@example.com',
      phone: '138****8888',
      avatar: '',
      description:
        userData.role === 'admin' ? '系统管理员，拥有所有权限' : '普通用户，基础功能使用者',
      permissions: permissions ? JSON.parse(permissions) : [],
      createTime: '2024-01-01',
      lastLoginTime: new Date().toLocaleString(),
      loginCount: Math.floor(Math.random() * 100) + 10,
      onlineTime: Math.floor(Math.random() * 1000) + 100 + '小时',
    }
  }
}

// 编辑资料
const editProfile = () => {
  message.info('编辑资料功能开发中...')
}

// 修改密码
const changePassword = () => {
  message.info('修改密码功能开发中...')
}

// 退出登录
const logout = () => {
  Modal.confirm({
    title: '确认退出',
    content: '确定要退出登录吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      // 清除登录信息
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userRole')
      localStorage.removeItem('permissions')

      // 重置路由状态
      resetRouterState()

      message.success('已退出登录')
      router.push('/login')
    },
  })
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.profile-container {
  padding: 24px;
}

.profile-content {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.profile-info h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.profile-role {
  margin: 0 0 8px 0;
}

.profile-desc {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.profile-details {
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: #374151;
  min-width: 80px;
}

.info-value {
  color: #6b7280;
  text-align: right;
}

.permissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-actions {
    flex-direction: column;
    align-items: center;
  }

  .profile-actions .ant-btn {
    width: 100%;
    max-width: 200px;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .info-value {
    text-align: left;
  }
}
</style>
