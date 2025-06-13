import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Star, GitBranch, Calendar } from 'lucide-react'

const ProjectDetails = () => {
  const { id } = useParams()

  // Mock project data - in real app, this would come from API/state
  const project = {
    id: 1,
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard that displays current weather conditions and forecasts for multiple cities.',
    longDescription: 'This project demonstrates your ability to work with APIs, handle asynchronous data, create responsive layouts, and implement modern UI patterns. You\'ll learn how to fetch data from external APIs, manage application state, and create an intuitive user interface.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API'],
    learningGoals: [
      'API integration and data fetching',
      'State management in React',
      'Responsive design principles',
      'Error handling and loading states',
      'Working with external APIs'
    ],
    stretchGoals: [
      'Add geolocation support',
      'Implement dark mode',
      'Add weather alerts',
      'Create mobile app version'
    ],
    status: 'completed',
    githubUrl: 'https://github.com/username/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.netlify.app',
    commits: 24,
    stars: 5,
    createdAt: '2024-01-15',
    completedAt: '2024-02-10'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="card mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <p className="text-lg text-gray-600">{project.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <GitBranch className="h-4 w-4" />
                <span>{project.commits} commits</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-4 w-4" />
                <span>{project.stars} stars</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Started {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span>View Code</span>
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Project</h2>
              <p className="text-gray-600 mb-6">{project.longDescription}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Goals</h3>
                <ul className="space-y-2">
                  {project.learningGoals.map((goal, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stretch Goals</h3>
                <ul className="space-y-2">
                  {project.stretchGoals.map((goal, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="card mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-900">Project Started</div>
                  <div className="text-sm text-gray-600">{new Date(project.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              {project.completedAt && (
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Project Completed</div>
                    <div className="text-sm text-gray-600">{new Date(project.completedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetails