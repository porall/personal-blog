<template>
  <div class="admin-page">
    <header class="admin-header fade-in">
      <h1 class="page-title">
        <span class="title-icon">✎</span>
        <span class="title-text">Admin</span>
      </h1>
      <p class="page-subtitle">撰写新文章</p>
    </header>
    
    <form @submit.prevent="handleSubmit" class="admin-form fade-in stagger-1">
      <div class="form-section">
        <div class="form-group">
          <label class="form-label">标题</label>
          <input 
            v-model="form.title" 
            type="text" 
            required
            class="form-input"
            placeholder="输入文章标题"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">摘要</label>
          <textarea 
            v-model="form.excerpt" 
            required
            rows="3"
            class="form-textarea"
            placeholder="输入文章摘要"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">内容 <span class="label-hint">Markdown</span></label>
          <textarea 
            v-model="form.content" 
            required
            rows="16"
            class="form-textarea code"
            placeholder="使用 Markdown 格式编写文章内容..."
          ></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">标签</label>
          <input 
            v-model="tagsInput" 
            type="text" 
            class="form-input"
            placeholder="前端, Vue, TypeScript (用逗号分隔)"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        class="submit-btn"
      >
        <span class="btn-icon">↑</span>
        <span class="btn-text">发布文章</span>
      </button>
    </form>
    
    <div v-if="submitted" class="success-message fade-in">
      <span class="success-icon">✓</span>
      <span class="success-text">文章发布成功</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()

const form = reactive({
  title: '',
  excerpt: '',
  content: ''
})

const tagsInput = ref('')
const submitted = ref(false)

const handleSubmit = () => {
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
  
  blogStore.addPost({
    title: form.title,
    excerpt: form.excerpt,
    content: form.content,
    date: new Date().toISOString().split('T')[0],
    tags
  })
  
  form.title = ''
  form.excerpt = ''
  form.content = ''
  tagsInput.value = ''
  submitted.value = true
  
  setTimeout(() => {
    submitted.value = false
  }, 3000)
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  max-width: 800px;
  margin: 0 auto;
}

.admin-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 0 0.5rem;
}

.title-icon {
  font-size: 1.5rem;
  color: var(--accent-primary);
}

.title-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin: 0;
}

.admin-form {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-hint {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.form-input,
.form-textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  color: var(--text-primary);
  transition: all 0.3s;
  font-family: inherit;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-muted);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.form-textarea.code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 1.5rem;
  margin-top: 1.5rem;
  background: var(--accent-gradient);
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 217, 255, 0.3);
}

.btn-icon {
  font-size: 1.125rem;
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 217, 255, 0.1);
  border: 1px solid rgba(0, 217, 255, 0.3);
  border-radius: 10px;
  color: var(--accent-primary);
}

.success-icon {
  font-size: 1.25rem;
}

.success-text {
  font-weight: 500;
}

@media (max-width: 640px) {
  .admin-form {
    padding: 1.5rem;
  }
}
</style>