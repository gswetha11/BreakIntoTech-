import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import ProjectGenerator from './pages/ProjectGenerator'
import Dashboard from './pages/Dashboard'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-16"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<ProjectGenerator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App