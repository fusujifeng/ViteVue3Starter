# 环境变量配置说明

本项目使用 Vite 的环境变量系统来管理不同环境下的配置。

## 环境变量文件

### 文件优先级（从高到低）
1. `.env.local` - 本地环境变量（所有环境）
2. `.env.[mode].local` - 特定模式的本地环境变量
3. `.env.[mode]` - 特定模式的环境变量
4. `.env` - 通用环境变量

### 文件说明

- **`.env`** - 所有环境共享的通用配置
- **`.env.development`** - 开发环境专用配置
- **`.env.production`** - 生产环境专用配置
- **`.env.local`** - 本地环境变量（不会被提交到版本控制）
- **`.env.local.example`** - 本地环境变量示例文件

## 环境变量命名规则

- 所有自定义环境变量必须以 `VITE_` 开头
- 使用大写字母和下划线命名
- 例如：`VITE_API_BASE_URL`

## 已配置的环境变量

### 应用相关
- `VITE_APP_TITLE` - 应用标题
- `VITE_APP_VERSION` - 应用版本
- `VITE_APP_DESCRIPTION` - 应用描述

### API 相关
- `VITE_API_BASE_URL` - API 基础地址

### 功能开关
- `VITE_USE_MOCK` - 是否启用 Mock 数据
- `VITE_DEBUG` - 是否启用调试模式
- `VITE_USE_PWA` - 是否启用 PWA

### 配置参数
- `VITE_UPLOAD_SIZE_LIMIT` - 上传文件大小限制（MB）
- `VITE_PAGE_SIZE` - 分页默认大小
- `VITE_DEFAULT_LANG` - 默认语言
- `VITE_TIMEZONE` - 时区

### 网络相关
- `VITE_WS_URL` - WebSocket 地址
- `VITE_CDN_URL` - 静态资源 CDN 地址

### 存储相关
- `VITE_TOKEN_KEY` - Token 存储键名
- `VITE_REFRESH_TOKEN_KEY` - 刷新 Token 存储键名

## 使用方法

### 1. 直接使用
```typescript
// 直接访问环境变量
const apiUrl = import.meta.env.VITE_API_BASE_URL
const isDebug = import.meta.env.VITE_DEBUG === 'true'
```

### 2. 使用工具函数
```typescript
import { envConfig, getApiBaseUrl, isDev } from '@/utils/env'

// 使用配置对象
console.log(envConfig.appTitle)

// 使用工具函数
const apiUrl = getApiBaseUrl()
const isDevMode = isDev()
```

## 本地开发配置

1. 复制 `.env.local.example` 为 `.env.local`
2. 根据需要修改配置
3. `.env.local` 文件不会被提交到版本控制系统

## 注意事项

1. **安全性**：不要在环境变量中存储敏感信息（如密钥、密码等）
2. **类型安全**：所有环境变量都已在 `env.d.ts` 中定义类型
3. **构建时替换**：环境变量在构建时会被静态替换
4. **客户端可见**：所有 `VITE_` 开头的变量都会暴露给客户端

## 部署配置

### 开发环境
```bash
npm run dev
# 或
pnpm dev
```

### 生产环境构建
```bash
npm run build
# 或
pnpm build
```

### 预览生产构建
```bash
npm run preview
# 或
pnpm preview
```