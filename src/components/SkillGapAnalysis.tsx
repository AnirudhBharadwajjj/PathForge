import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  hasSkill: boolean;
  importance: 'Critical' | 'Important' | 'Nice to have';
}

interface LearningResource {
  title: string;
  provider: string;
  type: 'Course' | 'Certificate' | 'Bootcamp';
  duration: string;
  cost: string;
  url: string;
}

interface SkillGapProps {
  careerTitle: string;
  requiredSkills: Skill[];
  learningResources: LearningResource[];
}

const SkillGapAnalysis: React.FC<SkillGapProps> = ({
  careerTitle,
  requiredSkills,
  learningResources
}) => {
  const getSkillIcon = (hasSkill: boolean) => {
    if (hasSkill) {
      return <CheckCircle className="w-5 h-5 text-ios-green" />;
    }
    return <XCircle className="w-5 h-5 text-ios-red" />;
  };

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'Critical': return 'bg-ios-red/10 text-ios-red';
      case 'Important': return 'bg-ios-orange/10 text-ios-orange';
      case 'Nice to have': return 'bg-ios-blue/10 text-ios-blue';
      default: return '';
    }
  };

  const skillsYouHave = requiredSkills.filter(s => s.hasSkill).length;
  const totalSkills = requiredSkills.length;
  const skillPercentage = (skillsYouHave / totalSkills) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-ios-gray-950 mb-2">
          Skill Gap Analysis for {careerTitle}
        </h2>
        <p className="text-ios-gray-600">
          Identify the skills you need to develop for your chosen career path
        </p>
      </motion.div>

      {/* Overall Progress */}
      <Card glass className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Skill Readiness</h3>
          <span className="text-2xl font-bold text-ios-blue">
            {Math.round(skillPercentage)}%
          </span>
        </div>
        <div className="w-full bg-ios-gray-200 rounded-full h-3 overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-ios-blue to-ios-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${skillPercentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-sm text-ios-gray-600">
          You have {skillsYouHave} out of {totalSkills} required skills
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Skills List */}
        <Card glass className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-ios-orange" />
            Required Skills
          </h3>
          <div className="space-y-3">
            {requiredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-white/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  {getSkillIcon(skill.hasSkill)}
                  <div>
                    <p className="font-medium text-ios-gray-950">{skill.name}</p>
                    <p className="text-xs text-ios-gray-600">{skill.level}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getImportanceColor(skill.importance)}`}>
                  {skill.importance}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Skills to Develop */}
        <Card glass className="p-6">
          <h3 className="text-xl font-bold mb-4">Skills to Develop</h3>
          <div className="space-y-4">
            {requiredSkills
              .filter(s => !s.hasSkill)
              .sort((a, b) => {
                const order = { 'Critical': 0, 'Important': 1, 'Nice to have': 2 };
                return order[a.importance] - order[b.importance];
              })
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-ios-red/5 border border-ios-red/20 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-ios-gray-950">{skill.name}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getImportanceColor(skill.importance)}`}>
                      {skill.importance}
                    </span>
                  </div>
                  <p className="text-sm text-ios-gray-600 mb-2">
                    Required Level: {skill.level}
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Find Learning Resources
                  </Button>
                </motion.div>
              ))}
          </div>
        </Card>
      </div>

      {/* Learning Resources */}
      <Card glass className="p-6">
        <h3 className="text-xl font-bold mb-4">Recommended Learning Resources</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/70 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 bg-ios-blue/10 text-ios-blue rounded-lg text-xs font-medium">
                  {resource.type}
                </span>
                <ExternalLink className="w-4 h-4 text-ios-gray-500" />
              </div>
              <h4 className="font-semibold text-ios-gray-950 mb-1">{resource.title}</h4>
              <p className="text-sm text-ios-gray-600 mb-3">{resource.provider}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ios-gray-500">{resource.duration}</span>
                <span className="font-medium text-ios-green">{resource.cost}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="mt-3"
                onClick={() => window.open(resource.url, '_blank')}
              >
                View Course
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Example usage with sample data
export const SkillGapExample = () => {
  const sampleSkills: Skill[] = [
    { name: 'JavaScript', level: 'Advanced', hasSkill: true, importance: 'Critical' },
    { name: 'React', level: 'Advanced', hasSkill: true, importance: 'Critical' },
    { name: 'TypeScript', level: 'Intermediate', hasSkill: false, importance: 'Important' },
    { name: 'Node.js', level: 'Intermediate', hasSkill: true, importance: 'Important' },
    { name: 'AWS/Cloud', level: 'Intermediate', hasSkill: false, importance: 'Important' },
    { name: 'Docker', level: 'Beginner', hasSkill: false, importance: 'Nice to have' },
  ];

  const sampleResources: LearningResource[] = [
    {
      title: 'TypeScript Fundamentals',
      provider: 'Udemy',
      type: 'Course',
      duration: '8 hours',
      cost: '$49.99',
      url: '#'
    },
    {
      title: 'AWS Certified Developer',
      provider: 'AWS',
      type: 'Certificate',
      duration: '3 months',
      cost: '$300',
      url: '#'
    },
    {
      title: 'Docker Mastery',
      provider: 'Coursera',
      type: 'Course',
      duration: '20 hours',
      cost: '$79/month',
      url: '#'
    }
  ];

  return (
    <SkillGapAnalysis
      careerTitle="Software Developer"
      requiredSkills={sampleSkills}
      learningResources={sampleResources}
    />
  );
};

export default SkillGapAnalysis;