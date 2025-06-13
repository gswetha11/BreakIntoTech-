import { useState, useEffect } from 'react'
import githubService from '../services/githubService'

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

export const useGitHub = () => {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = () => {
      const storedUser = githubService.getStoredUser()
      if (storedUser && githubService.isAuthenticated()) {
        setUser(storedUser)
        setIsAuthenticated(true)
      }
    }

    // Initial check
    checkAuthStatus()

    // Listen for auth success events
    const handleAuthSuccess = () => {
      console.log('GitHub auth success event received')
      checkAuthStatus()
    }

    window.addEventListener('github-auth-success', handleAuthSuccess)

    // Also check periodically in case the event was missed
    const interval = setInterval(checkAuthStatus, 1000)

    // Cleanup
    return () => {
      window.removeEventListener('github-auth-success', handleAuthSuccess)
      clearInterval(interval)
    }
  }, [])

  const login = async () => {
    setIsLoading(true)
    try {
      const userData = await githubService.initiateAuth()
      setUser(userData)
      setIsAuthenticated(true)
      return userData
    } catch (error) {
      console.error('GitHub login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    githubService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const createRepository = async (projectData: any) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated with GitHub')
    }
    return await githubService.createRepository(projectData)
  }

  const getUserRepositories = async () => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated with GitHub')
    }
    return await githubService.getUserRepositories()
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    createRepository,
    getUserRepositories
  }
}