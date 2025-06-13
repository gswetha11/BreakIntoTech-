import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Sparkles, Code, Database, Palette, Brain, Globe, Heart, Accessibility } from 'lucide-react'
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
    { value: 'frontend', label: 'Frontend Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { value: 'ai-ml', label: 'AI/ML', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { value: 'data-analysis', label: 'Data Analysis', icon: Database, color: 'from-green-500 to-teal-500' },
    { value: 'ui-ux', label: 'UI/UX Design', icon: Palette, color: 'from-orange-500 to-red-500' },
    { value: 'fullstack', label: 'Full-stack Projects', icon: Globe, color: 'from-indigo-500 to-purple-500' },
    { value: 'accessibility', label: 'Accessibility-focused', icon: Accessibility, color: 'from-emerald-500 to-green-500' },
    { value: 'social-impact', label: 'Social Impact Apps', icon: Heart, color: 'from-pink-500 to-rose-500' },
  ]

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting out' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { value: 'advanced', label: 'Advanced', description: 'Confident in basics' },
  ]

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true)
    try {
      const generatedProjects = await generateProjects(data)
      setProjects(generatedProjects)
      toast.success('Projects generated successfully!')
    } catch (error) {
      toast.error('Failed to generate projects. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedInterest = watch('interest')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Your Perfect Projects
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
            className="card"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Interest Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  What interests you most?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interests.map((interest) => {
                    const Icon = interest.icon
                    return (
                      <label
                        key={interest.value}
                        className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedInterest === interest.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={interest.value}
                          {...register('interest', { required: true })}
                          className="sr-only"
                        />
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${interest.color} flex items-center justify-center mr-3`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{interest.label}</div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  What's your skill level?
                </label>
                <div className="space-y-3">
                  {skillLevels.map((level) => (
                    <label
                      key={level.value}
                      className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-gray-300"
                    >
                      <input
                        type="radio"
                        value={level.value}
                        {...register('skillLevel', { required: true })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="block text-lg font-semibold text-gray-900 mb-4">
                  Any specific goals or preferences?
                </label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., I want to show off my work on GitHub, focus on mobile-first design, or work with specific technologies..."
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Projects...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate My Projects</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {projects.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Personalized Projects
                </h2>
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Generate Projects?
                </h3>
                <p className="text-gray-600">
                  Fill out the form to get personalized project recommendations 
                  tailored to your interests and skill level.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProjectGenerator