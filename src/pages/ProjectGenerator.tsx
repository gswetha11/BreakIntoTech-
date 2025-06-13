import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Sparkles, Code, Database, Palette, Brain, Globe, Heart, Accessibility, Zap, Target } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { generateProjects } from '../services/projectService'
import toast from 'react-hot-toast'

interface FormData {
  interest: string
  skillLevel: string
  notes: string
}

const ProjectGenerator = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { register, handleSubmit, watch } = useForm<FormData>()

  const interests = [
    { value: 'frontend', label: 'Frontend Development', icon: Code, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100' },
    { value: 'ai-ml', label: 'AI/ML', icon: Brain, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-100' },
    { value: 'data-analysis', label: 'Data Analysis', icon: Database, color: 'from-green-500 to-teal-500', bg: 'bg-green-100' },
    { value: 'ui-ux', label: 'UI/UX Design', icon: Palette, color: 'from-orange-500 to-red-500', bg: 'bg-orange-100' },
    { value: 'fullstack', label: 'Full-stack Projects', icon: Globe, color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-100' },
    { value: 'accessibility', label: 'Accessibility-focused', icon: Accessibility, color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-100' },
    { value: 'social-impact', label: 'Social Impact Apps', icon: Heart, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-100' },
  ]

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting out', icon: '🌱', color: 'border-green-200 bg-green-50' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience', icon: '🚀', color: 'border-blue-200 bg-blue-50' },
    { value: 'advanced', label: 'Advanced', description: 'Confident in basics', icon: '⭐', color: 'border-purple-200 bg-purple-50' },
  ]

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true)
    try {
      const generatedProjects = await generateProjects(data)
      setProjects(generatedProjects)
      toast.success('🎉 Projects generated successfully!')
    } catch (error) {
      toast.error('Failed to generate projects. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedInterest = watch('interest')
  const selectedSkillLevel = watch('skillLevel')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-6">
            <Target className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Personalized for you</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Your Perfect <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your interests and skill level, and we'll create personalized 
            project ideas to help you build an amazing portfolio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-colorful"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Interest Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary-600" />
                  <span>What interests you most?</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interests.map((interest) => {
                    const Icon = interest.icon
                    const isSelected = selectedInterest === interest.value
                    return (
                      <label
                        key={interest.value}
                        className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          value={interest.value}
                          {...register('interest', { required: true })}
                          className="sr-only"
                        />
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${interest.color} flex items-center justify-center mr-4 shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{interest.label}</div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary-600" />
                  <span>What's your skill level?</span>
                </label>
                <div className="space-y-4">
                  {skillLevels.map((level) => {
                    const isSelected = selectedSkillLevel === level.value
                    return (
                      <label
                        key={level.value}
                        className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          value={level.value}
                          {...register('skillLevel', { required: true })}
                          className="sr-only"
                        />
                        <div className="text-2xl mr-4">{level.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{level.label}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="block text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary-600" />
                  <span>Any specific goals or preferences?</span>
                </label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
                  placeholder="e.g., I want to show off my work on GitHub, focus on mobile-first design, or work with specific technologies..."
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Your Perfect Projects...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Generate My Projects</span>
                    <Sparkles className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {projects.length > 0 ? (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your <span className="gradient-text">Personalized Projects</span>
                  </h2>
                  <p className="text-gray-600">Tailored specifically for your goals and skill level</p>
                </div>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card-colorful text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Ready to Generate Projects?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Fill out the form to get personalized project recommendations 
                  tailored to your interests and skill level.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>Personalized</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                    <span>GitHub Ready</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span>Career Focused</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProjectGenerator