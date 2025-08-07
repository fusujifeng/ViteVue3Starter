/**
 * 环境变量工具函数
 */

// 获取环境变量值
export const getEnv = (key: keyof ImportMetaEnv): string => {
  return import.meta.env[key] || ''
}

// 判断是否为开发环境
export const isDev = (): boolean => {
  return import.meta.env.MODE === 'development'
}

// 判断是否为生产环境
export const isProd = (): boolean => {
  return import.meta.env.MODE === 'production'
}

// 判断是否启用调试模式
export const isDebug = (): boolean => {
  return getEnv('VITE_DEBUG') === 'true'
}

// 判断是否启用 Mock 数据
export const isMock = (): boolean => {
  return getEnv('VITE_USE_MOCK') === 'true'
}

// 判断是否启用 PWA
export const isPWA = (): boolean => {
  return getEnv('VITE_USE_PWA') === 'true'
}

// 获取 API 基础地址
export const getApiBaseUrl = (): string => {
  return getEnv('VITE_API_BASE_URL')
}

// 获取应用标题
export const getAppTitle = (): string => {
  return getEnv('VITE_APP_TITLE')
}

// 获取应用版本
export const getAppVersion = (): string => {
  return getEnv('VITE_APP_VERSION')
}

// 获取上传文件大小限制（转换为数字，单位：MB）
export const getUploadSizeLimit = (): number => {
  return parseInt(getEnv('VITE_UPLOAD_SIZE_LIMIT')) || 10
}

// 获取分页大小（转换为数字）
export const getPageSize = (): number => {
  return parseInt(getEnv('VITE_PAGE_SIZE')) || 20
}

// 获取 WebSocket 地址
export const getWsUrl = (): string => {
  return getEnv('VITE_WS_URL')
}

// 获取 CDN 地址
export const getCdnUrl = (): string => {
  return getEnv('VITE_CDN_URL')
}

// 获取 Token 存储键名
export const getTokenKey = (): string => {
  return getEnv('VITE_TOKEN_KEY')
}

// 获取刷新 Token 存储键名
export const getRefreshTokenKey = (): string => {
  return getEnv('VITE_REFRESH_TOKEN_KEY')
}

// 环境变量配置对象
export const envConfig = {
  // 环境信息
  isDev: isDev(),
  isProd: isProd(),
  isDebug: isDebug(),
  isMock: isMock(),
  isPWA: isPWA(),

  // 应用信息
  appTitle: getAppTitle(),
  appVersion: getAppVersion(),
  appDescription: getEnv('VITE_APP_DESCRIPTION'),

  // API 配置
  apiBaseUrl: getApiBaseUrl(),

  // 网络配置
  wsUrl: getWsUrl(),
  cdnUrl: getCdnUrl(),

  // 功能配置
  uploadSizeLimit: getUploadSizeLimit(),
  pageSize: getPageSize(),
  defaultLang: getEnv('VITE_DEFAULT_LANG'),
  timezone: getEnv('VITE_TIMEZONE'),

  // 存储配置
  tokenKey: getTokenKey(),
  refreshTokenKey: getRefreshTokenKey(),
}

// 打印环境配置信息（仅在开发环境）
if (isDev()) {
  console.log('🚀 环境配置信息:', envConfig)
}
