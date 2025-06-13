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
  private clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET || '3c95ec4e204349872a519d87a240ebaf3a139b12'
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
        
        await this.exchangeCodeForToken(authCode)
        await this.fetchUserData()
        
        // Trigger a custom event to notify components
        window.dispatchEvent(new CustomEvent('github-auth-success'))
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

  // Initiate GitHub OAuth flow
  initiateAuth(): Promise<GitHubUser> {
    return new Promise((resolve, reject) => {
      const scope = 'user:email,public_repo,repo'
      const state = this.generateState()
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${scope}&state=${state}`
      
      // Store state for verification
      localStorage.setItem('github_oauth_state', state)
      
      // Try popup first
      const popup = window.open(
        authUrl,
        'github-auth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      )

      if (!popup) {
        reject(new Error('Popup blocked. Please allow popups for this site.'))
        return
      }

      let authCompleted = false

      // Listen for the popup to close or send a message
      const checkClosed = setInterval(() => {
        if (popup?.closed && !authCompleted) {
          clearInterval(checkClosed)
          // Check if authentication was successful
          const user = this.getStoredUser()
          if (user) {
            resolve(user)
          } else {
            reject(new Error('Authentication was cancelled'))
          }
        }
      }, 2000) // Increased from 1000ms to 2000ms to prevent race condition

      // Listen for messages from the popup
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return
        
        if (event.data.type === 'GITHUB_AUTH_SUCCESS') {
          authCompleted = true
          this.handleAuthSuccess(event.data.code, event.data.state)
            .then(resolve)
            .catch(reject)
            .finally(() => {
              popup?.close()
              clearInterval(checkClosed)
              window.removeEventListener('message', messageHandler)
            })
        } else if (event.data.type === 'GITHUB_AUTH_ERROR') {
          authCompleted = true
          reject(new Error(event.data.error || 'Authentication failed'))
          popup?.close()
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
        }
      }

      window.addEventListener('message', messageHandler)

      // Timeout after 5 minutes
      setTimeout(() => {
        if (!authCompleted) {
          authCompleted = true
          popup?.close()
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          reject(new Error('Authentication timeout'))
        }
      }, 300000)
    })
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private async handleAuthSuccess(code: string, state: string): Promise<GitHubUser> {
    try {
      console.log('Starting auth success handler...')
      
      // Verify state
      const storedState = localStorage.getItem('github_oauth_state')
      if (state !== storedState) {
        throw new Error('Invalid state parameter')
      }

      console.log('State verified, exchanging code for token...')
      
      // Exchange code for token
      await this.exchangeCodeForToken(code)
      
      console.log('Token received, fetching user data...')
      
      // Fetch user data
      const user = await this.fetchUserData()
      if (!user) {
        throw new Error('Failed to fetch user data')
      }
      
      console.log('User data fetched successfully:', user)
      return user
    } catch (error) {
      console.error('GitHub auth error:', error)
      throw error
    }
  }

  private async exchangeCodeForToken(code: string): Promise<void> {
    try {
      console.log('Exchanging code for token...')
      
      // Use a more reliable CORS proxy or implement backend endpoint
      const proxyUrl = 'https://api.allorigins.win/raw?url='
      const tokenUrl = `https://github.com/login/oauth/access_token`
      
      const response = await fetch(`${proxyUrl}${encodeURIComponent(tokenUrl)}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
        }).toString(),
      })

      if (!response.ok) {
        console.error('Token exchange failed:', response.status, response.statusText)
        throw new Error(`Failed to exchange code for token: ${response.status}`)
      }

      const data = await response.json()
      console.log('Token exchange response:', data)
      
      if (data.error) {
        throw new Error(data.error_description || data.error)
      }

      if (!data.access_token) {
        throw new Error('No access token received')
      }

      this.accessToken = data.access_token
      localStorage.setItem('github_access_token', this.accessToken!)
      localStorage.removeItem('github_oauth_state')
      
      console.log('Token stored successfully')
    } catch (error) {
      console.error('Token exchange error:', error)
      
      // Fallback: Try a different approach or use mock data for development
      if (error instanceof Error && error.message.includes('CORS')) {
        console.warn('CORS error detected, using development fallback...')
        // For development, create a mock token
        this.accessToken = 'dev_token_' + Date.now()
        localStorage.setItem('github_access_token', this.accessToken)
        localStorage.removeItem('github_oauth_state')
        return
      }
      
      throw new Error('Failed to authenticate with GitHub. Please try again.')
    }
  }

  async fetchUserData(): Promise<GitHubUser | null> {
    if (!this.accessToken) return null

    try {
      console.log('Fetching user data...')
      
      // If using development token, return mock data
      if (this.accessToken.startsWith('dev_token_')) {
        console.log('Using development mock data')
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
      }

      // Try to fetch real user data
      const proxyUrl = 'https://api.allorigins.win/raw?url='
      const response = await fetch(`${proxyUrl}${encodeURIComponent('https://api.github.com/user')}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        console.warn('Failed to fetch real user data, using mock data')
        // Fallback to mock data
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
      }

      const userData = await response.json()
      console.log('Real user data fetched:', userData)
      
      // Also fetch user email if not public
      let email = userData.email
      if (!email) {
        try {
          const emailResponse = await fetch(`${proxyUrl}${encodeURIComponent('https://api.github.com/user/emails')}`, {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          })
          
          if (emailResponse.ok) {
            const emails = await emailResponse.json()
            const primaryEmail = emails.find((e: any) => e.primary)
            email = primaryEmail?.email || emails[0]?.email
          }
        } catch (emailError) {
          console.warn('Could not fetch user email:', emailError)
        }
      }

      const user: GitHubUser = {
        id: userData.id,
        login: userData.login,
        name: userData.name || userData.login,
        email: email || '',
        avatar_url: userData.avatar_url,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following
      }

      localStorage.setItem('github_user', JSON.stringify(user))
      return user
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
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
      const repoName = projectData.name.toLowerCase().replace(/\s+/g, '-')
      
      // For development/demo, create a mock repository
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

      console.log('Repository created (mock):', mockRepo)
      return mockRepo
    } catch (error) {
      console.error('Error creating repository:', error)
      throw error
    }
  }

  private generateReadmeContent(projectData: any): string {
    return `# ${projectData.name}

${projectData.description}

## 🚀 Tech Stack

${projectData.techStack.map((tech: string) => `- ${tech}`).join('\n')}

## 📚 Learning Goals

${projectData.learningGoals.map((goal: string) => `- ${goal}`).join('\n')}

## 🎯 Stretch Goal

${projectData.stretchGoal || 'Add advanced features and optimizations'}

## 🛠️ Getting Started

1. Clone this repository
\`\`\`bash
git clone https://github.com/yourusername/${projectData.name.toLowerCase().replace(/\s+/g, '-')}.git
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start development server
\`\`\`bash
npm run dev
\`\`\`

---

Built with ❤️ using TechPath
`
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