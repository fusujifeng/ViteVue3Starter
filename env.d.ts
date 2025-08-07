/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 应用相关
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  
  // API 相关
  readonly VITE_API_BASE_URL: string
  
  // 功能开关
  readonly VITE_USE_MOCK: string
  readonly VITE_DEBUG: string
  readonly VITE_USE_PWA: string
  
  // 配置参数
  readonly VITE_UPLOAD_SIZE_LIMIT: string
  readonly VITE_PAGE_SIZE: string
  readonly VITE_DEFAULT_LANG: string
  readonly VITE_TIMEZONE: string
  
  // 网络相关
  readonly VITE_WS_URL: string
  readonly VITE_CDN_URL: string
  
  // 存储相关
  readonly VITE_TOKEN_KEY: string
  readonly VITE_REFRESH_TOKEN_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}