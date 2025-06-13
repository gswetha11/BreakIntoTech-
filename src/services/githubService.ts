interface GitHubUser {
  id: number
  login: string
  name: string
  email: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  private: boolean
  created_at: string
  updated_at: string
  stargazers_count: number
  language: string
}

class GitHubService {
  private clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liK2fsNDLsx5xZpA'
  private redirectUri = `${window.location.origin}/auth/github/callback`
  private accessToken: string | null = null

  constructor() {
    // Check if we have a stored access token
    this.accessToken = localStorage.getItem('github_access_token')
    
    // Check for pending direct auth
    this.checkPendingAuth()
  }

  private async checkPendingAuth() {
    const isPending = localStorage.getItem('github_auth_pending')
    const authCode = localStorage.getItem('github_auth_code')
    
    if (isPending && authCode) {
      console.log('Processing pending GitHub authentication...')
      try {
        localStorage.removeItem('github_auth_pending')
        localStorage.removeItem('github_auth_code')
        
        // Create mock token for demo
        this.accessToken = 'demo_token_' + Date.now()
        localStorage.setItem('github_access_token', this.accessToken)
        
        // Create mock user data
        const mockUser: GitHubUser = {
          id: 12345,
          login: 'techpath_user',
          name: 'TechPath User',
          email: 'user@techpath.dev',
          avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          public_repos: 15,
          followers: 42,
          following: 28
        }
        localStorage.setItem('github_user', JSON.stringify(mockUser))
        
        // Trigger a custom event to notify components
        window.dispatchEvent(new CustomEvent('github-auth-success'))
        console.log('GitHub authentication completed successfully')
      } catch (error) {
        console.error('Failed to process pending auth:', error)
        localStorage.removeItem('github_access_token')
        localStorage.removeItem('github_user')
      }
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  // Get stored user data
  getStoredUser(): GitHubUser | null {
    const userData = localStorage.getItem('github_user')
    return userData ? JSON.parse(userData) : null
  }

  // Initiate GitHub OAuth flow using direct redirect
  initiateAuth(): Promise<GitHubUser> {
    return new Promise((resolve, reject) => {
      try {
        const scope = 'user:email,public_repo,repo'
        const state = this.generateState()
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${scope}&state=${state}`
        
        // Store state for verification
        localStorage.setItem('github_oauth_state', state)
        
        // Store current page to return to after auth
        localStorage.setItem('github_auth_return_url', window.location.pathname)
        
        // Set up a listener for when auth completes
        const authCompleteHandler = () => {
          window.removeEventListener('github-auth-success', authCompleteHandler)
          const user = this.getStoredUser()
          if (user) {
            resolve(user)
          } else {
            reject(new Error('Authentication failed'))
          }
        }
        
        window.addEventListener('github-auth-success', authCompleteHandler)
        
        // Redirect to GitHub
        console.log('Redirecting to GitHub for authentication...')
        window.location.href = authUrl
        
      } catch (error) {
        console.error('Error initiating GitHub auth:', error)
        reject(error)
      }
    })
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  async createRepository(projectData: {
    name: string
    description: string
    private?: boolean
    techStack: string[]
    learningGoals: string[]
  }): Promise<GitHubRepo> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with GitHub')
    }

    try {
      const repoName = projectData.name.toLowerCase().replace(/\s+/g, '-')
      
      // Create a mock repository for demo
      const mockRepo: GitHubRepo = {
        id: Math.floor(Math.random() * 1000000),
        name: repoName,
        full_name: `techpath_user/${repoName}`,
        html_url: `https://github.com/techpath_user/${repoName}`,
        description: projectData.description,
        private: projectData.private || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        stargazers_count: 0,
        language: projectData.techStack[0] || 'JavaScript'
      }

      console.log('Repository created (demo):', mockRepo)
      return mockRepo
    } catch (error) {
      console.error('Error creating repository:', error)
      throw error
    }
  }

  // Logout user
  logout(): void {
    this.accessToken = null
    localStorage.removeItem('github_access_token')
    localStorage.removeItem('github_user')
    localStorage.removeItem('github_auth_code')
    localStorage.removeItem('github_auth_pending')
    localStorage.removeItem('github_oauth_state')
    localStorage.removeItem('github_auth_return_url')
  }

  // Get user repositories
  async getUserRepositories(): Promise<GitHubRepo[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with GitHub')
    }

    // Return mock repositories for demo
    return [
      {
        id: 1,
        name: 'weather-dashboard',
        full_name: 'techpath_user/weather-dashboard',
        html_url: 'https://github.com/techpath_user/weather-dashboard',
        description: 'A beautiful weather dashboard built with React',
        private: false,
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-02-10T00:00:00Z',
        stargazers_count: 5,
        language: 'JavaScript'
      },
      {
        id: 2,
        name: 'task-manager',
        full_name: 'techpath_user/task-manager',
        html_url: 'https://github.com/techpath_user/task-manager',
        description: 'Interactive task management application',
        private: false,
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-15T00:00:00Z',
        stargazers_count: 3,
        language: 'TypeScript'
      }
    ]
  }
}

export const githubService = new GitHubService()
export default githubService