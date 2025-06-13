import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AptosWalletProvider } from './components/AptosWalletProvider'
import Header from './components/Header'
import Home from './pages/Home'
import ProjectGenerator from './pages/ProjectGenerator'
import Dashboard from './pages/Dashboard'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  return (
    <AptosWalletProvider>
      <div className="min-h-screen bg-gray-50 bg-pattern">
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
    </AptosWalletProvider>
  )
}

export default App