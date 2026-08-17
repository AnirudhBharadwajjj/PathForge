import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Brain, Heart, Target, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

interface AssessmentQuestion {
  id: string;
  category: 'interests' | 'skills' | 'personality' | 'values';
  question: string;
  options: { value: string; label: string }[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: '1',
    category: 'interests',
    question: 'Which activity sounds most appealing to you?',
    options: [
      { value: 'problem-solving', label: '🧩 Solving complex puzzles and problems' },
      { value: 'creative', label: '🎨 Creating something new and innovative' },
      { value: 'helping', label: '🤝 Helping others achieve their goals' },
      { value: 'analyzing', label: '📊 Analyzing data to find patterns' }
    ]
  },
  {
    id: '2',
    category: 'personality',
    question: 'How do you prefer to work?',
    options: [
      { value: 'team', label: '👥 In a collaborative team environment' },
      { value: 'independent', label: '🎯 Independently with clear goals' },
      { value: 'flexible', label: '🔄 Flexible mix of both' },
      { value: 'leadership', label: '👔 Leading and guiding others' }
    ]
  },
  {
    id: '3',
    category: 'skills',
    question: 'What type of skills do you enjoy developing?',
    options: [
      { value: 'technical', label: '💻 Technical and analytical skills' },
      { value: 'communication', label: '💬 Communication and interpersonal skills' },
      { value: 'creative-skills', label: '✨ Creative and design skills' },
      { value: 'strategic', label: '🎯 Strategic and planning skills' }
    ]
  },
  {
    id: '4',
    category: 'values',
    question: 'What matters most in your career?',
    options: [
      { value: 'impact', label: '🌍 Making a positive impact on society' },
      { value: 'growth', label: '📈 Continuous learning and growth' },
      { value: 'stability', label: '🏢 Job security and stability' },
      { value: 'innovation', label: '🚀 Innovation and cutting-edge work' }
    ]
  },
  {
    id: '5',
    category: 'interests',
    question: 'Which industry excites you the most?',
    options: [
      { value: 'tech', label: '💻 Technology and Software' },
      { value: 'healthcare', label: '🏥 Healthcare and Life Sciences' },
      { value: 'finance', label: '💰 Finance and Business' },
      { value: 'creative-industry', label: '🎬 Creative and Media' }
    ]
  }
];

interface AssessmentProps {
  onComplete: (results: Record<string, string>) => void;
}

const CareerAssessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = () => {
    if (selectedOption) {
      const newAnswers = {
        ...answers,
        [assessmentQuestions[currentQuestion].id]: selectedOption
      };
      setAnswers(newAnswers);
      
      if (currentQuestion < assessmentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'interests': return <Heart className="w-6 h-6" />;
      case 'skills': return <Target className="w-6 h-6" />;
      case 'personality': return <Brain className="w-6 h-6" />;
      case 'values': return <Sparkles className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ios-blue/10 via-ios-purple/10 to-ios-pink/10 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-ios-gray-600">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm font-medium text-ios-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-ios-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-ios-blue to-ios-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card glass className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-ios-blue/10 rounded-xl text-ios-blue">
                  {getCategoryIcon(question.category)}
                </div>
                <span className="text-sm font-medium text-ios-gray-600 uppercase tracking-wide">
                  {question.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-8 text-ios-gray-950">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      block p-4 rounded-2xl cursor-pointer transition-all
                      ${selectedOption === option.value
                        ? 'bg-ios-blue/10 border-2 border-ios-blue'
                        : 'bg-ios-gray-50 border-2 border-transparent hover:bg-ios-gray-100'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-lg">{option.label}</span>
                  </motion.label>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(currentQuestion - 1);
                      setSelectedOption(answers[assessmentQuestions[currentQuestion - 1].id] || null);
                    }
                  }}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleAnswer}
                  disabled={!selectedOption}
                  className="flex items-center gap-2"
                >
                  {currentQuestion === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CareerAssessment;