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
  private clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'your_github_client_id'
  private redirectUri = `${window.location.origin}/auth/github/callback`
  private accessToken: string | null = null
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/' // CORS proxy for development

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
    try {
      // Note: In production, this should be done through your backend server
      // For development, we'll use a CORS proxy
      const response = await fetch(`${this.proxyUrl}https://github.com/login/oauth/access_token`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET, // You'll need to provide this
          code: code,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to exchange code for token')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error_description || data.error)
      }

      this.accessToken = data.access_token
      localStorage.setItem('github_access_token', this.accessToken!)
      localStorage.removeItem('github_oauth_state')
    } catch (error) {
      console.error('Token exchange error:', error)
      throw new Error('Failed to authenticate with GitHub')
    }
  }

  async fetchUserData(): Promise<GitHubUser | null> {
    if (!this.accessToken) return null

    try {
      const response = await fetch(`${this.proxyUrl}https://api.github.com/user`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const userData = await response.json()
      
      // Also fetch user email if not public
      let email = userData.email
      if (!email) {
        try {
          const emailResponse = await fetch(`${this.proxyUrl}https://api.github.com/user/emails`, {
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
      
      // Create repository
      const response = await fetch(`${this.proxyUrl}https://api.github.com/user/repos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          description: projectData.description,
          private: projectData.private || false,
          auto_init: true,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create repository')
      }

      const repoData = await response.json()

      // Create initial files
      await this.createInitialFiles(repoData, projectData)

      return {
        id: repoData.id,
        name: repoData.name,
        full_name: repoData.full_name,
        html_url: repoData.html_url,
        description: repoData.description,
        private: repoData.private,
        created_at: repoData.created_at,
        updated_at: repoData.updated_at,
        stargazers_count: repoData.stargazers_count,
        language: repoData.language
      }
    } catch (error) {
      console.error('Error creating repository:', error)
      throw error
    }
  }

  private async createInitialFiles(repo: any, projectData: any): Promise<void> {
    if (!this.accessToken) return

    try {
      // Create README.md
      const readmeContent = this.generateReadmeContent(projectData)
      await this.createFile(repo.full_name, 'README.md', readmeContent, 'Initial README')

      // Create .gitignore
      const gitignoreContent = this.generateGitignoreContent(projectData.techStack)
      await this.createFile(repo.full_name, '.gitignore', gitignoreContent, 'Add .gitignore')

      // Create basic project structure based on tech stack
      if (projectData.techStack.includes('React')) {
        const packageJson = this.generatePackageJson(projectData)
        await this.createFile(repo.full_name, 'package.json', packageJson, 'Add package.json')
      }
    } catch (error) {
      console.warn('Could not create initial files:', error)
    }
  }

  private async createFile(repoFullName: string, path: string, content: string, message: string): Promise<void> {
    try {
      await fetch(`${this.proxyUrl}https://api.github.com/repos/${repoFullName}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
        }),
      })
    } catch (error) {
      console.warn(`Could not create file ${path}:`, error)
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

## 📝 Project Structure

\`\`\`
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/
├── public/
└── README.md
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

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
pnpm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
`

    if (techStack.includes('React') || techStack.includes('Next.js')) {
      gitignore += `
# React/Next.js
.next/
out/
.vercel/
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
.venv/
pip-log.txt
pip-delete-this-directory.txt
`
    }

    if (techStack.includes('TypeScript')) {
      gitignore += `
# TypeScript
*.tsbuildinfo
`
    }

    return gitignore
  }

  private generatePackageJson(projectData: any): string {
    const packageName = projectData.name.toLowerCase().replace(/\s+/g, '-')
    
    return JSON.stringify({
      name: packageName,
      version: "1.0.0",
      description: projectData.description,
      main: "index.js",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0"
      },
      devDependencies: {
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "@vitejs/plugin-react": "^4.0.0",
        typescript: "^5.0.0",
        vite: "^4.0.0"
      },
      keywords: projectData.techStack,
      author: "TechPath User",
      license: "MIT"
    }, null, 2)
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

    try {
      const response = await fetch(`${this.proxyUrl}https://api.github.com/user/repos?sort=updated&per_page=10`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch repositories')
      }

      const repos = await response.json()
      
      return repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        private: repo.private,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        language: repo.language
      }))
    } catch (error) {
      console.error('Error fetching repositories:', error)
      throw error
    }
  }
}

export const githubService = new GitHubService()
export default githubService