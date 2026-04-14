<template>
  <div class="blog-detail">
    <router-link 
      to="/blog" 
      class="back-link fade-in"
    >
      <span class="back-arrow">←</span>
      <span class="back-text">Back to Blog</span>
    </router-link>
    
    <article v-if="post" class="article fade-in stagger-1">
      <header class="article-header">
        <div class="article-meta">
          <time class="article-date">{{ post.date }}</time>
          <div class="article-tags">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="article-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <h1 class="article-title">{{ post.title }}</h1>
      </header>
      
      <div 
        class="article-content"
        v-html="renderedContent"
      ></div>
    </article>
    
    <div v-else class="not-found fade-in">
      <h2>Article not found</h2>
      <router-link to="/blog" class="back-link">← Back to Blog</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { marked } from 'marked'
import hljs from 'highlight.js'

const route = useRoute()
const blogStore = useBlogStore()

onMounted(() => {
  blogStore.loadPosts()
})

const post = computed(() => blogStore.getPostById(route.params.id as string))

marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

const renderedContent = computed(() => {
  if (!post.value) return '<p>Loading...</p>'
  if (!post.value.content) return '<p>No content</p>'
  return marked(post.value.content)
})
</script>

<style scoped>
.blog-detail {
  min-height: 100vh;
  padding: 2rem 1.5rem 4rem;
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.5rem 0;
  transition: all 0.3s;
  margin-bottom: 2rem;
}

.back-link:hover {
  color: var(--accent-primary);
}

.back-arrow {
  font-size: 1.25rem;
  transition: transform 0.3s;
}

.back-link:hover .back-arrow {
  transform: translateX(-4px);
}

.article {
  opacity: 0;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.article-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.article-tag {
  padding: 0.25rem 0.625rem;
  background: rgba(0, 217, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--accent-primary);
  font-family: 'JetBrains Mono', monospace;
}

.article-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.article-content {
  line-height: 1.8;
}

:deep(.article-content h1),
:deep(.article-content h2),
:deep(.article-content h3) {
  color: var(--text-primary);
  margin: 2em 0 1em;
  font-weight: 600;
}

:deep(.article-content h1) { font-size: 1.75rem; }
:deep(.article-content h2) { font-size: 1.5rem; }
:deep(.article-content h3) { font-size: 1.25rem; }

:deep(.article-content p) {
  color: var(--text-secondary);
  margin: 1.25em 0;
}

:deep(.article-content a) {
  color: var(--accent-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

:deep(.article-content a:hover) {
  border-bottom-color: var(--accent-primary);
}

:deep(.article-content code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875em;
  background: var(--bg-card);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: var(--accent-primary);
}

:deep(.article-content pre) {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1.5em 0;
}

:deep(.article-content pre code) {
  background: none;
  padding: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--text-primary);
}

:deep(.article-content ul),
:deep(.article-content ol) {
  color: var(--text-secondary);
  margin: 1em 0;
  padding-left: 1.5em;
}

:deep(.article-content li) {
  margin: 0.5em 0;
}

:deep(.article-content blockquote) {
  border-left: 3px solid var(--accent-primary);
  margin: 1.5em 0;
  padding: 0.5em 0 0.5em 1.5em;
  color: var(--text-muted);
  font-style: italic;
}

:deep(.article-content img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5em 0;
}

:deep(.article-content hr) {
  border: none;
  height: 1px;
  background: var(--border-color);
  margin: 2em 0;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h2 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

@media (max-width: 640px) {
  .article-title {
    font-size: 1.75rem;
  }
}
</style>