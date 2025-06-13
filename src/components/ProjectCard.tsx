import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Code, Zap } from 'lucide-react'
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
  const handleCreateRepo = async () => {
    try {
      // In a real app, this would call the GitHub API
      toast.success('GitHub repository created successfully!')
    } catch (error) {
      toast.error('Failed to create repository. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{project.emoji}</span>
          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        </div>
        <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors" />
      </div>

      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
          <Code className="h-4 w-4" />
          <span>You'll Learn:</span>
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {project.learningGoals.map((goal, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Tech Stack:</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 p-3 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-1 flex items-center space-x-2">
          <Zap className="h-4 w-4 text-secondary-600" />
          <span>Stretch Goal:</span>
        </h4>
        <p className="text-sm text-gray-700">{project.stretchGoal}</p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleCreateRepo}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
        >
          <Github className="h-4 w-4" />
          <span>Create Repo</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2">
          <ExternalLink className="h-4 w-4" />
          <span>Guide</span>
        </button>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800 font-medium">
          💡 "Every line of code you write is a step toward your future—let's go!"
        </p>
      </div>
    </motion.div>
  )
}

export default ProjectCard