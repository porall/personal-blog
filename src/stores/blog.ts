import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
}

// 博客文章列表配置
const blogConfig: BlogPost[] = [
  {
    id: '2026-04-13-frontend-trends',
    title: '2026年前端技术发展趋势',
    excerpt: '探索 React 19、Vue 4、AI 辅助开发等最新前端技术和趋势',
    content: '',
    date: '2026-04-13',
    tags: ['前端', '技术趋势', 'React', 'Vue']
  }
]

const STORAGE_KEY = 'personal-blog-posts'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.value))
  }

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const savedPosts = JSON.parse(stored)
        // 合并存储的文章和默认文章
        const defaultIds = blogConfig.map(p => p.id)
        const merged = [...blogConfig]
        savedPosts.forEach((p: BlogPost) => {
          if (!defaultIds.includes(p.id)) {
            merged.push(p)
          }
        })
        posts.value = merged.sort((a, b) => b.date.localeCompare(a.date))
      } else {
        posts.value = [...blogConfig]
      }
    } catch (e) {
      console.error('Failed to load from storage:', e)
      posts.value = [...blogConfig]
    }
  }

  const loadPosts = async () => {
    loading.value = true
    try {
      // 先从 localStorage 加载
      loadFromStorage()
      
      // 尝试加载 markdown 文件内容
      for (let i = 0; i < posts.value.length; i++) {
        const post = posts.value[i]
        if (!post.content) {
          try {
            const response = await fetch(`/blogs/${post.id}.md`)
            if (response.ok) {
              const content = await response.text()
              post.content = content
            }
          } catch (e) {
            console.warn(`Failed to load blog: ${post.id}`)
          }
        }
      }
    } catch (e) {
      console.error('Failed to load blog posts:', e)
    } finally {
      loading.value = false
    }
  }

  const getPostById = (id: string) => {
    return posts.value.find(post => post.id === id)
  }

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const id = `${post.date}-${post.title.toLowerCase().replace(/\s+/g, '-')}`
    posts.value.unshift({ ...post, id })
    saveToStorage()
  }

  return {
    posts,
    loading,
    loadPosts,
    getPostById,
    addPost
  }
})