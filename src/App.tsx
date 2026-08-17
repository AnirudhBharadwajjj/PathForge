import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Brain, Target, TrendingUp, Map, Menu, X } from 'lucide-react';
import CareerAssessment from './components/CareerAssessment';
import CareerRecommendations from './components/CareerRecommendations';
import { SkillGapExample } from './components/SkillGapAnalysis';
import { RoadmapExample } from './components/CareerRoadmap';
import { JobMarketExample } from './components/JobMarketInsights';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Logo from './components/ui/Logo';

type View = 'home' | 'assessment' | 'recommendations' | 'skills' | 'roadmap' | 'insights';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [assessmentResults, setAssessmentResults] = useState<Record<string, string> | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAssessmentComplete = (results: Record<string, string>) => {
    setAssessmentResults(results);
    setCurrentView('recommendations');
  };

  const handleCareerSelect = (career: any) => {
    setCurrentView('skills');
  };

  const navigation = [
    { id: 'home', label: 'Home', icon: <Compass className="w-5 h-5" /> },
    { id: 'assessment', label: 'Assessment', icon: <Brain className="w-5 h-5" /> },
    { id: 'recommendations', label: 'Careers', icon: <Target className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <Target className="w-5 h-5" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-5 h-5" /> },
    { id: 'insights', label: 'Insights', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-ios-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-ios-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView(item.id as View)}
                  className="flex items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-ios-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-ios-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'primary' : 'ghost'}
                    fullWidth
                    onClick={() => {
                      setCurrentView(item.id as View);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 justify-start"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[calc(100vh-4rem)]"
          >
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/10 via-ios-purple/10 to-ios-pink/10" />
              <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <h2 className="text-5xl sm:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-ios-blue via-ios-purple to-ios-pink bg-clip-text text-transparent">
                      Discover Your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-ios-purple to-ios-orange bg-clip-text text-transparent">
                      Ideal Career Path
                    </span>
                  </h2>
                  <p className="text-xl text-ios-gray-600 max-w-2xl mx-auto mb-8">
                    AI-powered career guidance tailored to your unique strengths, interests, and goals.
                    Start your journey to a fulfilling career today.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setCurrentView('assessment')}
                      className="animate-bounce-subtle"
                    >
                      Start Assessment
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => setCurrentView('insights')}
                    >
                      Explore Careers
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Brain className="w-8 h-8" />,
                    title: 'Smart Assessment',
                    description: 'AI analyzes your personality and strengths',
                    color: 'bg-ios-blue',
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: 'Career Matches',
                    description: 'Get personalized career recommendations',
                    color: 'bg-ios-purple',
                  },
                  {
                    icon: <Map className="w-8 h-8" />,
                    title: 'Clear Roadmap',
                    description: 'Step-by-step path to your dream career',
                    color: 'bg-ios-pink',
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: 'Skill Analysis',
                    description: 'Identify gaps and learning resources',
                    color: 'bg-ios-green',
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: 'Market Insights',
                    description: 'Real-time job market data and trends',
                    color: 'bg-ios-orange',
                  },
                  {
                    icon: <Compass className="w-8 h-8" />,
                    title: 'Guided Journey',
                    description: 'Continuous support throughout your career',
                    color: 'bg-ios-teal',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card hover glass className="p-6 h-full">
                      <div className={`${feature.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-ios-gray-600">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'assessment' && (
          <motion.div
            key="assessment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CareerAssessment onComplete={handleAssessmentComplete} />
          </motion.div>
        )}

        {currentView === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <CareerRecommendations
              assessmentResults={assessmentResults || {}}
              onSelectCareer={handleCareerSelect}
            />
          </motion.div>
        )}

        {currentView === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <SkillGapExample />
          </motion.div>
        )}

        {currentView === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <RoadmapExample />
          </motion.div>
        )}

        {currentView === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <JobMarketExample />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
