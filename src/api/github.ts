import { ref } from 'vue'

export interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

const GITHUB_USERNAME = 'porall'

export function useGitHubRepos() {
  const repos = ref<GitHubRepo[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchRepos = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch repos')
      }
      
      const data = await response.json()
      repos.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return {
    repos,
    loading,
    error,
    fetchRepos
  }
}