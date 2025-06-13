interface ProjectRequest {
  interest: string
  skillLevel: string
  notes: string
}

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  learningGoals: string[]
  stretchGoal: string
  emoji: string
}

// Mock project data - in a real app, this would use AI/ML APIs
const projectTemplates = {
  'frontend': [
    {
      id: 'weather-dashboard',
      title: 'Weather Dashboard',
      description: 'Build a beautiful weather dashboard that displays current conditions and forecasts for multiple cities.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API'],
      learningGoals: [
        'API integration and data fetching',
        'State management in React',
        'Responsive design principles',
        'Error handling and loading states'
      ],
      stretchGoal: 'Add geolocation support and dark mode toggle',
      emoji: '🌤️'
    },
    {
      id: 'task-manager',
      title: 'Interactive Task Manager',
      description: 'Create a modern task management app with drag-and-drop functionality and local storage.',
      techStack: ['React', 'JavaScript', 'CSS Grid', 'Local Storage API'],
      learningGoals: [
        'Component composition and reusability',
        'Drag and drop interactions',
        'Local storage for data persistence',
        'CSS animations and transitions'
      ],
      stretchGoal: 'Add team collaboration features and real-time sync',
      emoji: '✅'
    },
    {
      id: 'portfolio-website',
      title: 'Personal Portfolio Website',
      description: 'Design and build a stunning portfolio website to showcase your projects and skills.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      learningGoals: [
        'Modern CSS techniques and animations',
        'Responsive web design',
        'Performance optimization',
        'SEO best practices'
      ],
      stretchGoal: 'Add a blog section and contact form with email integration',
      emoji: '🎨'
    }
  ],
  'data-analysis': [
    {
      id: 'covid-tracker',
      title: 'COVID-19 Global Tracker',
      description: 'Build a dashboard that visualizes real-time COVID-19 data using public APIs.',
      techStack: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
      learningGoals: [
        'API fetching and data cleaning',
        'Data visualization with Plotly',
        'Statistical analysis basics',
        'Building interactive dashboards'
      ],
      stretchGoal: 'Add regional filtering and predictive modeling',
      emoji: '📊'
    },
    {
      id: 'resume-analyzer',
      title: 'Resume Insights Analyzer',
      description: 'Create a tool that parses resumes and extracts insights like skill count and job fit.',
      techStack: ['Python', 'NLTK', 'Flask', 'Pandas'],
      learningGoals: [
        'Text processing and NLP basics',
        'Regular expressions for data extraction',
        'Web application development',
        'Data analysis and reporting'
      ],
      stretchGoal: 'Deploy as a web app and add job matching features',
      emoji: '📁'
    }
  ],
  'ai-ml': [
    {
      id: 'sentiment-analyzer',
      title: 'Social Media Sentiment Analyzer',
      description: 'Build an AI tool that analyzes sentiment in social media posts and tweets.',
      techStack: ['Python', 'scikit-learn', 'NLTK', 'Streamlit'],
      learningGoals: [
        'Natural language processing fundamentals',
        'Machine learning model training',
        'Data preprocessing techniques',
        'Model evaluation and validation'
      ],
      stretchGoal: 'Add real-time Twitter integration and emotion detection',
      emoji: '🤖'
    },
    {
      id: 'image-classifier',
      title: 'Image Classification App',
      description: 'Create an image classifier that can identify objects, animals, or custom categories.',
      techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
      learningGoals: [
        'Deep learning and neural networks',
        'Image preprocessing and augmentation',
        'Transfer learning techniques',
        'Model deployment strategies'
      ],
      stretchGoal: 'Add mobile app version and custom model training',
      emoji: '📸'
    }
  ],
  'fullstack': [
    {
      id: 'social-platform',
      title: 'Mini Social Media Platform',
      description: 'Build a full-stack social platform with user authentication, posts, and real-time features.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      learningGoals: [
        'Full-stack application architecture',
        'User authentication and authorization',
        'Database design and operations',
        'Real-time communication with WebSockets'
      ],
      stretchGoal: 'Add mobile app and advanced features like stories',
      emoji: '💬'
    },
    {
      id: 'ecommerce-store',
      title: 'E-commerce Store',
      description: 'Create a complete e-commerce solution with payment processing and admin dashboard.',
      techStack: ['Next.js', 'Express.js', 'PostgreSQL', 'Stripe'],
      learningGoals: [
        'E-commerce application patterns',
        'Payment gateway integration',
        'Admin dashboard development',
        'Security best practices'
      ],
      stretchGoal: 'Add inventory management and analytics dashboard',
      emoji: '🛒'
    }
  ]
}

export const generateProjects = async (request: ProjectRequest): Promise<Project[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const templates = projectTemplates[request.interest as keyof typeof projectTemplates] || projectTemplates.frontend
  
  // In a real app, this would use AI to customize projects based on skill level and notes
  let selectedProjects = templates.slice(0, 3)
  
  // Customize based on skill level
  if (request.skillLevel === 'beginner') {
    selectedProjects = selectedProjects.map(project => ({
      ...project,
      techStack: project.techStack.slice(0, 3), // Simplify tech stack
      learningGoals: project.learningGoals.slice(0, 3) // Focus on core goals
    }))
  }
  
  return selectedProjects
}

export const createGitHubRepo = async (projectId: string): Promise<string> => {
  // Simulate GitHub API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // In a real app, this would use the GitHub API to create a repository
  return `https://github.com/username/${projectId}`
}