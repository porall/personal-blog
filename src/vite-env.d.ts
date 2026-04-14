declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.css' {}

interface ImportMeta {
  glob(str: string, options?: any): Record<string, () => any>
}