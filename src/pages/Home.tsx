import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Trophy, Code, Rocket, Heart, Target, Zap, Award } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Personalized Projects',
      description: 'Get project ideas tailored to your interests and skill level, designed to showcase your unique perspective'
    },
    {
      icon: Rocket,
      title: 'GitHub Integration',
      description: 'Automatically create repositories and track your progress as you build your professional portfolio'
    },
    {
      icon: Trophy,
      title: 'Career Readiness',
      description: 'Monitor your growth and see how ready you are for the job market with our comprehensive tracking system'
    }
  ]

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Frontend Developer',
      content: 'TechPath helped me build a portfolio that landed me my first tech job! The personalized approach made all the difference.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Aisha Patel',
      role: 'Full Stack Developer',
      content: 'As a woman in tech, I love how TechPath celebrates diverse voices and shows my career readiness score!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Keisha Johnson',
      role: 'Data Scientist',
      content: 'The project suggestions were perfect for my skill level and helped me break into the tech industry.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]

  const stats = [
    { number: '25%', label: 'Women in tech workforce', subtext: 'We\'re changing this' },
    { number: '3%', label: 'Black women in tech', subtext: 'Every voice matters' },
    { number: '10,000+', label: 'Developers empowered', subtext: 'Growing stronger together' },
    { number: '4.9/5', label: 'Community rating', subtext: 'Built with love' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-6">
                <Heart className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-800">Empowering Communities for Change</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Journey to
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Tech Success
                </span>
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                Empowering underrepresented individuals—especially women—with personalized project ideas, 
                GitHub integration, and career readiness tracking.
              </p>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
                Breaking barriers. Building futures. Celebrating diverse voices in tech.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/generate"
                className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 group"
              >
                <span>Start Building</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-3">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-primary-600" />
                <span className="text-primary-600 font-semibold text-lg">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Increasing Diversity in Tech
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are committed to empowering minorities to overcome systemic barriers in the tech industry. 
                With women representing just 25% of the workforce—and Black women only 3%—our mission is to 
                change this reality through accessible education, mentorship, and career development.
              </p>
              <div className="flex items-center space-x-2 text-primary-700">
                <Award className="h-5 w-5" />
                <span className="font-medium">Powered by 3 Percent Club</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-secondary-600" />
                <span className="text-secondary-600 font-semibold text-lg">Our Vision</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Where All Voices Are Heard
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We envision a tech landscape where diverse talent is not only included but celebrated. 
                By providing the tools, opportunities, and support to succeed, we aim to create a future 
                where all voices in tech are heard, valued, and elevated—driving lasting change across STEM fields.
              </p>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
                <p className="text-primary-800 font-medium italic">
                  "Representation matters. When we see ourselves in tech, we believe we belong."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Reality We're Changing</h2>
            <p className="text-xl text-gray-600">Every number represents a story, a dream, and a future we're building together</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.subtext}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive support for your tech career journey, 
              designed with underrepresented communities in mind
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
                  className="card text-center group hover:shadow-lg"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Real women, real breakthroughs, real change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-4">
              Join thousands of women and underrepresented individuals who are building their tech careers with confidence.
            </p>
            <p className="text-lg text-white/80 mb-8 italic">
              💡 "Every line of code you write is a step toward your future—let's go!"
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home