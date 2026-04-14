<template>
  <div class="resume-page">
    <header class="resume-header fade-in">
      <div class="header-decoration"></div>
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-en">RESUME</span>
          <span class="title-zh">简历</span>
        </h1>
        <p class="page-subtitle">前端开发工程师 | 3年经验</p>
      </div>
    </header>

    <main class="resume-content">
      <!-- 基本信息 -->
      <section class="resume-section fade-in stagger-1">
        <h2 class="section-title">
          <span class="section-icon">👤</span>
          <span>基本信息</span>
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">姓名</span>
            <span class="info-value">{{ userInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">意向岗位</span>
            <span class="info-value">{{ userInfo.title }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">手机</span>
            <a :href="`tel:${userInfo.phone}`" class="info-value link">{{ userInfo.phone }}</a>
          </div>
          <div class="info-item">
            <span class="info-label">邮箱</span>
            <a :href="`mailto:${userInfo.email}`" class="info-value link">{{ userInfo.email }}</a>
          </div>
          <div class="info-item">
            <span class="info-label">所在城市</span>
            <span class="info-value">{{ userInfo.location }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">工作经验</span>
            <span class="info-value">{{ userInfo.workYears }}年</span>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="resume-section fade-in stagger-2">
        <h2 class="section-title">
          <span class="section-icon">🎓</span>
          <span>教育背景</span>
        </h2>
        <div class="edu-card">
          <div class="edu-header">
            <h3 class="edu-school">{{ userInfo.education.school }}</h3>
            <span class="edu-degree">{{ userInfo.education.degree }}</span>
          </div>
          <div class="edu-detail">
            <span class="edu-major">{{ userInfo.education.major }}</span>
            <span class="edu-divider">|</span>
            <span class="edu-time">{{ userInfo.education.graduation }}</span>
          </div>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="resume-section fade-in stagger-3">
        <h2 class="section-title">
          <span class="section-icon">🛠</span>
          <span>技术栈</span>
        </h2>
        <div class="skills-list">
          <div class="skill-group">
            <h3 class="skill-type">核心技能</h3>
            <div class="skill-tags">
              <span v-for="skill in userInfo.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目经验 -->
      <section class="resume-section fade-in stagger-4">
        <h2 class="section-title">
          <span class="section-icon">💼</span>
          <span>项目经验</span>
        </h2>
        <div class="projects-list">
          <article v-for="(project, index) in manualProjects" :key="project.id" class="project-item">
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <a v-if="project.link" :href="project.link" target="_blank" class="project-link">
                查看 <span class="link-arrow">↗</span>
              </a>
            </div>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- 工作经历 -->
      <section class="resume-section fade-in stagger-5">
        <h2 class="section-title">
          <span class="section-icon">💼</span>
          <span>工作经历</span>
        </h2>
        <div class="work-list">
          <article v-for="work in workExperience" :key="work.company" class="work-item">
            <div class="work-header">
              <div class="work-company">{{ work.company }}</div>
              <span class="work-period">{{ work.period }}</span>
            </div>
            <div class="work-position">{{ work.position }}</div>
            <ul class="work-tasks">
              <li v-for="(task, i) in work.tasks" :key="i">{{ task }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- 证书 -->
      <section class="resume-section fade-in stagger-6">
        <h2 class="section-title">
          <span class="section-icon">📜</span>
          <span>证书</span>
        </h2>
        <div class="cert-list">
          <div class="cert-item">
            <span class="cert-name">{{ userInfo.certificate }}</span>
          </div>
        </div>
      </section>
    </main>

    <footer class="resume-footer fade-in stagger-6">
      <button @click="downloadResume" class="download-btn">
        <span class="btn-icon">📥</span>
        <span>下载简历</span>
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { userInfo, manualProjects } from '../data/user'

const workExperience = [
  {
    company: '深圳XX科技有限公司',
    position: '前端开发工程师',
    period: '2022.07 - 至今',
    tasks: [
      '负责公司核心产品的前端开发工作',
      '主导低代码可视化平台重构，提升开发效率 40%',
      '优化前端性能，将首屏加载时间从 3s 降至 1.2s'
    ]
  }
]

const downloadResume = () => {
  // 可扩展为 PDF 下载功能
  window.print()
}
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  padding: 2rem 1.5rem 4rem;
  max-width: 900px;
  margin: 0 auto;
}

.resume-header {
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

.resume-section {
  margin-bottom: 2.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.section-icon {
  font-size: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  gap: 0.75rem;
}

.info-label {
  color: var(--text-muted);
  font-size: 0.875rem;
  min-width: 60px;
}

.info-value {
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.info-value.link {
  color: var(--accent-primary);
  text-decoration: none;
}

.info-value.link:hover {
  text-decoration: underline;
}

.edu-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.edu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.edu-school {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.edu-degree {
  font-size: 0.8125rem;
  color: var(--accent-primary);
  background: rgba(0, 217, 255, 0.1);
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
}

.edu-detail {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.edu-divider {
  margin: 0 0.5rem;
  opacity: 0.5;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-type {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.skill-tag:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.project-name {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0;
}

.project-link {
  font-size: 0.875rem;
  color: var(--accent-primary);
  text-decoration: none;
}

.project-link:hover {
  text-decoration: underline;
}

.link-arrow {
  font-size: 0.75rem;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin: 0 0 1rem;
  line-height: 1.6;
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

.work-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.work-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.work-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.work-company {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0;
}

.work-period {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.work-position {
  color: var(--accent-primary);
  font-size: 0.9375rem;
  margin-bottom: 0.75rem;
}

.work-tasks {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.8;
}

.work-tasks li {
  margin: 0.375rem 0;
}

.cert-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cert-item {
  padding: 0.75rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.cert-name {
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.resume-footer {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--accent-gradient);
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 217, 255, 0.3);
}

@media print {
  .resume-footer {
    display: none;
  }
}

@media (max-width: 640px) {
  .title-en {
    font-size: 2rem;
  }
  
  .title-zh {
    font-size: 1.25rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .edu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .work-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>