import { ResumeData } from '../types/resume';
import { ATSAnalysisResult } from '../types/ai';

const ACTION_VERBS = [
  'architected',
  'built',
  'created',
  'designed',
  'developed',
  'engineered',
  'implemented',
  'launched',
  'managed',
  'optimized',
  'spearheaded',
  'led',
  'increased',
  'reduced',
  'improved',
  'generated',
  'automated',
  'established',
  'transformed',
  'accelerated',
  'delivered',
  'orchestrated',
];

export function calculateATSScore(resume: ResumeData, jobDescription?: string): ATSAnalysisResult {
  let score = 0;
  const suggestions: ATSAnalysisResult['suggestions'] = [];

  // 1. Personal Info Check (15 points max)
  let personalScore = 0;
  if (resume.personalInfo.fullName?.trim()) personalScore += 3;
  if (resume.personalInfo.email?.trim()) personalScore += 3;
  if (resume.personalInfo.phone?.trim()) personalScore += 3;
  if (resume.personalInfo.location?.trim()) personalScore += 3;
  if (resume.personalInfo.linkedin?.trim()) personalScore += 3;

  if (!resume.personalInfo.linkedin) {
    suggestions.push({
      type: 'improvement',
      section: 'Personal Info',
      message: 'Add a LinkedIn profile link to improve recruiter trust and ATS score.',
    });
  }

  // 2. Summary Check (15 points max)
  let summaryScore = 0;
  const summaryLength = resume.summary?.trim().split(/\s+/).length || 0;
  if (summaryLength >= 25 && summaryLength <= 100) {
    summaryScore = 15;
  } else if (summaryLength > 0) {
    summaryScore = 8;
    suggestions.push({
      type: 'improvement',
      section: 'Professional Summary',
      message: 'Keep your summary between 30 and 80 words for optimal ATS impact.',
    });
  } else {
    suggestions.push({
      type: 'critical',
      section: 'Professional Summary',
      message: 'Add a professional summary highlighting your key achievements and core career focus.',
    });
  }

  // 3. Experience & Quantifiable Metrics (30 points max)
  let expScore = 0;
  let hasNumbers = false;
  let actionVerbCount = 0;
  const totalBullets: string[] = [];

  resume.experience.forEach((exp) => {
    exp.highlights.forEach((bullet) => {
      totalBullets.push(bullet);
      if (/\d+|%|\$/.test(bullet)) {
        hasNumbers = true;
      }
      const firstWord = bullet.trim().split(' ')[0]?.toLowerCase();
      if (ACTION_VERBS.includes(firstWord)) {
        actionVerbCount++;
      }
    });
  });

  if (resume.experience.length >= 2) expScore += 10;
  else if (resume.experience.length === 1) expScore += 5;

  if (hasNumbers) {
    expScore += 10;
  } else {
    suggestions.push({
      type: 'critical',
      section: 'Work Experience',
      message: 'Include quantifiable metrics (e.g., %, $, team size, time saved) in your work achievements.',
    });
  }

  if (actionVerbCount >= 3) {
    expScore += 10;
  } else {
    suggestions.push({
      type: 'improvement',
      section: 'Work Experience',
      message: 'Start bullet points with strong action verbs (e.g., Architected, Engineered, Spearheaded).',
    });
  }

  // 4. Skills Density (20 points max)
  let skillsScore = 0;
  const totalSkillsCount = resume.skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  if (totalSkillsCount >= 8) {
    skillsScore = 20;
  } else if (totalSkillsCount >= 4) {
    skillsScore = 12;
    suggestions.push({
      type: 'improvement',
      section: 'Skills',
      message: 'Add at least 8 relevant technical and soft skills to maximize ATS keyword matching.',
    });
  } else {
    suggestions.push({
      type: 'critical',
      section: 'Skills',
      message: 'Your skills section is sparse. Include categorized skills tailored to your target job.',
    });
  }

  // 5. Education & Projects (20 points max)
  let eduProjScore = 0;
  if (resume.education.length > 0) eduProjScore += 10;
  else {
    suggestions.push({
      type: 'improvement',
      section: 'Education',
      message: 'Add your degree, school name, and graduation year.',
    });
  }

  if (resume.projects.length > 0) eduProjScore += 10;
  else {
    suggestions.push({
      type: 'positive',
      section: 'Projects',
      message: 'Adding portfolio projects gives recruiters tangible proof of your abilities.',
    });
  }

  // Total Base Calculation
  score = personalScore + summaryScore + expScore + skillsScore + eduProjScore;

  // Job Description Keyword Matching
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  if (jobDescription && jobDescription.trim().length > 10) {
    const jdWords = Array.from(
      new Set(
        jobDescription
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 3)
      )
    );

    const fullResumeText = JSON.stringify(resume).toLowerCase();

    jdWords.forEach((word) => {
      if (fullResumeText.includes(word)) {
        matchedKeywords.push(word);
      } else {
        if (missingKeywords.length < 15) {
          missingKeywords.push(word);
        }
      }
    });

    if (matchedKeywords.length > 0) {
      const matchRatio = matchedKeywords.length / (matchedKeywords.length + missingKeywords.length);
      score = Math.min(100, Math.round(score * 0.7 + matchRatio * 30));
    }
  } else {
    // Add default positive suggestions if high score
    if (score >= 85) {
      suggestions.unshift({
        type: 'positive',
        section: 'Overall Impact',
        message: 'Great job! Your resume features strong action verbs, contact details, and formatted sections.',
      });
    }
  }

  score = Math.max(10, Math.min(100, score));

  let rating: ATSAnalysisResult['rating'] = 'Needs Work';
  if (score >= 90) rating = 'Excellent';
  else if (score >= 80) rating = 'Strong';
  else if (score >= 70) rating = 'Good';
  else if (score >= 50) rating = 'Fair';

  return {
    score,
    rating,
    summaryFeedback: `Your resume currently scores ${score}/100. ${
      score >= 80 ? 'It is well optimized for ATS scanners!' : 'Follow the suggestions below to increase your score.'
    }`,
    matchedKeywords,
    missingKeywords,
    categoryScores: {
      completeness: Math.round((personalScore / 15) * 100),
      quantifiableMetrics: hasNumbers ? 100 : 30,
      actionVerbs: Math.min(100, Math.round((actionVerbCount / 4) * 100)),
      formattingDensity: Math.round((eduProjScore / 20) * 100),
      skillRelevance: Math.round((skillsScore / 20) * 100),
    },
    suggestions,
  };
}
