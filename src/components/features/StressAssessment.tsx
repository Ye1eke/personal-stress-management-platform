import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

const stressFactors = [
  'Work pressure',
  'Financial concerns',
  'Family responsibilities',
  'Health issues',
  'Social isolation',
  'Communication problems',
  'Time management',
  'Future uncertainty',
];

export const StressAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [relationshipImpact, setRelationshipImpact] = useState(5);

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factor)
        ? prev.filter((f) => f !== factor)
        : [...prev, factor]
    );
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
              {stressFactors.map((factor) => (
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
                    <span className="font-medium">{factor}</span>
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
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                How much is stress affecting your relationship?
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={relationshipImpact}
                  onChange={(e) =>
                    setRelationshipImpact(Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>No Impact (1)</span>
                  <span className="font-medium">
                    Current: {relationshipImpact}
                  </span>
                  <span>Major Impact (10)</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium text-green-600">
              Assessment Complete!
            </h3>
            <p className="text-gray-600">
              Based on your responses, we'll provide personalized
              recommendations.
            </p>
          </div>
        );
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Relationship Stress Assessment</CardTitle>
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
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            disabled={currentStep === 3}
          >
            {currentStep === 2 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
