const userAgent = process.env.npm_config_user_agent || '';

// 检查是否使用 pnpm
if (!userAgent.includes('pnpm')) {
  // 红色错误提示
  console.error('\x1B[31m❌ 错误：本项目仅支持 pnpm 安装依赖！\x1B[0m');
  // 黄色提示
  console.error('\x1B[33m👉 请使用以下命令安装：\x1B[0m');
  // 蓝色命令
  console.error('\x1B[36m   pnpm install\x1B[0m');
  process.exit(1); // 终止 npm 安装进程
}
