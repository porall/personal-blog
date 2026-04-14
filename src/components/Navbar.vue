<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon">◈</span>
        <span class="logo-text">ZHU<span class="logo-accent">YJ</span></span>
      </router-link>
      
      <div class="nav-links">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >
          <span class="nav-link-en">Home</span>
          <span class="nav-link-zh">首页</span>
        </router-link>
        <router-link 
          to="/blog" 
          class="nav-link"
          :class="{ active: $route.path.startsWith('/blog') }"
        >
          <span class="nav-link-en">Blog</span>
          <span class="nav-link-zh">博客</span>
        </router-link>
        <router-link 
          to="/admin" 
          class="nav-link"
          :class="{ active: $route.path === '/admin' }"
        >
          <span class="nav-link-en">Admin</span>
          <span class="nav-link-zh">管理</span>
        </router-link>
      </div>

      <div class="nav-decoration"></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.logo:hover {
  color: var(--accent-primary);
}

.logo-icon {
  font-size: 1.5rem;
  color: var(--accent-primary);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.logo-accent {
  color: var(--accent-primary);
}

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::before {
  opacity: 0.1;
}

.nav-link.active {
  color: var(--accent-primary);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--accent-primary);
  border-radius: 1px;
}

.nav-link-en {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  opacity: 0.6;
}

.nav-link-zh {
  font-weight: 500;
}

.nav-decoration {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--accent-primary) 20%, 
    var(--accent-secondary) 50%, 
    var(--accent-primary) 80%, 
    transparent 100%
  );
  opacity: 0.5;
}

@media (max-width: 640px) {
  .nav-link-en {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
  }
}
</style>