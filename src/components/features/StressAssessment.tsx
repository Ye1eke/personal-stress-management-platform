import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  AlertTriangle,
  Heart,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  Clock,
} from 'lucide-react';
import type {
  AssessmentResults,
  StressCategory,
  KazakhstanSpecificStressor,
  Language,
  ActionPlan,
} from '../../types';
import { STRESS_CATEGORIES, KAZAKHSTAN_REGIONS } from '../../utils/constants';

// Kazakhstan-specific stress factors based on our type definitions
const kazakhstanStressFactors: StressCategory[] = [
  'work-pressure',
  'financial-concerns',
  'family-relationships',
  'health-issues',
  'social-isolation',
  'academic-pressure',
  'urban-living',
  'rural-challenges',
  'cultural-adaptation',
  'language-barriers',
  'economic-uncertainty',
  'political-concerns',
];

const kazakhstanSpecificStressors: KazakhstanSpecificStressor[] = [
  'economic-transition',
  'urbanization-pressure',
  'traditional-modern-balance',
  'language-policy-changes',
  'employment-uncertainty',
  'housing-costs',
  'healthcare-access',
  'education-system',
  'cultural-identity',
  'generational-differences',
];

// Additional demographic questions for adaptive assessment
interface DemographicInfo {
  ageRange: string;
  location: string;
  livingSituation: string;
  workStatus: string;
}

interface StressAssessmentProps {
  onComplete?: (assessment: AssessmentResults) => void;
  language?: Language;
}

export const StressAssessment = ({
  onComplete,
  language = 'en',
}: StressAssessmentProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedFactors, setSelectedFactors] = useState<StressCategory[]>([]);
  const [selectedKzStressors, setSelectedKzStressors] = useState<
    KazakhstanSpecificStressor[]
  >([]);
  const [demographics, setDemographics] = useState<DemographicInfo>({
    ageRange: '',
    location: '',
    livingSituation: '',
    workStatus: '',
  });
  const [assessmentResults, setAssessmentResults] =
    useState<AssessmentResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 5; // Increased to include demographics and results

  const handleFactorToggle = (factor: StressCategory) => {
    setSelectedFactors((prev) =>
      prev.includes(factor)
        ? prev.filter((f) => f !== factor)
        : [...prev, factor]
    );
  };

  const handleKzStressorToggle = (stressor: KazakhstanSpecificStressor) => {
    setSelectedKzStressors((prev) =>
      prev.includes(stressor)
        ? prev.filter((s) => s !== stressor)
        : [...prev, stressor]
    );
  };

  const handleDemographicChange = (
    field: keyof DemographicInfo,
    value: string
  ) => {
    setDemographics((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Adaptive questioning logic - show different questions based on previous answers
  const getAdaptiveQuestions = () => {
    const adaptiveStressors: KazakhstanSpecificStressor[] = [
      ...kazakhstanSpecificStressors,
    ];

    // Add specific stressors based on demographics
    if (
      demographics.location.includes('city') ||
      demographics.location.includes('Almaty') ||
      demographics.location.includes('Nur-Sultan')
    ) {
      // Urban-specific stressors are already included
    }

    if (
      demographics.ageRange === '18-25' ||
      demographics.ageRange === '26-35'
    ) {
      // Young adults might face more employment and housing issues
    }

    if (selectedFactors.includes('work-pressure')) {
      // Work-related follow-ups
    }

    return adaptiveStressors;
  };

  const generatePersonalizedRecommendations = (): ActionPlan[] => {
    const recommendations: ActionPlan[] = [];

    // Base recommendations based on stress level
    if (stressLevel >= 7) {
      recommendations.push({
        id: 'immediate-relief',
        title: t('assessment.recommendations.immediate_relief.title'),
        description: t(
          'assessment.recommendations.immediate_relief.description'
        ),
        priority: 'high',
        estimatedDuration: 5,
        exerciseIds: ['breathing-4-7-8', 'progressive-muscle-relaxation'],
        resourceIds: ['crisis-support-kz'],
      });
    }

    // Work-related stress recommendations
    if (selectedFactors.includes('work-pressure')) {
      recommendations.push({
        id: 'work-stress-management',
        title: t('assessment.recommendations.work_stress.title'),
        description: t('assessment.recommendations.work_stress.description'),
        priority: 'medium',
        estimatedDuration: 10,
        exerciseIds: ['workplace-breathing', 'desk-meditation'],
        resourceIds: ['work-life-balance-guide'],
      });
    }

    // Financial stress recommendations
    if (selectedFactors.includes('financial-concerns')) {
      recommendations.push({
        id: 'financial-wellness',
        title: t('assessment.recommendations.financial_wellness.title'),
        description: t(
          'assessment.recommendations.financial_wellness.description'
        ),
        priority: 'medium',
        estimatedDuration: 15,
        exerciseIds: ['anxiety-breathing', 'mindful-planning'],
        resourceIds: ['financial-counseling-kz'],
      });
    }

    // Cultural adaptation recommendations
    if (
      selectedKzStressors.includes('cultural-identity') ||
      selectedKzStressors.includes('traditional-modern-balance')
    ) {
      recommendations.push({
        id: 'cultural-balance',
        title: t('assessment.recommendations.cultural_balance.title'),
        description: t(
          'assessment.recommendations.cultural_balance.description'
        ),
        priority: 'medium',
        estimatedDuration: 20,
        exerciseIds: ['cultural-meditation', 'identity-reflection'],
        resourceIds: ['cultural-support-groups'],
      });
    }

    return recommendations;
  };

  const completeAssessment = () => {
    const riskLevel =
      stressLevel <= 3
        ? 'low'
        : stressLevel <= 6
          ? 'moderate'
          : stressLevel <= 8
            ? 'high'
            : 'severe';

    const results: AssessmentResults = {
      stressLevel,
      stressFactors: selectedFactors,
      culturalFactors: selectedKzStressors,
      recommendedActions: generatePersonalizedRecommendations(),
      riskLevel,
      insights: [
        t('assessment.results.stress_level_insight', {
          level: stressLevel,
          description: getStressLevelText(stressLevel).toLowerCase(),
        }),
        t('assessment.results.factors_insight', {
          count: selectedFactors.length,
        }),
        selectedKzStressors.length > 0
          ? t('assessment.results.cultural_factors_insight', {
              count: selectedKzStressors.length,
            })
          : '',
        demographics.location
          ? t('assessment.results.location_insight', {
              location: demographics.location,
            })
          : '',
      ].filter(Boolean),
    };

    setAssessmentResults(results);
    setShowResults(true);
    onComplete?.(results);
  };

  const getStressLevelColor = (level: number) => {
    if (level <= 3) return 'from-green-400 to-green-600';
    if (level <= 6) return 'from-yellow-400 to-orange-500';
    if (level <= 8) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-700';
  };

  const getStressLevelText = (level: number) => {
    if (level <= 3) return 'Low Stress';
    if (level <= 6) return 'Moderate Stress';
    if (level <= 8) return 'High Stress';
    return 'Very High Stress';
  };

  const renderStep = () => {
    if (showResults && assessmentResults) {
      return renderResults();
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('assessment.questions.stress_level')}
              </h3>
              <p className="text-gray-600">
                {t('assessment.questions.stress_level_description')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #22c55e 0%, #eab308 30%, #f97316 60%, #ef4444 100%)`,
                  }}
                />
              </div>

              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getStressLevelColor(stressLevel)} text-white font-semibold text-lg shadow-lg`}
                >
                  <span>
                    {t('assessment.level')} {stressLevel}
                  </span>
                  <span>•</span>
                  <span>{getStressLevelText(stressLevel)}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 px-2">
                <span className="flex flex-col items-center">
                  <span className="font-medium">1</span>
                  <span>{t('assessment.levels.very_low')}</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="font-medium">5</span>
                  <span>{t('assessment.levels.moderate')}</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="font-medium">10</span>
                  <span>{t('assessment.levels.very_high')}</span>
                </span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('assessment.questions.demographics_title')}
              </h3>
              <p className="text-gray-600">
                {t('assessment.questions.demographics_description')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('assessment.questions.age_range')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['18-25', '26-35', '36-45', '46-55', '56-65', '65+'].map(
                    (age) => (
                      <button
                        key={age}
                        onClick={() => handleDemographicChange('ageRange', age)}
                        className={`p-3 text-center rounded-lg border-2 transition-all ${
                          demographics.ageRange === age
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {age}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('assessment.questions.location')}
                </label>
                <select
                  value={demographics.location}
                  onChange={(e) =>
                    handleDemographicChange('location', e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">
                    {t('assessment.questions.select_location')}
                  </option>
                  {Object.entries(KAZAKHSTAN_REGIONS).map(([key, region]) => (
                    <option key={key} value={key}>
                      {region[language]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Work Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('assessment.questions.work_status')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'employed_full_time',
                    'employed_part_time',
                    'self_employed',
                    'unemployed',
                    'student',
                    'retired',
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleDemographicChange('workStatus', status)
                      }
                      className={`p-3 text-left rounded-lg border-2 transition-all ${
                        demographics.workStatus === status
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {t(`assessment.work_status.${status}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('assessment.questions.stress_factors')}
              </h3>
              <p className="text-gray-600">
                {t('assessment.questions.stress_factors_description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kazakhstanStressFactors.map((factor) => (
                <button
                  key={factor}
                  onClick={() => handleFactorToggle(factor)}
                  className={`group relative p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedFactors.includes(factor)
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {STRESS_CATEGORIES[factor][language]}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedFactors.includes(factor)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 group-hover:border-blue-400'
                      }`}
                    >
                      {selectedFactors.includes(factor) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedFactors.length > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {t('assessment.factors_selected', {
                      count: selectedFactors.length,
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('assessment.questions.kazakhstan_stressors')}
              </h3>
              <p className="text-gray-600">
                {t('assessment.questions.kazakhstan_stressors_description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAdaptiveQuestions().map((stressor) => (
                <button
                  key={stressor}
                  onClick={() => handleKzStressorToggle(stressor)}
                  className={`group relative p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedKzStressors.includes(stressor)
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 text-purple-700 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {t(`assessment.kazakhstan_stressors.${stressor}`)}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedKzStressors.includes(stressor)
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300 group-hover:border-purple-400'
                      }`}
                    >
                      {selectedKzStressors.includes(stressor) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedKzStressors.length > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {t('assessment.kz_stressors_selected', {
                      count: selectedKzStressors.length,
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('assessment.questions.review_title')}
              </h3>
              <p className="text-gray-600">
                {t('assessment.questions.review_description')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Stress Level Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t('assessment.review.stress_level')}
                </h4>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getStressLevelColor(stressLevel)} text-white font-medium`}
                >
                  <span>
                    {t('assessment.level')} {stressLevel}
                  </span>
                  <span>•</span>
                  <span>{getStressLevelText(stressLevel)}</span>
                </div>
              </div>

              {/* Demographics Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {t('assessment.review.demographics')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">
                      {t('assessment.questions.age_range')}:{' '}
                    </span>
                    <span className="font-medium">{demographics.ageRange}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {t('assessment.questions.location')}:{' '}
                    </span>
                    <span className="font-medium">
                      {demographics.location
                        ? KAZAKHSTAN_REGIONS[
                            demographics.location as keyof typeof KAZAKHSTAN_REGIONS
                          ]?.[language]
                        : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {t('assessment.questions.work_status')}:{' '}
                    </span>
                    <span className="font-medium">
                      {demographics.workStatus
                        ? t(`assessment.work_status.${demographics.workStatus}`)
                        : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Factors */}
              {selectedFactors.length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {t('assessment.review.stress_factors')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFactors.map((factor) => (
                      <span
                        key={factor}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                      >
                        {STRESS_CATEGORIES[factor][language]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Kazakhstan-specific Stressors */}
              {selectedKzStressors.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {t('assessment.review.kz_stressors')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedKzStressors.map((stressor) => (
                      <span
                        key={stressor}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {t(`assessment.kazakhstan_stressors.${stressor}`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!assessmentResults) return null;

    const getRiskLevelColor = (risk: string) => {
      switch (risk) {
        case 'low':
          return 'from-green-500 to-emerald-600';
        case 'moderate':
          return 'from-yellow-500 to-orange-500';
        case 'high':
          return 'from-orange-500 to-red-500';
        case 'severe':
          return 'from-red-500 to-red-700';
        default:
          return 'from-gray-500 to-gray-600';
      }
    };

    const getRiskLevelIcon = (risk: string) => {
      switch (risk) {
        case 'low':
          return <CheckCircle className="h-6 w-6" />;
        case 'moderate':
          return <AlertTriangle className="h-6 w-6" />;
        case 'high':
          return <AlertTriangle className="h-6 w-6" />;
        case 'severe':
          return <AlertTriangle className="h-6 w-6" />;
        default:
          return <Heart className="h-6 w-6" />;
      }
    };

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${getRiskLevelColor(assessmentResults.riskLevel)} text-white font-semibold text-lg shadow-lg mb-4`}
          >
            {getRiskLevelIcon(assessmentResults.riskLevel)}
            <span>
              {t(`assessment.risk_levels.${assessmentResults.riskLevel}`)}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {t('assessment.results.title')}
          </h3>
          <p className="text-lg text-gray-600">
            {t('assessment.results.subtitle')}
          </p>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            {t('assessment.results.insights_title')}
          </h4>
          <div className="space-y-3">
            {assessmentResults.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            {t('assessment.results.recommendations_title')}
          </h4>

          {assessmentResults.recommendedActions.map((action) => (
            <Card
              key={action.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h5>
                    <p className="text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {action.estimatedDuration} {t('common.minutes')}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          action.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : action.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {t(`assessment.priority.${action.priority}`)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 flex items-center gap-2"
                  >
                    {t('assessment.results.start_action')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-green-600" />
            {t('assessment.results.next_steps_title')}
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                {t('assessment.results.next_step_1')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                {t('assessment.results.next_step_2')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                {t('assessment.results.next_step_3')}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800">
              {t('assessment.results.create_account')}
            </Button>
            <Button variant="outline" className="flex-1">
              {t('assessment.results.retake_assessment')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return stressLevel > 0;
      case 1:
        return (
          demographics.ageRange &&
          demographics.location &&
          demographics.workStatus
        );
      case 2:
        return selectedFactors.length > 0;
      case 3:
        return true; // Kazakhstan stressors are optional
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      completeAssessment();
    } else {
      setCurrentStep(Math.min(totalSteps - 1, currentStep + 1));
    }
  };

  const handlePrevious = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(4);
    } else {
      setCurrentStep(Math.max(0, currentStep - 1));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <CardTitle className="text-2xl font-bold text-center text-gray-900 mb-4">
          {showResults ? t('assessment.results.title') : t('assessment.title')}
        </CardTitle>

        {!showResults && (
          <>
            <p className="text-center text-gray-600 mb-6">
              {t('assessment.subtitle')}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600">
                {t('assessment.progress', {
                  current: currentStep + 1,
                  total: totalSteps,
                })}
              </span>
            </div>

            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-3 flex-1 rounded-full transition-all duration-300 ${
                    i <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </CardHeader>

      <CardContent className="p-8">
        {renderStep()}

        {!showResults && (
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-8 py-3"
            >
              {t('common.back')}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            >
              {currentStep === totalSteps - 1
                ? t('assessment.complete')
                : t('common.next')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
