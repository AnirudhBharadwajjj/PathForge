import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, IndianRupee, MapPin, Briefcase } from 'lucide-react';
import Card from './ui/Card';

interface MarketData {
  salaryTrends: { year: string; salary: number }[];
  demandByLocation: { location: string; jobs: number }[];
  skillsDemand: { skill: string; demand: number }[];
  industryGrowth: { industry: string; growth: number }[];
}

interface JobMarketInsightsProps {
  careerTitle: string;
  marketData: MarketData;
}

const JobMarketInsights: React.FC<JobMarketInsightsProps> = ({
  careerTitle,
  marketData
}) => {
  const COLORS = ['#007AFF', '#5856D6', '#5AC8FA', '#34C759', '#FF9500'];

  const averageSalary = marketData.salaryTrends[marketData.salaryTrends.length - 1].salary;
  const salaryGrowth = ((marketData.salaryTrends[marketData.salaryTrends.length - 1].salary - 
    marketData.salaryTrends[0].salary) / marketData.salaryTrends[0].salary * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-ios-gray-950 mb-2">
          Job Market Insights
        </h2>
        <p className="text-ios-gray-600">
          Real-time market data and trends for {careerTitle}
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-2">
              <IndianRupee className="w-8 h-8 text-ios-green" />
              <span className="text-xs font-medium text-ios-green bg-ios-green/10 px-2 py-1 rounded-full">
                +{salaryGrowth}%
              </span>
            </div>
            <p className="text-2xl font-bold text-ios-gray-950">
              ₹{(averageSalary / 100000).toFixed(1)}L
            </p>
            <p className="text-sm text-ios-gray-600">Average Package</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-ios-blue" />
              <span className="text-xs font-medium text-ios-blue bg-ios-blue/10 px-2 py-1 rounded-full">
                High
              </span>
            </div>
            <p className="text-2xl font-bold text-ios-gray-950">22%</p>
            <p className="text-sm text-ios-gray-600">Growth Rate</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-ios-purple" />
              <span className="text-xs font-medium text-ios-purple bg-ios-purple/10 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-2xl font-bold text-ios-gray-950">25.8K</p>
            <p className="text-sm text-ios-gray-600">Open Positions</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-8 h-8 text-ios-orange" />
              <span className="text-xs font-medium text-ios-orange bg-ios-orange/10 px-2 py-1 rounded-full">
                Top
              </span>
            </div>
            <p className="text-2xl font-bold text-ios-gray-950">Bangalore</p>
            <p className="text-sm text-ios-gray-600">Tech Capital</p>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Salary Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-bold mb-4">Salary Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={marketData.salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                <XAxis dataKey="year" stroke="#8E8E93" />
                <YAxis stroke="#8E8E93" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="salary" 
                  stroke="#007AFF" 
                  strokeWidth={3}
                  dot={{ fill: '#007AFF', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Jobs by Location */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-bold mb-4">Jobs by Location</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={marketData.demandByLocation}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                <XAxis dataKey="location" stroke="#8E8E93" />
                <YAxis stroke="#8E8E93" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="jobs" fill="#5856D6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Skills in Demand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-bold mb-4">Top Skills in Demand</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={marketData.skillsDemand}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.skill} ${(entry.percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="demand"
                >
                  {marketData.skillsDemand.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Industry Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-bold mb-4">Industry Growth Rates</h3>
            <div className="space-y-4">
              {marketData.industryGrowth.map((industry, index) => (
                <div key={industry.industry}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-ios-gray-700">
                      {industry.industry}
                    </span>
                    <span className="text-sm font-bold text-ios-green">
                      +{industry.growth}%
                    </span>
                  </div>
                  <div className="w-full bg-ios-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${industry.growth * 2}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// Example usage
export const JobMarketExample = () => {
  const sampleMarketData: MarketData = {
    salaryTrends: [
      { year: '2019', salary: 650000 },
      { year: '2020', salary: 700000 },
      { year: '2021', salary: 850000 },
      { year: '2022', salary: 1000000 },
      { year: '2023', salary: 1200000 },
      { year: '2024', salary: 1500000 }
    ],
    demandByLocation: [
      { location: 'Bangalore', jobs: 8500 },
      { location: 'Hyderabad', jobs: 6200 },
      { location: 'Pune', jobs: 4800 },
      { location: 'NCR Delhi', jobs: 5500 },
      { location: 'Mumbai', jobs: 3900 }
    ],
    skillsDemand: [
      { skill: 'React', demand: 0.35 },
      { skill: 'Python', demand: 0.25 },
      { skill: 'AWS', demand: 0.20 },
      { skill: 'TypeScript', demand: 0.12 },
      { skill: 'Docker', demand: 0.08 }
    ],
    industryGrowth: [
      { industry: 'AI/ML', growth: 45 },
      { industry: 'Cloud Computing', growth: 38 },
      { industry: 'Cybersecurity', growth: 32 },
      { industry: 'FinTech', growth: 28 },
      { industry: 'HealthTech', growth: 25 }
    ]
  };

  return (
    <JobMarketInsights
      careerTitle="Software Developer"
      marketData={sampleMarketData}
    />
  );
};

export default JobMarketInsights;