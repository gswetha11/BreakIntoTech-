import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, Code, Zap, CheckCircle, Wallet, Coins } from 'lucide-react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import toast from 'react-hot-toast'

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  learningGoals: string[]
  stretchGoal: string
  emoji: string
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { connected, connect } = useWallet()

  const handleCreateProject = async () => {
    try {
      if (!connected) {
        toast.error('Please connect your Aptos wallet first')
        try {
          await connect('Petra' as any)
          toast.success('🎉 Wallet connected! You can now create projects on Aptos!')
        } catch (error) {
          toast.error('Failed to connect wallet')
        }
        return
      }

      // Simulate project creation on Aptos blockchain
      toast.loading('Creating project on Aptos blockchain...', { duration: 2000 })
      
      setTimeout(() => {
        toast.success('🎉 Project created on Aptos blockchain successfully!')
      }, 2000)
      
    } catch (error) {
      toast.error('Failed to create project. Please try again.')
    }
  }

  const handleFundProject = async () => {
    if (!connected) {
      toast.error('Please connect your Aptos wallet first')
      return
    }
    
    toast.success('💰 Project funding feature coming soon!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-colorful hover:shadow-large transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-3xl bg-gradient-to-r from-primary-100 to-secondary-100 p-3 rounded-2xl">
            {project.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Perfect for your level</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200">
          <Star className="h-5 w-5" />
        </button>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-success-500" />
          <span>You'll Learn:</span>
        </h4>
        <ul className="space-y-2">
          {project.learningGoals.map((goal, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-600">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <Code className="h-4 w-4 text-primary-500" />
          <span>Tech Stack:</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl border border-secondary-200">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
          <Zap className="h-4 w-4 text-secondary-600" />
          <span>Stretch Goal:</span>
        </h4>
        <p className="text-sm text-gray-700">{project.stretchGoal}</p>
      </div>

      <div className="flex space-x-3 mb-6">
        <button
          onClick={handleCreateProject}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
        >
          <Wallet className="h-4 w-4" />
          <span>{connected ? 'Create on Aptos' : 'Connect & Create'}</span>
        </button>
        <button 
          onClick={handleFundProject}
          className="btn-secondary flex items-center space-x-2"
        >
          <Coins className="h-4 w-4" />
          <span>Fund</span>
        </button>
      </div>

      <div className="p-4 bg-gradient-to-r from-success-50 to-primary-50 rounded-2xl border border-success-200">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm text-success-800 font-medium mb-1">
              Blockchain-Powered Learning
            </p>
            <p className="text-sm text-success-700">
              "Build on Aptos and showcase your Web3 skills to future employers!"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard