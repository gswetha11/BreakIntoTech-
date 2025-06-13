import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, LogOut, User, AlertCircle, ExternalLink } from 'lucide-react'
import { useGitHub } from '../hooks/useGitHub'
import toast from 'react-hot-toast'

const GitHubAuthButton = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useGitHub()
  const [showPopupHelp, setShowPopupHelp] = useState(false)

  const handleAuth = async () => {
    if (isAuthenticated) {
      logout()
      toast.success('Logged out from GitHub')
    } else {
      try {
        console.log('Starting GitHub authentication...')
        await login()
        toast.success('🎉 Successfully connected to GitHub!')
      } catch (error: any) {
        console.error('GitHub auth error:', error)
        
        if (error.message.includes('Popup blocked')) {
          setShowPopupHelp(true)
          toast.error('Please allow popups and try again', {
            duration: 5000,
          })
        } else if (error.message.includes('cancelled')) {
          toast.error('GitHub authentication was cancelled')
        } else if (error.message.includes('timeout')) {
          toast.error('Authentication timed out. Please try again.')
        } else {
          toast.error('Failed to connect to GitHub. Please try again.')
        }
      }
    }
  }

  const handleDirectAuth = () => {
    // Direct redirect method as fallback
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liK2fsNDLsx5xZpA'
    const redirectUri = `${window.location.origin}/auth/github/callback`
    const scope = 'user:email,public_repo,repo'
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    localStorage.setItem('github_oauth_state', state)
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`
    
    // Store current page to return to after auth
    localStorage.setItem('github_auth_return_url', window.location.pathname)
    
    // Direct redirect
    window.location.href = authUrl
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
    <div className="relative">
      <motion.button
        onClick={handleAuth}
        disabled={isLoading}
        className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
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

      {showPopupHelp && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">Popup Blocked</h4>
              <p className="text-sm text-gray-600 mb-3">
                Your browser blocked the GitHub login popup. You can either:
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong>Option 1:</strong> Allow popups for this site and try again
                </div>
                <div className="text-sm">
                  <strong>Option 2:</strong> Use direct login (opens in same tab)
                </div>
              </div>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={handleDirectAuth}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Direct Login</span>
                </button>
                <button
                  onClick={() => setShowPopupHelp(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubAuthButton