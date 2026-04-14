<template>
  <router-link 
    :to="`/blog/${post.id}`" 
    class="blog-card"
  >
    <div class="card-glow"></div>
    <div class="card-content">
      <div class="card-header">
        <span class="card-date">{{ post.date }}</span>
        <div class="card-tags">
          <span 
            v-for="tag in post.tags.slice(0, 2)" 
            :key="tag"
            class="card-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      
      <h3 class="card-title">{{ post.title }}</h3>
      <p class="card-excerpt">{{ post.excerpt }}</p>
      
      <div class="card-footer">
        <span class="read-more">Read more</span>
        <span class="read-arrow">→</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { BlogPost } from '../stores/blog'

defineProps<{
  post: BlogPost
}>()
</script>

<style scoped>
.blog-card {
  position: relative;
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s ease;
  opacity: 0;
}

.blog-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--accent-primary), 
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.blog-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.card-tags {
  display: flex;
  gap: 0.375rem;
}

.card-tag {
  padding: 0.25rem 0.5rem;
  background: rgba(0, 217, 255, 0.1);
  border-radius: 4px;
  font-size: 0.6875rem;
  color: var(--accent-primary);
  font-family: 'JetBrains Mono', monospace;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
  line-height: 1.4;
  transition: color 0.3s;
}

.blog-card:hover .card-title {
  color: var(--accent-primary);
}

.card-excerpt {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1.25rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.read-more {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.3s;
}

.blog-card:hover .read-more {
  color: var(--accent-primary);
}

.read-arrow {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: all 0.3s;
}

.blog-card:hover .read-arrow {
  color: var(--accent-primary);
  transform: translateX(4px);
}
</style>