import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitBranch, Users, Calendar } from 'lucide-react'
import { useGitHub } from '../hooks/useGitHub'

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

const GitHubStats = () => {
  const { user, isAuthenticated, getUserRepositories } = useGitHub()
  const [repositories, setRepositories] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadRepositories()
    }
  }, [isAuthenticated])

  const loadRepositories = async () => {
    setLoading(true)
    try {
      const repos = await getUserRepositories()
      setRepositories(repos)
    } catch (error) {
      console.error('Failed to load repositories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="card text-center py-8">
        <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Connect GitHub to See Your Stats
        </h3>
        <p className="text-gray-600">
          Connect your GitHub account to track your repositories and contributions.
        </p>
      </div>
    )
  }

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* User Profile */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-16 h-16 rounded-2xl shadow-lg"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">@{user.login}</p>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-2xl mb-2 mx-auto">
              <Github className="h-5 w-5 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{user.public_repos}</div>
            <div className="text-sm text-gray-600">Repositories</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-2xl mb-2 mx-auto">
              <Users className="h-5 w-5 text-secondary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-success-100 rounded-2xl mb-2 mx-auto">
              <Star className="h-5 w-5 text-success-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalStars}</div>
            <div className="text-sm text-gray-600">Total Stars</div>
          </div>
        </div>
      </div>

      {/* Recent Repositories */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <GitBranch className="h-5 w-5 text-primary-600" />
          <span>Recent Repositories</span>
        </h4>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading repositories...</p>
          </div>
        ) : repositories.length > 0 ? (
          <div className="space-y-3">
            {repositories.slice(0, 5).map((repo) => (
              <div key={repo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-gray-900">{repo.name}</h5>
                    {repo.language && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm py-2 px-3"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No repositories found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default GitHubStats