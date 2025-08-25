<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-image">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- 404 图标 -->
          <circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#d9d9d9" stroke-width="2" />
          <text
            x="100"
            y="110"
            text-anchor="middle"
            font-size="36"
            font-weight="bold"
            fill="#8c8c8c"
          >
            404
          </text>
        </svg>
      </div>

      <div class="error-info">
        <h1>页面未找到</h1>
        <p>抱歉，您访问的页面不存在或已被删除。</p>

        <div class="error-actions">
          <a-button type="primary" size="large" @click="goHome">
            <template #icon>
              <HomeOutlined />
            </template>
            返回首页
          </a-button>

          <a-button size="large" @click="goBack">
            <template #icon>
              <ArrowLeftOutlined />
            </template>
            返回上页
          </a-button>
        </div>

        <div class="error-suggestions">
          <h3>您可以尝试：</h3>
          <ul>
            <li>检查网址是否正确</li>
            <li>返回上一页面</li>
            <li>访问网站首页</li>
            <li>联系系统管理员</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/dashboard')
}

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 48px 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.error-image {
  margin-bottom: 32px;
}

.error-info h1 {
  font-size: 32px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.error-info p {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
}

.error-suggestions {
  text-align: left;
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.error-suggestions h3 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.error-suggestions ul {
  margin: 0;
  padding-left: 20px;
  color: #6b7280;
}

.error-suggestions li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.error-suggestions li:last-child {
  margin-bottom: 0;
}

@media (max-width: 480px) {
  .error-content {
    padding: 32px 24px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .error-actions .ant-btn {
    width: 100%;
    max-width: 200px;
  }

  .error-info h1 {
    font-size: 24px;
  }
}
</style>
