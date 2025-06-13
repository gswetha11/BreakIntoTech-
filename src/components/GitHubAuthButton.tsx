import React from 'react'
import { motion } from 'framer-motion'
import { Github, LogOut, User, AlertCircle } from 'lucide-react'
import { useGitHub } from '../hooks/useGitHub'
import toast from 'react-hot-toast'

const GitHubAuthButton = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useGitHub()

  const handleAuth = async () => {
    if (isAuthenticated) {
      logout()
      toast.success('Logged out from GitHub')
    } else {
      try {
        await login()
        toast.success('🎉 Successfully connected to GitHub!')
      } catch (error: any) {
        console.error('GitHub auth error:', error)
        
        if (error.message.includes('Popup blocked')) {
          toast.error('Please allow popups and try again')
        } else if (error.message.includes('cancelled')) {
          toast.error('GitHub authentication was cancelled')
        } else {
          toast.error('Failed to connect to GitHub. Please try again.')
        }
      }
    }
  }

  // Check if GitHub credentials are configured
  const isConfigured = import.meta.env.VITE_GITHUB_CLIENT_ID && 
                      import.meta.env.VITE_GITHUB_CLIENT_ID !== 'your_github_client_id_here'

  if (!isConfigured) {
    return (
      <div className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-2xl px-3 py-2">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <span className="text-sm text-yellow-700">GitHub not configured</span>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-2xl px-3 py-2">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user.login}
          </span>
        </div>
        <button
          onClick={handleAuth}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all duration-200"
          title="Logout from GitHub"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <motion.button
      onClick={handleAuth}
      disabled={isLoading}
      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Github className="h-4 w-4" />
          <span>Connect GitHub</span>
        </>
      )}
    </motion.button>
  )
}

export default GitHubAuthButton