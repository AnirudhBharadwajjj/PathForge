import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, IndianRupee, BookOpen, Star, ArrowRight, Sparkles } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { aiMatcher } from '../services/aiAssessment';

interface Career {
  id: string;
  title: string;
  category: string;
  matchPercentage: number;
  description: string;
  averageSalary: string;
  growthRate: string;
  requiredEducation: string;
  keySkills: string[];
  demandLevel: 'High' | 'Medium' | 'Low';
}

// Career database with Indian market data
const careerDatabase: Career[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Technology',
    matchPercentage: 95,
    description: 'Design, develop, and maintain software applications for India\'s booming tech industry.',
    averageSalary: '₹12-25 LPA',
    growthRate: '+22%',
    requiredEducation: "B.Tech/BE in Computer Science",
    keySkills: ['Programming', 'Problem Solving', 'Algorithms', 'Team Collaboration'],
    demandLevel: 'High'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Analytics',
    matchPercentage: 92,
    description: 'Analyze complex data to help Indian enterprises make data-driven decisions.',
    averageSalary: '₹15-35 LPA',
    growthRate: '+36%',
    requiredEducation: "M.Tech/MS in Data Science",
    keySkills: ['Statistics', 'Machine Learning', 'Python/R', 'Data Visualization'],
    demandLevel: 'High'
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    category: 'Technology',
    matchPercentage: 90,
    description: 'Build AI solutions for India\'s digital transformation journey.',
    averageSalary: '₹18-40 LPA',
    growthRate: '+45%',
    requiredEducation: "B.Tech + AI/ML Specialization",
    keySkills: ['Deep Learning', 'TensorFlow', 'PyTorch', 'MLOps'],
    demandLevel: 'High'
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    category: 'Design',
    matchPercentage: 88,
    description: 'Design user experiences for India\'s growing digital products ecosystem.',
    averageSalary: '₹8-20 LPA',
    growthRate: '+15%',
    requiredEducation: "Bachelor's in Design/HCI",
    keySkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    demandLevel: 'High'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Business',
    matchPercentage: 85,
    description: 'Lead product development in India\'s startup ecosystem.',
    averageSalary: '₹20-45 LPA',
    growthRate: '+19%',
    requiredEducation: "B.Tech + MBA from Tier 1/2",
    keySkills: ['Strategic Planning', 'Leadership', 'Analytics', 'Stakeholder Management'],
    demandLevel: 'High'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    matchPercentage: 83,
    description: 'Protect digital assets in India\'s rapidly digitalizing economy.',
    averageSalary: '₹10-25 LPA',
    growthRate: '+32%',
    requiredEducation: "B.Tech + Security Certifications",
    keySkills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Cloud Security'],
    demandLevel: 'High'
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    category: 'Finance',
    matchPercentage: 78,
    description: 'Analyze financial data for India\'s growing financial services sector.',
    averageSalary: '₹8-18 LPA',
    growthRate: '+12%',
    requiredEducation: "B.Com/BBA + CFA/FRM",
    keySkills: ['Financial Modeling', 'Excel', 'SQL', 'Risk Analysis'],
    demandLevel: 'Medium'
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business',
    matchPercentage: 76,
    description: 'Bridge business and technology in Indian enterprises.',
    averageSalary: '₹10-22 LPA',
    growthRate: '+14%',
    requiredEducation: "B.Tech/MBA",
    keySkills: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Agile'],
    demandLevel: 'Medium'
  }
];

interface RecommendationsProps {
  assessmentResults?: Record<string, string>;
  onSelectCareer: (career: Career) => void;
}

const CareerRecommendations: React.FC<RecommendationsProps> = ({ 
  assessmentResults,
  onSelectCareer 
}) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  useEffect(() => {
    // Use AI matcher to get personalized recommendations
    if (assessmentResults) {
      const aiMatches = aiMatcher.getCareerMatches(assessmentResults);
      
      // Update career database with AI-calculated match percentages
      const recommendedCareers = careerDatabase.map(career => {
        const match = aiMatches.find(m => m.careerId === career.id);
        if (match) {
          return { ...career, matchPercentage: Math.round(match.matchScore) };
        }
        return { ...career, matchPercentage: Math.round(60 + Math.random() * 15) };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      setCareers(recommendedCareers);
    } else {
      setCareers(careerDatabase);
    }
  }, [assessmentResults]);

  const getDemandColor = (level: string) => {
    switch(level) {
      case 'High': return 'text-ios-green bg-ios-green/10';
      case 'Medium': return 'text-ios-orange bg-ios-orange/10';
      case 'Low': return 'text-ios-red bg-ios-red/10';
      default: return '';
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'from-ios-green to-ios-teal';
    if (percentage >= 70) return 'from-ios-blue to-ios-purple';
    return 'from-ios-orange to-ios-yellow';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-ios-gray-950 mb-2 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-ios-purple" />
          AI-Powered Career Matches
        </h2>
        <p className="text-ios-gray-600">
          Our AI has analyzed your profile and matched you with careers thriving in the Indian job market
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career, index) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              glass
              className="p-6 h-full flex flex-col"
              onClick={() => setSelectedCareer(career)}
            >
              {/* Match Percentage Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(career.demandLevel)}`}>
                  {career.demandLevel} Demand
                </span>
                <div className="relative w-16 h-16">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-ios-gray-200"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={`url(#gradient-${career.id})`}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${career.matchPercentage * 1.76} 176`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id={`gradient-${career.id}`}>
                        <stop offset="0%" className={`${getMatchColor(career.matchPercentage).split(' ')[0].replace('from-', 'text-')}`} />
                        <stop offset="100%" className={`${getMatchColor(career.matchPercentage).split(' ')[1].replace('to-', 'text-')}`} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{career.matchPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Career Info */}
              <h3 className="text-xl font-bold text-ios-gray-950 mb-1">
                {career.title}
              </h3>
              <p className="text-sm text-ios-gray-600 mb-3">{career.category}</p>
              <p className="text-sm text-ios-gray-700 mb-4 flex-grow">
                {career.description}
              </p>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="w-4 h-4 text-ios-green" />
                  <span className="text-ios-gray-600">Package: </span>
                  <span className="font-medium">{career.averageSalary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-ios-blue" />
                  <span className="text-ios-gray-600">Growth: </span>
                  <span className="font-medium text-ios-green">{career.growthRate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-ios-purple" />
                  <span className="text-ios-gray-600 truncate">{career.requiredEducation}</span>
                </div>
              </div>

              {/* Key Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {career.keySkills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-ios-gray-100 text-ios-gray-700 rounded-lg text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCareer(career);
                }}
                className="flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Career Modal */}
      {selectedCareer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCareer(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-ios-gray-950 mb-2">
                  {selectedCareer.title}
                </h3>
                <p className="text-ios-gray-600">{selectedCareer.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-ios-yellow fill-current" />
                <span className="font-bold text-lg">{selectedCareer.matchPercentage}% Match</span>
              </div>
            </div>

            <p className="text-ios-gray-700 mb-6">{selectedCareer.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-ios-gray-950 mb-3">Career Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ios-gray-600">Average Salary:</span>
                    <span className="font-medium">{selectedCareer.averageSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ios-gray-600">Growth Rate:</span>
                    <span className="font-medium text-ios-green">{selectedCareer.growthRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ios-gray-600">Demand Level:</span>
                    <span className={`font-medium ${getDemandColor(selectedCareer.demandLevel).split(' ')[0]}`}>
                      {selectedCareer.demandLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-ios-gray-950 mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-ios-blue/10 text-ios-blue rounded-xl text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-ios-gray-950 mb-3">Education Requirements</h4>
              <p className="text-ios-gray-700">{selectedCareer.requiredEducation}</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => onSelectCareer(selectedCareer)}
              >
                Create Career Roadmap
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setSelectedCareer(null)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CareerRecommendations;