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
    const storedUser = githubService.getStoredUser()
    if (storedUser && githubService.isAuthenticated()) {
      setUser(storedUser)
      setIsAuthenticated(true)
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