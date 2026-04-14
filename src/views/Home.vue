<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-glow"></div>
        <div class="hero-grid"></div>
      </div>
      
      <div class="hero-content fade-in">
        <div class="avatar-wrapper">
          <div class="avatar-ring"></div>
          <div class="avatar">
            <span class="avatar-emoji">🌊</span>
          </div>
        </div>
        
        <div class="hero-text">
          <h1 class="hero-name">{{ userInfo.name }}</h1>
          <p class="hero-title">{{ userInfo.title }}</p>
          <p class="hero-bio">{{ userInfo.bio }}</p>
          
          <div class="hero-meta">
            <div class="meta-item">
              <span class="meta-icon">📍</span>
              <span>{{ userInfo.location }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">✉️</span>
              <a :href="`mailto:${userInfo.email}`">{{ userInfo.email }}</a>
            </div>
          </div>
        </div>
        
        <div class="skills-section">
          <h3 class="section-title">技术栈</h3>
          <div class="skills-grid">
            <span 
              v-for="(skill, index) in userInfo.skills" 
              :key="skill"
              class="skill-tag"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="section-header fade-in stagger-2">
        <h2 class="section-heading"> Projects </h2>
        <p class="section-subheading">近期项目</p>
      </div>
      
      <div class="projects-grid">
        <div 
          v-for="(project, index) in manualProjects" 
          :key="project.id"
          class="project-card fade-in"
          :style="{ animationDelay: `${0.3 + index * 0.1}s` }"
        >
          <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="project-content">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tech">
              <span 
                v-for="tech in project.tech" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="project-arrow">→</div>
        </div>
      </div>

      <div v-if="githubRepos.length > 0" class="github-section">
        <div class="section-header fade-in stagger-4">
          <h2 class="section-heading"> GitHub </h2>
        </div>
        <div class="github-grid">
          <ProjectCard 
            v-for="(repo, index) in githubRepos.slice(0, 6)" 
            :key="repo.id" 
            :project="repo"
            :style="{ animationDelay: `${0.5 + index * 0.1}s` }"
            class="fade-in"
          />
        </div>
      </div>
      
      <div v-else-if="loading" class="loading-state fade-in">
        <div class="loading-spinner"></div>
        <p>Loading GitHub repos...</p>
      </div>
      
      <div v-else class="empty-state fade-in">
        <p class="empty-text">Configure GitHub username in <code>src/api/github.ts</code></p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { userInfo, manualProjects } from '../data/user'
import { useGitHubRepos } from '../api/github'
import ProjectCard from '../components/ProjectCard.vue'

const { repos: githubRepos, loading, fetchRepos } = useGitHubRepos()

onMounted(() => {
  fetchRepos()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  position: relative;
  padding: 4rem 1.5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, 
    rgba(0, 217, 255, 0.15) 0%, 
    rgba(124, 58, 237, 0.1) 40%, 
    transparent 70%
  );
  filter: blur(60px);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.avatar-wrapper {
  position: relative;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary));
  background-size: 200% 200%;
  animation: ring-rotate 4s linear infinite;
}

@keyframes ring-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  border: 3px solid var(--bg-primary);
}

.avatar-emoji {
  filter: grayscale(20%);
}

.hero-text {
  text-align: center;
}

.hero-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title {
  font-size: 1.125rem;
  color: var(--accent-primary);
  margin: 0 0 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.hero-bio {
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 0 1.5rem;
  line-height: 1.7;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.meta-item a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s;
}

.meta-item a:hover {
  color: var(--accent-primary);
}

.meta-icon {
  font-size: 1rem;
}

.skills-section {
  width: 100%;
  max-width: 600px;
}

.section-title {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0 0 1rem;
  text-align: center;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.375rem 0.875rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.projects-section {
  padding: 3rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-heading {
  font-size: 0.875rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent-primary);
  letter-spacing: 0.15em;
  margin: 0;
}

.section-subheading {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0.5rem 0 0;
  font-weight: 600;
}

.projects-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 3rem;
}

.project-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
  opacity: 0;
}

.project-card:hover {
  border-color: var(--accent-primary);
  transform: translateX(8px);
}

.project-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--border-color);
  min-width: 3rem;
}

.project-content {
  flex: 1;
}

.project-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--text-primary);
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem;
  line-height: 1.5;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tech-tag {
  padding: 0.25rem 0.625rem;
  background: rgba(0, 217, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--accent-primary);
  font-family: 'JetBrains Mono', monospace;
}

.project-arrow {
  font-size: 1.5rem;
  color: var(--border-color);
  transition: all 0.3s;
}

.project-card:hover .project-arrow {
  color: var(--accent-primary);
  transform: translateX(4px);
}

.github-section {
  margin-top: 3rem;
}

.github-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-text {
  font-size: 0.875rem;
}

.empty-text code {
  background: var(--bg-card);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
}

@media (max-width: 640px) {
  .hero-name {
    font-size: 2rem;
  }
  
  .hero-meta {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .project-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .project-arrow {
    display: none;
  }
}
</style>