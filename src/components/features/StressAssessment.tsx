import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import type {
  AssessmentResults,
  StressCategory,
  KazakhstanSpecificStressor,
  Language,
} from '../../types';
import { STRESS_CATEGORIES } from '../../utils/constants';

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
];

interface StressAssessmentProps {
  onComplete?: (assessment: AssessmentResults) => void;
  language?: Language;
}

export const StressAssessment = ({
  onComplete,
  language = 'en',
}: StressAssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedFactors, setSelectedFactors] = useState<StressCategory[]>([]);
  const [selectedKzStressors, setSelectedKzStressors] = useState<
    KazakhstanSpecificStressor[]
  >([]);

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

  const completeAssessment = () => {
    const results: AssessmentResults = {
      stressLevel,
      stressFactors: selectedFactors,
      culturalFactors: selectedKzStressors,
      recommendedActions: [], // Would be populated by backend logic
      riskLevel:
        stressLevel <= 3
          ? 'low'
          : stressLevel <= 6
            ? 'moderate'
            : stressLevel <= 8
              ? 'high'
              : 'severe',
      insights: [
        `Your stress level is ${getStressLevelText(stressLevel).toLowerCase()}`,
        `You identified ${selectedFactors.length} main stress factors`,
        selectedKzStressors.length > 0
          ? `You're experiencing ${selectedKzStressors.length} Kazakhstan-specific stressors`
          : '',
      ].filter(Boolean),
    };

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
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                How would you rate your current stress level?
              </h3>
              <p className="text-gray-600">
                Be honest - this helps us provide better recommendations
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
                    background: `linear-gradient(to right, #ef4444 0%, #f97316 30%, #eab308 60%, #22c55e 100%)`,
                  }}
                />
              </div>

              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getStressLevelColor(stressLevel)} text-white font-semibold text-lg shadow-lg`}
                >
                  <span>Level {stressLevel}</span>
                  <span>•</span>
                  <span>{getStressLevelText(stressLevel)}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 px-2">
                <span className="flex flex-col items-center">
                  <span className="font-medium">1</span>
                  <span>Very Low</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="font-medium">5</span>
                  <span>Moderate</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="font-medium">10</span>
                  <span>Very High</span>
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
                What are your main stress factors?
              </h3>
              <p className="text-gray-600">
                Select all that apply - understanding the sources helps us help
                you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kazakhstanStressFactors.map((factor) => (
                <button
                  key={factor}
                  onClick={() => handleFactorToggle(factor)}
                  className={`group relative p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedFactors.includes(factor)
                      ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 text-rose-700 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {STRESS_CATEGORIES[factor][language]}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedFactors.includes(factor)
                          ? 'border-rose-500 bg-rose-500'
                          : 'border-gray-300 group-hover:border-rose-400'
                      }`}
                    >
                      {selectedFactors.includes(factor) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedFactors.length > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full text-rose-700 font-medium">
                  <span>
                    {selectedFactors.length} factor
                    {selectedFactors.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Kazakhstan-specific stressors
              </h3>
              <p className="text-gray-600">
                Are you experiencing any of these challenges specific to life in
                Kazakhstan?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kazakhstanSpecificStressors.map((stressor) => (
                <button
                  key={stressor}
                  onClick={() => handleKzStressorToggle(stressor)}
                  className={`group relative p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedKzStressors.includes(stressor)
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {stressor
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedKzStressors.includes(stressor)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 group-hover:border-blue-400'
                      }`}
                    >
                      {selectedKzStressors.includes(stressor) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedKzStressors.length > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium">
                  <span>
                    {selectedKzStressors.length} Kazakhstan-specific stressor
                    {selectedKzStressors.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-green-600">
              Assessment Complete!
            </h3>
            <p className="text-gray-600">
              Based on your responses, we&apos;ll provide personalized
              recommendations.
            </p>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Stress Assessment for Kazakhstan</CardTitle>
        <div className="flex space-x-2">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded ${
                step <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {renderStep()}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep === 2) {
                completeAssessment();
              } else {
                setCurrentStep(Math.min(3, currentStep + 1));
              }
            }}
            disabled={currentStep === 3}
          >
            {currentStep === 2 ? 'Complete Assessment' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
