// AI-powered career assessment service
// This simulates an AI model that analyzes user responses and matches them with careers

interface UserProfile {
  interests: string[];
  personality: string[];
  skills: string[];
  values: string[];
  industry: string[];
}

interface CareerMatch {
  careerId: string;
  matchScore: number;
  reasons: string[];
}

// Career profiles with traits for matching
const careerProfiles = {
  'software-developer': {
    traits: ['problem-solving', 'technical', 'analytical', 'innovation', 'tech'],
    personality: ['independent', 'flexible'],
    values: ['growth', 'innovation'],
    weight: 1.2 // Higher weight for in-demand careers
  },
  'data-scientist': {
    traits: ['analyzing', 'technical', 'strategic', 'problem-solving', 'tech'],
    personality: ['independent', 'flexible'],
    values: ['innovation', 'growth'],
    weight: 1.3
  },
  'ux-designer': {
    traits: ['creative', 'creative-skills', 'communication', 'helping', 'tech', 'creative-industry'],
    personality: ['team', 'flexible'],
    values: ['impact', 'innovation'],
    weight: 1.1
  },
  'product-manager': {
    traits: ['strategic', 'leadership', 'communication', 'problem-solving', 'tech', 'finance'],
    personality: ['leadership', 'team'],
    values: ['growth', 'impact'],
    weight: 1.15
  },
  'digital-marketer': {
    traits: ['creative', 'communication', 'creative-skills', 'analyzing', 'creative-industry'],
    personality: ['team', 'flexible'],
    values: ['growth', 'impact'],
    weight: 1.0
  },
  'financial-analyst': {
    traits: ['analyzing', 'strategic', 'technical', 'problem-solving', 'finance'],
    personality: ['independent', 'flexible'],
    values: ['stability', 'growth'],
    weight: 1.1
  },
  'healthcare-professional': {
    traits: ['helping', 'technical', 'problem-solving', 'communication', 'healthcare'],
    personality: ['team', 'flexible'],
    values: ['impact', 'stability'],
    weight: 1.2
  },
  'ai-ml-engineer': {
    traits: ['technical', 'problem-solving', 'analyzing', 'innovation', 'tech'],
    personality: ['independent', 'flexible'],
    values: ['innovation', 'growth'],
    weight: 1.4 // Very high demand in India
  },
  'cybersecurity-analyst': {
    traits: ['technical', 'problem-solving', 'analyzing', 'strategic', 'tech'],
    personality: ['independent', 'flexible'],
    values: ['stability', 'growth'],
    weight: 1.3
  },
  'business-analyst': {
    traits: ['analyzing', 'strategic', 'communication', 'problem-solving', 'finance'],
    personality: ['team', 'flexible'],
    values: ['growth', 'stability'],
    weight: 1.1
  }
};

export class AICareerMatcher {
  // Analyze user assessment responses using AI logic
  analyzeResponses(responses: Record<string, string>): UserProfile {
    const profile: UserProfile = {
      interests: [],
      personality: [],
      skills: [],
      values: [],
      industry: []
    };

    // Process each response and build user profile
    Object.entries(responses).forEach(([questionId, answer]) => {
      switch(questionId) {
        case '1': // Interests
          profile.interests.push(answer);
          break;
        case '2': // Work style
          profile.personality.push(answer);
          break;
        case '3': // Skills
          profile.skills.push(answer);
          break;
        case '4': // Values
          profile.values.push(answer);
          break;
        case '5': // Industry
          profile.industry.push(answer);
          break;
      }
    });

    return profile;
  }

  // Calculate match score using AI scoring algorithm
  calculateMatchScore(userProfile: UserProfile, careerProfile: any): number {
    let score = 0;
    let maxScore = 0;

    // Interest matching (30% weight)
    const interestMatches = userProfile.interests.filter(
      interest => careerProfile.traits.includes(interest)
    ).length;
    score += interestMatches * 30;
    maxScore += userProfile.interests.length * 30;

    // Personality matching (25% weight)
    const personalityMatches = userProfile.personality.filter(
      trait => careerProfile.personality.includes(trait)
    ).length;
    score += personalityMatches * 25;
    maxScore += userProfile.personality.length * 25;

    // Skills matching (25% weight)
    const skillMatches = userProfile.skills.filter(
      skill => careerProfile.traits.includes(skill)
    ).length;
    score += skillMatches * 25;
    maxScore += userProfile.skills.length * 25;

    // Values matching (20% weight)
    const valueMatches = userProfile.values.filter(
      value => careerProfile.values.includes(value)
    ).length;
    score += valueMatches * 20;
    maxScore += userProfile.values.length * 20;

    // Industry preference bonus
    const industryMatch = userProfile.industry.some(
      industry => careerProfile.traits.includes(industry)
    );
    if (industryMatch) {
      score += 10;
    }

    // Apply career weight (market demand factor)
    score *= careerProfile.weight;

    // Normalize to percentage
    return Math.min(Math.round((score / maxScore) * 100), 98);
  }

  // Generate match reasons using AI reasoning
  generateMatchReasons(userProfile: UserProfile, careerProfile: any, careerId: string): string[] {
    const reasons: string[] = [];
    
    // Check interest alignment
    const interestMatches = userProfile.interests.filter(
      interest => careerProfile.traits.includes(interest)
    );
    if (interestMatches.length > 0) {
      reasons.push(`Strong alignment with your interest in ${interestMatches.join(' and ')}`);
    }

    // Check personality fit
    const personalityMatches = userProfile.personality.filter(
      trait => careerProfile.personality.includes(trait)
    );
    if (personalityMatches.length > 0) {
      const traitMap: Record<string, string> = {
        'team': 'collaborative work style',
        'independent': 'independent working preference',
        'flexible': 'flexible work approach',
        'leadership': 'leadership aspirations'
      };
      reasons.push(`Matches your ${personalityMatches.map(t => traitMap[t]).join(' and ')}`);
    }

    // Check values alignment
    const valueMatches = userProfile.values.filter(
      value => careerProfile.values.includes(value)
    );
    if (valueMatches.length > 0) {
      const valueMap: Record<string, string> = {
        'impact': 'desire to make an impact',
        'growth': 'focus on continuous growth',
        'stability': 'preference for stability',
        'innovation': 'passion for innovation'
      };
      reasons.push(`Aligns with your ${valueMatches.map(v => valueMap[v]).join(' and ')}`);
    }

    // Add market demand insight
    if (careerProfile.weight >= 1.3) {
      reasons.push('High demand in the current Indian job market');
    } else if (careerProfile.weight >= 1.1) {
      reasons.push('Growing opportunities in India');
    }

    return reasons;
  }

  // Main AI matching function
  getCareerMatches(responses: Record<string, string>): CareerMatch[] {
    const userProfile = this.analyzeResponses(responses);
    const matches: CareerMatch[] = [];

    // Calculate matches for all careers
    Object.entries(careerProfiles).forEach(([careerId, careerProfile]) => {
      const matchScore = this.calculateMatchScore(userProfile, careerProfile);
      const reasons = this.generateMatchReasons(userProfile, careerProfile, careerId);
      
      matches.push({
        careerId,
        matchScore,
        reasons
      });
    });

    // Sort by match score and return top matches
    return matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Return top 5 matches
  }

  // Get personalized insights
  getPersonalizedInsights(userProfile: UserProfile): string[] {
    const insights: string[] = [];

    // Analyze strengths
    if (userProfile.interests.includes('technical') || userProfile.skills.includes('technical')) {
      insights.push('Your technical aptitude positions you well for India\'s growing IT sector');
    }
    
    if (userProfile.personality.includes('leadership')) {
      insights.push('Your leadership qualities suggest potential for management roles');
    }

    if (userProfile.values.includes('impact')) {
      insights.push('Consider roles where you can directly contribute to social or business transformation');
    }

    // Market-specific insights
    if (userProfile.industry.includes('tech')) {
      insights.push('Tech sector in India is experiencing 15-20% annual growth with excellent opportunities');
    }

    return insights;
  }
}

export const aiMatcher = new AICareerMatcher();