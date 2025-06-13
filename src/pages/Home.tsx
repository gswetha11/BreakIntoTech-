import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Trophy, Code, Rocket, Heart, Sparkles, BookOpen, Target, Zap, BarChart3, Wallet } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Personalized Projects',
      description: 'Get project ideas tailored to your interests and skill level',
      gradient: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      icon: Wallet,
      title: 'Aptos Integration',
      description: 'Build Web3 projects and showcase your blockchain skills',
      gradient: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Trophy,
      title: 'Career Readiness',
      description: 'Monitor your growth and Web3 readiness for the job market',
      gradient: 'from-success-500 to-success-600',
      bgColor: 'bg-success-100'
    }
  ]

  const stats = [
    { icon: Users, label: '10,000+ developers helped', value: '10K+' },
    { icon: Star, label: '4.9/5 rating', value: '4.9★' },
    { icon: BookOpen, label: 'Web3 projects completed', value: '25K+' },
    { icon: Target, label: 'Success rate', value: '94%' }
  ]

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Web3 Developer',
      content: 'TechPath helped me transition into Web3 and land my first blockchain job!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      company: 'Aptos Labs'
    },
    {
      name: 'James Chen',
      role: 'Smart Contract Developer',
      content: 'The Aptos integration made learning Move programming so much easier.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      company: 'Pontem Network'
    },
    {
      name: 'Aisha Patel',
      role: 'Blockchain Engineer',
      content: 'I love how it tracks my Web3 progress and shows my blockchain readiness!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      company: 'Martian Wallet'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Floating Elements */}
      <div className="floating-element top-20 left-10 w-20 h-20 bg-primary-200 rounded-full" style={{ animationDelay: '0s' }}></div>
      <div className="floating-element top-40 right-20 w-16 h-16 bg-green-200 rounded-full" style={{ animationDelay: '1s' }}></div>
      <div className="floating-element bottom-40 left-20 w-12 h-12 bg-accent-200 rounded-full" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-green-50/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-green-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Powered by Aptos Blockchain</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Web3 Journey to
                <span className="block gradient-text">
                  Tech Success
                </span>
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Build your Web3 portfolio with personalized projects, connect your Aptos wallet, 
                and measure your blockchain career readiness. Join thousands of developers building the decentralized future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to="/generate"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <Zap className="h-5 w-5" />
                <span>Start Building</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-2xl mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for <span className="gradient-text">Web3 Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive support for your blockchain career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-colorful text-center group hover:shadow-large"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="gradient-text">Success Stories</span> from Our Web3 Community
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real results, real blockchain impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-colorful relative"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl mr-4 shadow-md"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-green-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-green-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-8">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build the Decentralized Future?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              🚀 "Every smart contract you write is a step toward the Web3 future—let's build it together!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/generate"
                className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                <span>Start Your Web3 Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <BarChart3 className="h-5 w-5" />
                <span>View Dashboard</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home