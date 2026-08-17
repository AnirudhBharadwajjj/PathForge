import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target, Award, Calendar, ChevronRight, CheckCircle } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface RoadmapStep {
  id: string;
  phase: 'Education' | 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Expert';
  title: string;
  duration: string;
  description: string;
  milestones: string[];
  isCompleted: boolean;
  isCurrent: boolean;
}

interface CareerRoadmapProps {
  careerTitle: string;
  roadmapSteps: RoadmapStep[];
}

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  careerTitle,
  roadmapSteps
}) => {
  const [selectedStep, setSelectedStep] = useState<RoadmapStep | null>(null);

  const getPhaseIcon = (phase: string) => {
    switch(phase) {
      case 'Education': return <GraduationCap className="w-6 h-6" />;
      case 'Entry Level': return <Briefcase className="w-6 h-6" />;
      case 'Mid Level': return <Target className="w-6 h-6" />;
      case 'Senior Level': return <Award className="w-6 h-6" />;
      case 'Expert': return <Award className="w-6 h-6" />;
      default: return null;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch(phase) {
      case 'Education': return 'bg-ios-purple text-white';
      case 'Entry Level': return 'bg-ios-blue text-white';
      case 'Mid Level': return 'bg-ios-teal text-white';
      case 'Senior Level': return 'bg-ios-green text-white';
      case 'Expert': return 'bg-ios-orange text-white';
      default: return 'bg-ios-gray-500 text-white';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-ios-gray-950 mb-2">
          Your Career Roadmap
        </h2>
        <p className="text-ios-gray-600">
          Step-by-step pathway to become a {careerTitle}
        </p>
      </motion.div>

      {/* Timeline View */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-ios-gray-200" />

        {/* Steps */}
        <div className="space-y-8">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Timeline Node */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center
                    ${step.isCompleted ? 'bg-ios-green' : step.isCurrent ? getPhaseColor(step.phase) : 'bg-ios-gray-200'}
                    shadow-lg cursor-pointer transition-all
                  `}
                  onClick={() => setSelectedStep(step)}
                >
                  {step.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <div className={step.isCurrent || step.isCompleted ? '' : 'opacity-50'}>
                      {getPhaseIcon(step.phase)}
                    </div>
                  )}
                </motion.div>
                {step.isCurrent && (
                  <motion.div
                    className="absolute -inset-1 rounded-2xl bg-ios-blue/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>

              {/* Content Card */}
              <Card
                glass={step.isCurrent}
                className={`
                  flex-1 p-6 cursor-pointer
                  ${step.isCompleted ? 'opacity-75' : ''}
                  ${step.isCurrent ? 'ring-2 ring-ios-blue' : ''}
                `}
                onClick={() => setSelectedStep(step)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-medium mb-2
                      ${step.isCompleted ? 'bg-ios-green/10 text-ios-green' : 
                        step.isCurrent ? 'bg-ios-blue/10 text-ios-blue' : 
                        'bg-ios-gray-100 text-ios-gray-600'}
                    `}>
                      {step.phase}
                    </span>
                    <h3 className="text-xl font-bold text-ios-gray-950">{step.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ios-gray-500">
                    <Calendar className="w-4 h-4" />
                    {step.duration}
                  </div>
                </div>
                
                <p className="text-ios-gray-700 mb-4">{step.description}</p>
                
                <div className="space-y-2">
                  {step.milestones.slice(0, 2).map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-ios-gray-400" />
                      <span className="text-ios-gray-600">{milestone}</span>
                    </div>
                  ))}
                  {step.milestones.length > 2 && (
                    <p className="text-sm text-ios-blue cursor-pointer hover:underline">
                      +{step.milestones.length - 2} more milestones
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Step Modal */}
      {selectedStep && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStep(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center
                ${getPhaseColor(selectedStep.phase)}
              `}>
                {getPhaseIcon(selectedStep.phase)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-ios-gray-950">
                  {selectedStep.title}
                </h3>
                <p className="text-ios-gray-600">{selectedStep.phase} • {selectedStep.duration}</p>
              </div>
            </div>

            <p className="text-ios-gray-700 mb-6">{selectedStep.description}</p>

            <div className="mb-6">
              <h4 className="font-semibold text-ios-gray-950 mb-4">Key Milestones</h4>
              <div className="space-y-3">
                {selectedStep.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-ios-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-ios-blue">{idx + 1}</span>
                    </div>
                    <p className="text-ios-gray-700">{milestone}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {selectedStep.isCurrent ? (
                <Button variant="primary" fullWidth>
                  Continue Learning
                </Button>
              ) : selectedStep.isCompleted ? (
                <Button variant="secondary" fullWidth disabled>
                  Completed
                </Button>
              ) : (
                <Button variant="primary" fullWidth>
                  Start This Phase
                </Button>
              )}
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setSelectedStep(null)}
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

// Example usage
export const RoadmapExample = () => {
  const sampleRoadmap: RoadmapStep[] = [
    {
      id: '1',
      phase: 'Education',
      title: 'Foundation & Education',
      duration: '3-4 years',
      description: 'Build strong foundation in computer science fundamentals and programming.',
      milestones: [
        'Complete Bachelor\'s degree in Computer Science or related field',
        'Learn core programming languages (Python, JavaScript, Java)',
        'Understand data structures and algorithms',
        'Build personal projects and portfolio'
      ],
      isCompleted: true,
      isCurrent: false
    },
    {
      id: '2',
      phase: 'Entry Level',
      title: 'Junior Developer',
      duration: '1-2 years',
      description: 'Start your professional journey and gain real-world experience.',
      milestones: [
        'Land your first developer job',
        'Work on team projects and learn collaboration',
        'Master version control (Git)',
        'Learn development best practices'
      ],
      isCompleted: false,
      isCurrent: true
    },
    {
      id: '3',
      phase: 'Mid Level',
      title: 'Mid-Level Developer',
      duration: '2-3 years',
      description: 'Expand expertise and take on more complex responsibilities.',
      milestones: [
        'Lead feature development',
        'Mentor junior developers',
        'Specialize in specific technologies',
        'Contribute to architecture decisions'
      ],
      isCompleted: false,
      isCurrent: false
    },
    {
      id: '4',
      phase: 'Senior Level',
      title: 'Senior Developer',
      duration: '3-5 years',
      description: 'Become a technical leader and drive major initiatives.',
      milestones: [
        'Design and architect complex systems',
        'Lead technical teams',
        'Define coding standards and best practices',
        'Drive innovation and technical strategy'
      ],
      isCompleted: false,
      isCurrent: false
    },
    {
      id: '5',
      phase: 'Expert',
      title: 'Principal/Staff Engineer',
      duration: 'Ongoing',
      description: 'Shape technology direction and mentor the next generation.',
      milestones: [
        'Influence company-wide technical decisions',
        'Speak at conferences and write technical content',
        'Lead cross-functional initiatives',
        'Become a recognized expert in your domain'
      ],
      isCompleted: false,
      isCurrent: false
    }
  ];

  return (
    <CareerRoadmap
      careerTitle="Software Developer"
      roadmapSteps={sampleRoadmap}
    />
  );
};

export default CareerRoadmap;