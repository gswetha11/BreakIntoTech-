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
  private clientId = 'your_github_client_id' // In production, this would come from environment variables
  private redirectUri = `${window.location.origin}/auth/github/callback`
  private accessToken: string | null = null

  constructor() {
    // Check if we have a stored access token
    this.accessToken = localStorage.getItem('github_access_token')
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

  // Initiate GitHub OAuth flow
  initiateAuth(): Promise<GitHubUser> {
    return new Promise((resolve, reject) => {
      const scope = 'user:email,public_repo,repo'
      const state = this.generateState()
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${scope}&state=${state}`
      
      // Store state for verification
      localStorage.setItem('github_oauth_state', state)
      
      // Open GitHub auth in a popup
      const popup = window.open(
        authUrl,
        'github-auth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      )

      if (!popup) {
        reject(new Error('Popup blocked. Please allow popups for this site.'))
        return
      }

      // Listen for the popup to close or send a message
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          // Check if authentication was successful
          const user = this.getStoredUser()
          if (user) {
            resolve(user)
          } else {
            reject(new Error('Authentication was cancelled'))
          }
        }
      }, 1000)

      // Listen for messages from the popup
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return
        
        if (event.data.type === 'GITHUB_AUTH_SUCCESS') {
          this.handleAuthSuccess(event.data.code, event.data.state)
            .then(resolve)
            .catch(reject)
          popup?.close()
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
        } else if (event.data.type === 'GITHUB_AUTH_ERROR') {
          reject(new Error(event.data.error || 'Authentication failed'))
          popup?.close()
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
        }
      }

      window.addEventListener('message', messageHandler)
    })
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private async handleAuthSuccess(code: string, state: string): Promise<GitHubUser> {
    try {
      // Verify state
      const storedState = localStorage.getItem('github_oauth_state')
      if (state !== storedState) {
        throw new Error('Invalid state parameter')
      }

      // Exchange code for token
      await this.exchangeCodeForToken(code)
      
      // Fetch user data
      const user = await this.fetchUserData()
      if (!user) {
        throw new Error('Failed to fetch user data')
      }
      
      return user
    } catch (error) {
      console.error('GitHub auth error:', error)
      throw error
    }
  }

  private async exchangeCodeForToken(code: string): Promise<void> {
    // In a real app, this would be a call to your backend
    // For demo purposes, we'll simulate a successful token exchange
    const mockToken = 'ghp_' + Math.random().toString(36).substring(2, 40)
    this.accessToken = mockToken
    localStorage.setItem('github_access_token', mockToken)
    localStorage.removeItem('github_oauth_state')
  }

  async fetchUserData(): Promise<GitHubUser | null> {
    if (!this.accessToken) return null

    try {
      // In a real app, this would make an actual API call
      // For demo purposes, we'll return mock data
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
      return mockUser
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
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
      // In a real app, this would make an actual API call to create the repository
      // For demo purposes, we'll simulate repository creation
      const repoName = projectData.name.toLowerCase().replace(/\s+/g, '-')
      
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

      // Simulate creating initial files
      await this.createInitialFiles(mockRepo, projectData)

      return mockRepo
    } catch (error) {
      console.error('Error creating repository:', error)
      throw error
    }
  }

  private async createInitialFiles(repo: GitHubRepo, projectData: any): Promise<void> {
    // Simulate creating README.md, .gitignore, and basic project structure
    const readmeContent = this.generateReadmeContent(projectData)
    const gitignoreContent = this.generateGitignoreContent(projectData.techStack)
    
    // In a real app, these would be actual API calls to create files
    console.log('Creating README.md:', readmeContent)
    console.log('Creating .gitignore:', gitignoreContent)
  }

  private generateReadmeContent(projectData: any): string {
    return `# ${projectData.name}

${projectData.description}

## 🚀 Tech Stack

${projectData.techStack.map((tech: string) => `- ${tech}`).join('\n')}

## 📚 Learning Goals

${projectData.learningGoals.map((goal: string) => `- ${goal}`).join('\n')}

## 🎯 Stretch Goal

${projectData.stretchGoal}

## 🛠️ Getting Started

1. Clone this repository
2. Install dependencies
3. Start building!

---

Built with ❤️ using TechPath
`
  }

  private generateGitignoreContent(techStack: string[]): string {
    let gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`

    if (techStack.includes('React') || techStack.includes('Next.js')) {
      gitignore += `
# React
.next/
out/
`
    }

    if (techStack.includes('Python')) {
      gitignore += `
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
`
    }

    return gitignore
  }

  // Logout user
  logout(): void {
    this.accessToken = null
    localStorage.removeItem('github_access_token')
    localStorage.removeItem('github_user')
  }

  // Get user repositories
  async getUserRepositories(): Promise<GitHubRepo[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with GitHub')
    }

    // Mock repositories for demo
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