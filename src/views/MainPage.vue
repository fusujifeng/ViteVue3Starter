<template>
  <div class="bg-amber-100 h-64">
    <div class="bg-violet-500 w-32 h-32 mx-auto"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 浏览器检测相关变量
const isSupportedBrowser = ref(false)
const isOldVersion = ref(false)
const currentBrowser = ref('')
const browserType = ref('')
const requiredVersionText = ref('')

// 2024年发布的最低版本要求
const MIN_CHROME_VERSION = 1203 // Chrome 120+ (2023年12月发布，接近2024年)
const MIN_EDGE_VERSION = 1203 // Edge 120+ (2023年12月发布，接近2024年)

// 检测浏览器版本
const getBrowserVersion = (userAgent: string, browserName: string): number => {
  let versionMatch

  switch (browserName) {
    case 'chrome':
      versionMatch = userAgent.match(/chrome\/(\d+)/)
      break
    case 'edge':
      versionMatch = userAgent.match(/edg\/(\d+)/)
      break
    default:
      return 0
  }

  return versionMatch ? parseInt(versionMatch[1]) : 0
}

// 检测浏览器类型和版本
const detectBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('edg/')) {
    // Microsoft Edge (Chromium)
    browserType.value = 'edge'
    const version = getBrowserVersion(userAgent, 'edge')
    currentBrowser.value = `Microsoft Edge ${version}`
    requiredVersionText.value = `Edge ${MIN_EDGE_VERSION}+ (2024年版本)`

    if (version >= MIN_EDGE_VERSION) {
      isSupportedBrowser.value = true
    } else if (version > 0) {
      isOldVersion.value = true
    }
  } else if (
    userAgent.includes('chrome/') &&
    !userAgent.includes('edg') &&
    !userAgent.includes('opr')
  ) {
    // Google Chrome
    browserType.value = 'chrome'
    const version = getBrowserVersion(userAgent, 'chrome')
    currentBrowser.value = `Google Chrome ${version}`
    requiredVersionText.value = `Chrome ${MIN_CHROME_VERSION}+ (2024年版本)`

    if (version >= MIN_CHROME_VERSION) {
      isSupportedBrowser.value = true
    } else if (version > 0) {
      isOldVersion.value = true
    }
  } else {
    // 其他浏览器
    if (userAgent.includes('firefox')) {
      currentBrowser.value = 'Firefox'
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      currentBrowser.value = 'Safari'
    } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
      currentBrowser.value = 'Opera'
    } else {
      currentBrowser.value = '未知浏览器'
    }

    isSupportedBrowser.value = false
    isOldVersion.value = false
  }
}

// 组件挂载时检测浏览器
onMounted(() => {
  detectBrowser()
})
</script>

<style scoped>
.browser-warning {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
}

.warning-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 600px;
  margin: 20px;
}

.warning-content h2 {
  color: #ff6b6b;
  margin-bottom: 20px;
  font-size: 24px;
}

.warning-content p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
  font-size: 16px;
}

.browser-list {
  text-align: left;
  margin: 20px 0;
  padding-left: 20px;
}

.browser-list li {
  color: #666;
  margin-bottom: 8px;
  line-height: 1.6;
}

.download-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 25px;
  align-items: center;
}

.download-link {
  display: inline-block;
  background: #4285f4;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  min-width: 200px;
}

.download-link.primary {
  background: #0078d4;
  font-size: 16px;
  padding: 15px 30px;
}

.download-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.download-link.primary:hover {
  background: #106ebe;
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
}

@media (min-width: 600px) {
  .download-links {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
