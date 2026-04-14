export const userInfo = {
  name: '朱雨剑',
  title: '前端开发工程师',
  avatar: '',
  bio: '3年前端开发经验，擅长 Vue 全家桶、Electron、TypeScript。现任职于深圳一家科技公司。',
  email: 'porall@foxmail.com',
  phone: '15819206304',
  location: '深圳',
  workYears: 3,
  github: 'https://github.com/porall',
  skills: [
    'Vue', 'Vue Router', 'Pinia', 'TypeScript', 'Electron',
    '低代码平台', 'Monorepo', 'WebSocket', '性能优化', '前端安全', 'SpringBoot'
  ],
  education: {
    school: '深圳大学',
    major: '物联网工程',
    degree: '本科',
    graduation: '2022.06'
  },
  certificate: '华为 JavaScript 专业级证书'
}

export const manualProjects = [
  {
    id: 1,
    name: '低代码可视化搭建平台',
    description: '企业级低代码平台，支持拖拽组件、属性配置、页面预览、代码生成等功能',
    tech: ['Vue3', 'TypeScript', 'Vue Draggable', 'Monaco Editor'],
    link: '#'
  },
  {
    id: 2,
    name: 'Electron 桌面应用',
    description: '基于 Electron 的桌面客户端，支持多窗口、数据本地存储、自动更新',
    tech: ['Electron', 'Vue3', 'TypeScript', 'electron-updater'],
    link: '#'
  },
  {
    id: 3,
    name: '实时聊天系统',
    description: 'WebSocket 实现的实时消息系统，支持群聊、私聊、消息已读未读',
    tech: ['Vue3', 'WebSocket', 'Socket.io', 'Redis'],
    link: '#'
  }
]