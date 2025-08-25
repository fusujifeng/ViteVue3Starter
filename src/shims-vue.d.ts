// 在 src 目录下创建或编辑 shims-vue.d.ts
declare module 'vite-plugin-doc-preview' {
  // 简单声明为任意类型
  const content: unknown
  export default content
}

// 如果你知道插件的具体类型，可以补充更详细的声明
// 例如：
// interface DocPreviewOptions {
//   someOption?: boolean;
//   theme?: string;
// }
// declare function docPreview(options?: DocPreviewOptions): any;
// export default docPreview;
