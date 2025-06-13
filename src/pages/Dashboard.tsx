import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Trophy, Code, GitBranch, Star, TrendingUp, Calendar, Target } from 'lucide-react'

const Dashboard = () => {
  const [careerReadiness, setCareerReadiness] = useState(72)
  const [projects, setProjects] = useState([
    { id: 1, name: 'Weather Dashboard', status: 'completed', commits: 24, stars: 5 },
    { id: 2, name: 'Task Manager', status: 'in-progress', commits: 12, stars: 2 },
    { id: 3, name: 'Portfolio Website', status: 'planned', commits: 0, stars: 0 },
  ])

  const skillsData = [
    { name: 'JavaScript', level: 85, color: '#f7df1e' },
    { name: 'React', level: 78, color: '#61dafb' },
    { name: 'CSS', level: 82, color: '#1572b6' },
    { name: 'Node.js', level: 65, color: '#339933' },
    { name: 'Git', level: 75, color: '#f05032' },
  ]

  const activityData = [
    { month: 'Jan', commits: 45, projects: 2 },
    { month: 'Feb', commits: 52, projects: 1 },
    { month: 'Mar', commits: 38, projects: 3 },
    { month: 'Apr', commits: 67, projects: 2 },
    { month: 'May', commits: 71, projects: 1 },
    { month: 'Jun', commits: 89, projects: 2 },
  ]

  const readinessFactors = [
    { name: 'Portfolio Quality', value: 85, color: '#0ea5e9' },
    { name: 'Technical Skills', value: 78, color: '#22c55e' },
    { name: 'Project Diversity', value: 65, color: '#f59e0b' },
    { name: 'Code Quality', value: 72, color: '#8b5cf6' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Dashboard</h1>
          <p className="text-gray-600">Track your progress and career readiness</p>
        </motion.div>

        {/* Career Readiness Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Career Readiness Score</h2>
              <p className="text-white/90 mb-4">
                Based on your portfolio, skills, and project activity
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">{careerReadiness}%</div>
                <div className="flex items-center space-x-2 text-white/90">
                  <TrendingUp className="h-5 w-5" />
                  <span>+8% this month</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Trophy className="h-24 w-24 text-white/20" />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-primary-500" />
                    <span className="text-gray-600">Active Projects</span>
                  </div>
                  <span className="font-semibold text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">Total Commits</span>
                  </div>
                  <span className="font-semibold text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600">GitHub Stars</span>
                  </div>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Complete Task Manager project</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Add 3 more projects to portfolio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Reach 80% readiness score</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" fill="#0ea5e9" name="Commits" />
                <Bar dataKey="projects" fill="#22c55e" name="Projects" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Progress</h3>
            <div className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Readiness Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Readiness Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={readinessFactors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {readinessFactors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {readinessFactors.map((factor, index) => (
                <div key={factor.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: factor.color }}
                  ></div>
                  <span className="text-xs text-gray-600">{factor.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === 'completed' ? 'bg-green-500' :
                    project.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{project.status.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <GitBranch className="h-4 w-4" />
                    <span>{project.commits}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{project.stars}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard