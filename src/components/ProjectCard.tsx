import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Code, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { useGitHub } from '../hooks/useGitHub'
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
  const { isAuthenticated, createRepository, login } = useGitHub()

  const handleCreateRepo = async () => {
    try {
      if (!isAuthenticated) {
        toast.error('Please connect your GitHub account first')
        try {
          await login()
          // After successful login, try creating the repo again
          await createRepository({
            name: project.title,
            description: project.description,
            techStack: project.techStack,
            learningGoals: project.learningGoals
          })
          toast.success('🎉 GitHub repository created successfully!')
        } catch (error) {
          toast.error('Failed to connect to GitHub')
        }
        return
      }

      await createRepository({
        name: project.title,
        description: project.description,
        techStack: project.techStack,
        learningGoals: project.learningGoals
      })
      
      toast.success('🎉 GitHub repository created successfully!')
    } catch (error) {
      toast.error('Failed to create repository. Please try again.')
    }
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
          onClick={handleCreateRepo}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
        >
          <Github className="h-4 w-4" />
          <span>{isAuthenticated ? 'Create Repo' : 'Connect & Create'}</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2">
          <ExternalLink className="h-4 w-4" />
          <span>Guide</span>
        </button>
      </div>

      <div className="p-4 bg-gradient-to-r from-success-50 to-primary-50 rounded-2xl border border-success-200">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm text-success-800 font-medium mb-1">
              Motivational Boost
            </p>
            <p className="text-sm text-success-700">
              "Every line of code you write is a step toward your future—let's go!"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard