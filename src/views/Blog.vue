<template>
  <div class="blog-page">
    <header class="blog-header fade-in">
      <div class="header-decoration"></div>
      <h1 class="page-title">
        <span class="title-en">BLOG</span>
        <span class="title-zh">博客</span>
      </h1>
      <p class="page-subtitle">记录技术探索与思考</p>
    </header>
    
    <div v-if="posts.length > 0" class="posts-grid">
      <BlogCard 
        v-for="(post, index) in posts" 
        :key="post.id" 
        :post="post"
        :style="{ animationDelay: `${0.1 + index * 0.1}s` }"
        class="fade-in"
      />
    </div>
    
    <div v-else class="empty-state fade-in">
      <div class="empty-icon">📝</div>
      <p class="empty-text">No posts yet</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import BlogCard from '../components/BlogCard.vue'

const blogStore = useBlogStore()
const posts = computed(() => blogStore.posts)

onMounted(() => {
  blogStore.loadPosts()
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.header-decoration {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: var(--accent-gradient);
}

.page-title {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
  margin: 0 0 0.5rem;
}

.title-en {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-zh {
  font-size: 1.5rem;
  color: var(--text-muted);
  font-weight: 400;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-card);
  border: 1px dashed var(--border-color);
  border-radius: 12px;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0;
}

@media (max-width: 640px) {
  .title-en {
    font-size: 2rem;
  }
  
  .title-zh {
    font-size: 1.25rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>