<template>
  <a 
    :href="project.html_url" 
    target="_blank"
    class="project-card"
  >
    <div class="card-header">
      <h3 class="card-name">{{ project.name }}</h3>
      <span class="card-arrow">↗</span>
    </div>
    
    <p class="card-desc">{{ project.description || 'No description' }}</p>
    
    <div class="card-footer">
      <div class="card-stats">
        <span v-if="project.language" class="stat-item">
          <span class="stat-dot" :style="{ background: languageColor(project.language) }"></span>
          <span class="stat-text">{{ project.language }}</span>
        </span>
        <span class="stat-item">
          <span class="stat-icon">★</span>
          <span class="stat-text">{{ project.stargazers_count }}</span>
        </span>
        <span class="stat-item">
          <span class="stat-icon">⑂</span>
          <span class="stat-text">{{ project.forks_count }}</span>
        </span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  project: {
    name: string
    description: string
    html_url: string
    stargazers_count: number
    forks_count: number
    language: string
  }
}>()

const languageColor = (lang: string): string => {
  const colors: Record<string, string> = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Vue': '#41b883',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
  }
  return colors[lang] || '#8b949e'
}
</script>

<style scoped>
.project-card {
  display: block;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0;
}

.project-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.card-name {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s;
}

.project-card:hover .card-name {
  color: var(--accent-primary);
}

.card-arrow {
  font-size: 1.25rem;
  color: var(--text-muted);
  transition: all 0.3s;
  opacity: 0;
}

.project-card:hover .card-arrow {
  opacity: 1;
  transform: translate(2px, -2px);
  color: var(--accent-primary);
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1.25rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.card-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.stat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.stat-icon {
  font-size: 0.875rem;
}

.stat-text {
  font-family: 'JetBrains Mono', monospace;
}
</style>